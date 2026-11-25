import React from 'react';
import { RoomPlayer, PlayerRole } from '../types/multiplayer';
import { Mic, MicOff, Volume2, VolumeX, Bot, User, Radio, Users } from 'lucide-react';

interface VoiceChatBarProps {
  players: RoomPlayer[];
  localPlayer: RoomPlayer | null;
  isVoiceActive: boolean;
  onToggleVoice: () => void;
  onToggleMute: () => void;
  onToggleDeafen: () => void;
  isMuted: boolean;
  isDeafened: boolean;
  roomId?: string;
}

export const VoiceChatBar: React.FC<VoiceChatBarProps> = ({
  players,
  localPlayer,
  isVoiceActive,
  onToggleVoice,
  onToggleMute,
  onToggleDeafen,
  isMuted,
  isDeafened,
  roomId,
}) => {
  const getRoleBadge = (role: PlayerRole) => {
    switch (role) {
      case 'red_spymaster':
        return <span className="text-[10px] bg-red-950 text-red-300 border border-red-500/40 px-1.5 py-0.5 rounded font-bold">RED 팀장</span>;
      case 'red_operative':
        return <span className="text-[10px] bg-red-950/60 text-red-400 border border-red-700/40 px-1.5 py-0.5 rounded">RED 요원</span>;
      case 'blue_spymaster':
        return <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-500/40 px-1.5 py-0.5 rounded font-bold">BLUE 팀장</span>;
      case 'blue_operative':
        return <span className="text-[10px] bg-blue-950/60 text-blue-400 border border-blue-700/40 px-1.5 py-0.5 rounded">BLUE 요원</span>;
      case 'spectator':
        return <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">관전자</span>;
    }
  };

  return (
    <div className="w-full bg-[#0d121f]/95 border-b border-cyan-500/30 px-3 py-1.5 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* 좌측: 보이스 상태 및 컨트롤 버튼 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
            <Radio className={`w-3.5 h-3.5 ${isVoiceActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="text-slate-300 font-bold hidden sm:inline">실시간 전술 통신:</span>
            {roomId && <span className="text-cyan-400 font-bold">[{roomId}]</span>}
          </div>

          {!isVoiceActive ? (
            <button
              type="button"
              onClick={onToggleVoice}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center gap-1 shadow-sm transition-all active:scale-95"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>보이스 통신 켜기</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              {/* 마이크 음소거 토글 */}
              <button
                type="button"
                onClick={onToggleMute}
                title={isMuted ? '마이크 켜기' : '마이크 끄기 (음소거)'}
                className={`p-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${
                  isMuted
                    ? 'bg-red-950/80 border-red-500/50 text-red-300'
                    : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                }`}
              >
                {isMuted ? <MicOff className="w-3.5 h-3.5 text-red-400" /> : <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />}
                <span className="text-[11px] font-mono hidden md:inline">{isMuted ? '마이크 OFF' : '마이크 ON'}</span>
              </button>

              {/* 스피커(듣기) 토글 */}
              <button
                type="button"
                onClick={onToggleDeafen}
                title={isDeafened ? '스피커 켜기' : '스피커 끄기'}
                className={`p-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 ${
                  isDeafened
                    ? 'bg-amber-950/80 border-amber-500/50 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {isDeafened ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                <span className="text-[11px] font-mono hidden md:inline">{isDeafened ? '스피커 음소거' : '스피커'}</span>
              </button>
            </div>
          )}
        </div>

        {/* 우측: 참가자 명단 및 실시간 발언자 표시 */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono hidden sm:flex">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>참가 ({players.length}명):</span>
          </div>

          <div className="flex items-center gap-1.5">
            {players.map((p) => {
              const isLocal = localPlayer?.id === p.id;
              const isSpeaking = p.isSpeaking;

              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg border transition-all text-xs font-mono ${
                    isSpeaking
                      ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/50 animate-pulse'
                      : isLocal
                      ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300'
                  }`}
                  title={`${p.name} (${p.role})`}
                >
                  {p.isAi ? (
                    <Bot className="w-3 h-3 text-amber-400 shrink-0" />
                  ) : (
                    <User className="w-3 h-3 text-cyan-400 shrink-0" />
                  )}
                  <span className="font-medium truncate max-w-[80px]">
                    {p.name} {isLocal && '(나)'}
                  </span>
                  {getRoleBadge(p.role)}
                  {p.isMuted && <MicOff className="w-3 h-3 text-red-400 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
