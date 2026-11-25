import { useState, useEffect, useCallback, useRef } from 'react';
import { RoomPlayer, PlayerRole, P2PMessage } from '../types/multiplayer';
import { CardItem, Hint, GameMode, TurnPhase } from '../types/game';
import { p2pManager } from '../utils/p2p';

interface UseMultiplayerGameProps {
  onSyncReceivedBoard?: (cards: CardItem[], mode: GameMode, turn: TurnPhase, hint: Hint | null) => void;
  onRemoteCardPick?: (cardId: number, pickerName: string) => void;
  onRemoteHintSubmit?: (hint: Hint) => void;
  onRemotePassTurn?: (byName: string) => void;
}

export const useMultiplayerGame = ({
  onSyncReceivedBoard,
  onRemoteCardPick,
  onRemoteHintSubmit,
  onRemotePassTurn,
}: UseMultiplayerGameProps = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMultiplayerActive, setIsMultiplayerActive] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [players, setPlayers] = useState<RoomPlayer[]>([]);
  const [localPlayer, setLocalPlayer] = useState<RoomPlayer | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  // 음성 통화 상태
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  // 콜백 레퍼런스 유지
  const callbacksRef = useRef({
    onSyncReceivedBoard,
    onRemoteCardPick,
    onRemoteHintSubmit,
    onRemotePassTurn,
  });
  callbacksRef.current = {
    onSyncReceivedBoard,
    onRemoteCardPick,
    onRemoteHintSubmit,
    onRemotePassTurn,
  };

  // P2P 매니저 콜백 초기화
  useEffect(() => {
    p2pManager.initCallbacks(
      (msg: P2PMessage) => {
        handleIncomingMessage(msg);
      },
      (status, errorMsg) => {
        if (status === 'connected') {
          setIsConnected(true);
          setConnectionStatus('작전실 연결 완료');
        } else if (status === 'connecting') {
          setIsConnected(false);
          setConnectionStatus('작전실 연결 시도 중...');
        } else if (status === 'error') {
          setIsConnected(false);
          setConnectionStatus(errorMsg || '연결 오류 발생');
        } else if (status === 'disconnected') {
          setIsConnected(false);
          setConnectionStatus('작전실 연결 종료');
        }
      },
      (updatedPlayers) => {
        setPlayers([...updatedPlayers]);
        setLocalPlayer(p2pManager.getLocalPlayer());
      }
    );

    // URL 쿼리에 room=XXXX 가 있으면 자동으로 참가 창 띄우기
    const urlParams = new URLSearchParams(window.location.search);
    const queryRoom = urlParams.get('room');
    if (queryRoom) {
      setRoomId(queryRoom.toUpperCase());
      setIsModalOpen(true);
    }

    return () => {
      p2pManager.cleanup();
    };
  }, []);

  // 수신된 P2P 메시지 처리
  const handleIncomingMessage = useCallback((msg: P2PMessage) => {
    switch (msg.type) {
      case 'START_GAME':
      case 'SYNC_BOARD':
        if (msg.payload?.cards) {
          setIsMultiplayerActive(true);
          setIsModalOpen(false);
          callbacksRef.current.onSyncReceivedBoard?.(
            msg.payload.cards,
            msg.payload.mode,
            msg.payload.turn,
            msg.payload.hint || null
          );
        }
        break;

      case 'PICK_CARD':
        if (typeof msg.payload?.cardId === 'number') {
          callbacksRef.current.onRemoteCardPick?.(msg.payload.cardId, msg.senderName);
        }
        break;

      case 'SUBMIT_HINT':
        if (msg.payload?.hint) {
          callbacksRef.current.onRemoteHintSubmit?.(msg.payload.hint);
        }
        break;

      case 'PASS_TURN':
        callbacksRef.current.onRemotePassTurn?.(msg.senderName);
        break;

      default:
        break;
    }
  }, []);

  // 방 만들기
  const createRoom = async (newRoomId: string, playerName: string, _mode?: GameMode) => {
    try {
      setConnectionStatus('방 생성 중...');
      const createdId = await p2pManager.createRoom(newRoomId, playerName, 'red_spymaster');
      setRoomId(createdId);
      setIsHost(true);
      setLocalPlayer(p2pManager.getLocalPlayer());
    } catch (e: any) {
      console.error(e);
    }
  };

  // 방 참가하기
  const joinRoom = async (targetRoomId: string, playerName: string) => {
    try {
      setConnectionStatus('방 참가 시도 중...');
      await p2pManager.joinRoom(targetRoomId, playerName, 'red_operative');
      setRoomId(targetRoomId);
      setIsHost(false);
      setLocalPlayer(p2pManager.getLocalPlayer());
    } catch (e: any) {
      console.error(e);
    }
  };

  // 역할 선택
  const selectRole = (role: PlayerRole) => {
    p2pManager.selectRole(role);
    setLocalPlayer(p2pManager.getLocalPlayer());
  };

  // AI 봇 채우기 토글
  const toggleAiFill = (role: PlayerRole, enabled: boolean) => {
    const aiNames: Record<PlayerRole, string> = {
      red_spymaster: '알파-레드 팀장',
      red_operative: '에이전트 섀도우',
      blue_spymaster: '오메가-블루 팀장',
      blue_operative: '에이전트 고스트',
      spectator: 'AI 관전자',
    };
    p2pManager.setAiPlayer(role, enabled, aiNames[role]);
  };

  // 음성 채팅 켜기
  const toggleVoice = async () => {
    if (!isVoiceActive) {
      const stream = await p2pManager.enableVoice();
      if (stream) {
        setIsVoiceActive(true);
        setIsMuted(false);
      }
    } else {
      // 끄기
      setIsVoiceActive(false);
    }
  };

  // 마이크 음소거 토글
  const toggleMute = () => {
    const muted = p2pManager.toggleMute();
    setIsMuted(muted);
  };

  // 스피커 음소거 토글
  const toggleDeafen = () => {
    const deafened = p2pManager.toggleDeafen();
    setIsDeafened(deafened);
  };

  // 게임 시작 브로드캐스트 (호스트)
  const broadcastStartGame = (cards: CardItem[], mode: GameMode, turn: TurnPhase) => {
    p2pManager.sendP2PMessage({
      type: 'START_GAME',
      senderId: localPlayer?.id || 'host',
      senderName: localPlayer?.name || '호스트',
      payload: { cards, mode, turn },
      timestamp: Date.now(),
    });
    setIsMultiplayerActive(true);
    setIsModalOpen(false);
  };

  // 카드 클릭 브로드캐스트
  const broadcastCardPick = (cardId: number) => {
    if (!isMultiplayerActive) return;
    p2pManager.sendP2PMessage({
      type: 'PICK_CARD',
      senderId: localPlayer?.id || 'agent',
      senderName: localPlayer?.name || '요원',
      payload: { cardId },
      timestamp: Date.now(),
    });
  };

  // 팀장 힌트 제출 브로드캐스트
  const broadcastHint = (hint: Hint) => {
    if (!isMultiplayerActive) return;
    p2pManager.sendP2PMessage({
      type: 'SUBMIT_HINT',
      senderId: localPlayer?.id || 'spymaster',
      senderName: localPlayer?.name || '팀장',
      payload: { hint },
      timestamp: Date.now(),
    });
  };

  // 턴 패스 브로드캐스트
  const broadcastPassTurn = () => {
    if (!isMultiplayerActive) return;
    p2pManager.sendP2PMessage({
      type: 'PASS_TURN',
      senderId: localPlayer?.id || 'agent',
      senderName: localPlayer?.name || '요원',
      payload: {},
      timestamp: Date.now(),
    });
  };

  return {
    isModalOpen,
    setIsModalOpen,
    isMultiplayerActive,
    setIsMultiplayerActive,
    roomId,
    isHost,
    players,
    localPlayer,
    isConnected,
    connectionStatus,
    isVoiceActive,
    isMuted,
    isDeafened,
    createRoom,
    joinRoom,
    selectRole,
    toggleAiFill,
    toggleVoice,
    toggleMute,
    toggleDeafen,
    broadcastStartGame,
    broadcastCardPick,
    broadcastHint,
    broadcastPassTurn,
  };
};
