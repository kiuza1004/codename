import { Peer, DataConnection, MediaConnection } from 'peerjs';
import { P2PMessage, RoomPlayer, PlayerRole } from '../types/multiplayer';

export type MessageHandler = (msg: P2PMessage) => void;
export type StatusHandler = (status: 'disconnected' | 'connecting' | 'connected' | 'error', errorMsg?: string) => void;
export type PlayersUpdateHandler = (players: RoomPlayer[]) => void;
export type RemoteStreamHandler = (peerId: string, stream: MediaStream) => void;

class P2PVoiceManager {
  private peer: Peer | null = null;
  private isHost: boolean = false;
  private roomId: string = '';
  private localPlayer: RoomPlayer | null = null;
  private players: Map<string, RoomPlayer> = new Map();
  private dataConnections: Map<string, DataConnection> = new Map();
  private mediaCalls: Map<string, MediaConnection> = new Map();
  private remoteAudioElements: Map<string, HTMLAudioElement> = new Map();

  // 오디오 스트림 및 음성 감지
  private localStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private speechCheckInterval: number | null = null;
  private isDeafened: boolean = false;

  // 콜백
  private onMessageCallback: MessageHandler | null = null;
  private onStatusCallback: StatusHandler | null = null;
  private onPlayersCallback: PlayersUpdateHandler | null = null;
  private onRemoteStreamCallback: RemoteStreamHandler | null = null;

  public initCallbacks(
    onMessage: MessageHandler,
    onStatus: StatusHandler,
    onPlayers: PlayersUpdateHandler,
    onRemoteStream?: RemoteStreamHandler
  ) {
    this.onMessageCallback = onMessage;
    this.onStatusCallback = onStatus;
    this.onPlayersCallback = onPlayers;
    this.onRemoteStreamCallback = onRemoteStream || null;
  }

  // 방 만들기 (호스트)
  public async createRoom(roomId: string, playerName: string, role: PlayerRole = 'red_spymaster'): Promise<string> {
    this.cleanup();
    this.isHost = true;
    this.roomId = roomId.toUpperCase().trim();

    const hostPeerId = `cn_room_${this.roomId}_host`;
    this.localPlayer = {
      id: hostPeerId,
      name: playerName || '호스트 작전관',
      role,
      isHost: true,
      isMuted: false,
      isSpeaking: false,
    };
    this.players.set(hostPeerId, this.localPlayer);

    return new Promise((resolve, reject) => {
      this.onStatusCallback?.('connecting');
      this.peer = new Peer(hostPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
          ],
        },
      });

      this.peer.on('open', (_id) => {
        this.onStatusCallback?.('connected');
        this.notifyPlayersUpdate();
        resolve(this.roomId);
      });

      this.peer.on('error', (err: any) => {
        console.error('Peer host error:', err);
        if (err.type === 'unavailable-id') {
          this.onStatusCallback?.('error', '이미 사용 중인 방 번호입니다. 다른 번호를 입력하세요.');
        } else {
          this.onStatusCallback?.('error', `연결 오류: ${err.message || err.type}`);
        }
        reject(err);
      });

      // 게스트의 데이터 연결 수신
      this.peer.on('connection', (conn) => {
        this.setupDataConnection(conn);
      });

      // 게스트의 보이스 스트림 수신
      this.peer.on('call', (call) => {
        call.answer(this.localStream || undefined);
        this.setupMediaCall(call);
      });
    });
  }

  // 방 참가하기 (게스트)
  public async joinRoom(roomId: string, playerName: string, role: PlayerRole = 'red_operative'): Promise<void> {
    this.cleanup();
    this.isHost = false;
    this.roomId = roomId.toUpperCase().trim();

    const guestPeerId = `cn_guest_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    this.localPlayer = {
      id: guestPeerId,
      name: playerName || '현장 요원',
      role,
      isHost: false,
      isMuted: false,
      isSpeaking: false,
    };

    return new Promise((resolve, reject) => {
      this.onStatusCallback?.('connecting');
      this.peer = new Peer(guestPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
          ],
        },
      });

      this.peer.on('open', () => {
        const hostPeerId = `cn_room_${this.roomId}_host`;
        const conn = this.peer!.connect(hostPeerId, { reliable: true });

        conn.on('open', () => {
          this.dataConnections.set(hostPeerId, conn);
          this.onStatusCallback?.('connected');

          // 호스트에게 참가 알림
          this.sendP2PMessage({
            type: 'ROOM_JOIN',
            senderId: this.localPlayer!.id,
            senderName: this.localPlayer!.name,
            payload: { player: this.localPlayer },
            timestamp: Date.now(),
          });

          // 만약 이미 로컬 마이크가 켜져 있다면 호스트에게 콜
          if (this.localStream) {
            const call = this.peer!.call(hostPeerId, this.localStream);
            this.setupMediaCall(call);
          }

          resolve();
        });

        conn.on('data', (data) => {
          this.handleIncomingData(data);
        });

        conn.on('close', () => {
          this.onStatusCallback?.('disconnected', '호스트와의 연결이 끊어졌습니다.');
          this.cleanup();
        });

        conn.on('error', (err) => {
          this.onStatusCallback?.('error', '방에 접속할 수 없습니다. 번호를 확인하세요.');
          reject(err);
        });
      });

      this.peer.on('call', (call) => {
        call.answer(this.localStream || undefined);
        this.setupMediaCall(call);
      });

      this.peer.on('error', (err) => {
        console.error('Peer guest error:', err);
        this.onStatusCallback?.('error', `방 접속 실패: ${err.type}`);
        reject(err);
      });
    });
  }

  // 데이터 연결 설정 (호스트 측)
  private setupDataConnection(conn: DataConnection) {
    conn.on('open', () => {
      this.dataConnections.set(conn.peer, conn);

      // 새 참가자에게 현재 플레이어 목록 동기화
      this.sendP2PMessage({
        type: 'PLAYER_UPDATE',
        senderId: this.localPlayer!.id,
        senderName: this.localPlayer!.name,
        payload: { players: Array.from(this.players.values()) },
        timestamp: Date.now(),
      });
    });

    conn.on('data', (data) => {
      this.handleIncomingData(data);
      // 호스트는 수신한 메시지를 다른 모든 피어에게 릴레이(브로드캐스트)
      if (this.isHost) {
        this.broadcastExcept(data, conn.peer);
      }
    });

    conn.on('close', () => {
      this.dataConnections.delete(conn.peer);
      this.players.delete(conn.peer);
      this.notifyPlayersUpdate();
      if (this.isHost) {
        this.broadcast({
          type: 'ROOM_LEAVE',
          senderId: conn.peer,
          senderName: '참가자',
          payload: { peerId: conn.peer },
          timestamp: Date.now(),
        });
      }
    });
  }

  // 수신된 P2P 데이터 처리
  private handleIncomingData(data: any) {
    try {
      const msg: P2PMessage = typeof data === 'string' ? JSON.parse(data) : data;

      if (msg.type === 'ROOM_JOIN' && msg.payload?.player) {
        this.players.set(msg.payload.player.id, msg.payload.player);
        this.notifyPlayersUpdate();
        if (this.isHost) {
          this.broadcastPlayersList();
        }
      } else if (msg.type === 'PLAYER_UPDATE' && msg.payload?.players) {
        this.players.clear();
        (msg.payload.players as RoomPlayer[]).forEach(p => this.players.set(p.id, p));
        this.notifyPlayersUpdate();
      } else if (msg.type === 'ROLE_SELECT' && msg.payload?.peerId && msg.payload?.role) {
        const player = this.players.get(msg.payload.peerId);
        if (player) {
          player.role = msg.payload.role;
          this.notifyPlayersUpdate();
          if (this.isHost) this.broadcastPlayersList();
        }
      } else if (msg.type === 'VOICE_SPEAKING') {
        const player = this.players.get(msg.senderId);
        if (player) {
          player.isSpeaking = !!msg.payload?.isSpeaking;
          player.isMuted = !!msg.payload?.isMuted;
          this.notifyPlayersUpdate();
        }
      }

      this.onMessageCallback?.(msg);
    } catch (e) {
      console.error('Error handling incoming P2P data:', e);
    }
  }

  // 미디어 콜 설정 (보이스 스트림)
  private setupMediaCall(call: MediaConnection) {
    this.mediaCalls.set(call.peer, call);

    call.on('stream', (remoteStream) => {
      this.playRemoteAudio(call.peer, remoteStream);
      this.onRemoteStreamCallback?.(call.peer, remoteStream);
    });

    call.on('close', () => {
      this.stopRemoteAudio(call.peer);
      this.mediaCalls.delete(call.peer);
    });
  }

  // 원격 오디오 재생
  private playRemoteAudio(peerId: string, stream: MediaStream) {
    let audio = this.remoteAudioElements.get(peerId);
    if (!audio) {
      audio = document.createElement('audio');
      audio.autoplay = true;
      audio.setAttribute('data-peer-id', peerId);
      document.body.appendChild(audio);
      this.remoteAudioElements.set(peerId, audio);
    }
    audio.srcObject = stream;
    audio.muted = this.isDeafened;
  }

  private stopRemoteAudio(peerId: string) {
    const audio = this.remoteAudioElements.get(peerId);
    if (audio) {
      audio.pause();
      audio.srcObject = null;
      audio.remove();
      this.remoteAudioElements.delete(peerId);
    }
  }

  // 🎙️ 로컬 마이크 켜기 / 보이스 룸 활성화
  public async enableVoice(): Promise<MediaStream | null> {
    try {
      if (this.localStream) return this.localStream;

      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      // 모든 연결된 피어에게 오디오 call 시도
      this.dataConnections.forEach((_conn, peerId) => {
        if (this.peer && !this.mediaCalls.has(peerId)) {
          const call = this.peer.call(peerId, this.localStream!);
          this.setupMediaCall(call);
        }
      });

      // 발언 감지 루프 시작
      this.startSpeechDetection();
      if (this.localPlayer) {
        this.localPlayer.isMuted = false;
        this.notifyPlayersUpdate();
      }

      return this.localStream;
    } catch (e) {
      console.warn('Microphone access denied or error:', e);
      return null;
    }
  }

  // 🔇 마이크 음소거 토글
  public toggleMute(): boolean {
    if (!this.localStream) return true;
    const audioTrack = this.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      const isMuted = !audioTrack.enabled;
      if (this.localPlayer) {
        this.localPlayer.isMuted = isMuted;
        this.localPlayer.isSpeaking = false;
      }
      this.broadcastVoiceStatus(isMuted, false);
      this.notifyPlayersUpdate();
      return isMuted;
    }
    return true;
  }

  // 🔈 스피커(듣기) 음소거 토글
  public toggleDeafen(): boolean {
    this.isDeafened = !this.isDeafened;
    this.remoteAudioElements.forEach(audio => {
      audio.muted = this.isDeafened;
    });
    return this.isDeafened;
  }

  // 발언 감지 (오디오 레벨 분석)
  private startSpeechDetection() {
    if (!this.localStream) return;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = this.audioContext.createMediaStreamSource(this.localStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);

      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      let wasSpeaking = false;

      this.speechCheckInterval = window.setInterval(() => {
        if (!this.analyser || !this.localPlayer || this.localPlayer.isMuted) {
          if (wasSpeaking) {
            wasSpeaking = false;
            this.localPlayer!.isSpeaking = false;
            this.broadcastVoiceStatus(this.localPlayer!.isMuted, false);
            this.notifyPlayersUpdate();
          }
          return;
        }

        this.analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const isSpeaking = average > 18; // 임계값

        if (isSpeaking !== wasSpeaking) {
          wasSpeaking = isSpeaking;
          this.localPlayer.isSpeaking = isSpeaking;
          this.broadcastVoiceStatus(this.localPlayer.isMuted, isSpeaking);
          this.notifyPlayersUpdate();
        }
      }, 150);
    } catch (e) {
      console.warn('Speech detection initialization failed:', e);
    }
  }

  private broadcastVoiceStatus(isMuted: boolean, isSpeaking: boolean) {
    if (!this.localPlayer) return;
    this.sendP2PMessage({
      type: 'VOICE_SPEAKING',
      senderId: this.localPlayer.id,
      senderName: this.localPlayer.name,
      payload: { isMuted, isSpeaking },
      timestamp: Date.now(),
    });
  }

  // 역할 변경
  public selectRole(role: PlayerRole) {
    if (!this.localPlayer) return;
    this.localPlayer.role = role;
    this.notifyPlayersUpdate();

    this.sendP2PMessage({
      type: 'ROLE_SELECT',
      senderId: this.localPlayer.id,
      senderName: this.localPlayer.name,
      payload: { peerId: this.localPlayer.id, role },
      timestamp: Date.now(),
    });
  }

  // 가상 AI 플레이어 토글/추가 (호스트 전용)
  public setAiPlayer(role: PlayerRole, enabled: boolean, aiName: string) {
    if (!this.isHost) return;
    const aiId = `ai_${role}`;
    if (enabled) {
      this.players.set(aiId, {
        id: aiId,
        name: `${aiName} (AI)`,
        role,
        isHost: false,
        isMuted: false,
        isSpeaking: false,
        isAi: true,
      });
    } else {
      this.players.delete(aiId);
    }
    this.broadcastPlayersList();
  }

  // 메시지 전송
  public sendP2PMessage(msg: P2PMessage) {
    const serialized = JSON.stringify(msg);
    if (this.isHost) {
      this.broadcast(serialized);
    } else {
      const hostConn = Array.from(this.dataConnections.values())[0];
      if (hostConn && hostConn.open) {
        hostConn.send(serialized);
      }
    }
  }

  // 전체 브로드캐스트
  public broadcast(data: any) {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    this.dataConnections.forEach((conn) => {
      if (conn.open) {
        conn.send(payload);
      }
    });
  }

  private broadcastExcept(data: any, exceptPeerId: string) {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    this.dataConnections.forEach((conn, peerId) => {
      if (peerId !== exceptPeerId && conn.open) {
        conn.send(payload);
      }
    });
  }

  private broadcastPlayersList() {
    this.broadcast({
      type: 'PLAYER_UPDATE',
      senderId: this.localPlayer?.id || 'host',
      senderName: this.localPlayer?.name || 'host',
      payload: { players: Array.from(this.players.values()) },
      timestamp: Date.now(),
    });
    this.notifyPlayersUpdate();
  }

  private notifyPlayersUpdate() {
    this.onPlayersCallback?.(Array.from(this.players.values()));
  }

  public getLocalPlayer(): RoomPlayer | null {
    return this.localPlayer;
  }

  public getPlayers(): RoomPlayer[] {
    return Array.from(this.players.values());
  }

  public getRoomId(): string {
    return this.roomId;
  }

  public getIsHost(): boolean {
    return this.isHost;
  }

  // 정리
  public cleanup() {
    if (this.speechCheckInterval) {
      clearInterval(this.speechCheckInterval);
      this.speechCheckInterval = null;
    }
    if (this.audioContext) {
      try { this.audioContext.close(); } catch {}
      this.audioContext = null;
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    this.remoteAudioElements.forEach(audio => audio.remove());
    this.remoteAudioElements.clear();

    this.dataConnections.forEach(conn => conn.close());
    this.dataConnections.clear();
    this.mediaCalls.forEach(call => call.close());
    this.mediaCalls.clear();

    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.players.clear();
    this.localPlayer = null;
    this.roomId = '';
    this.isHost = false;
  }
}

export const p2pManager = new P2PVoiceManager();
