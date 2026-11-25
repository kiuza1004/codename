import React, { useState } from 'react';
import { RoomPlayer, PlayerRole } from '../types/multiplayer';
import { GameMode } from '../types/game';
import { Users, Copy, Check, Play, UserPlus, Shield, Bot, Eye, Radio, X } from 'lucide-react';

interface MultiplayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  isHost: boolean;
  players: RoomPlayer[];
  localPlayer: RoomPlayer | null;
  onSelectRole: (role: PlayerRole) => void;
  onToggleAiFill: (role: PlayerRole, enabled: boolean) => void;
  onStartGame: () => void;
  onCreateRoom: (roomId: string, playerName: string, mode: GameMode) => void;
  onJoinRoom: (roomId: string, playerName: string) => void;
  isConnected: boolean;
  connectionStatus: string;
}

export const MultiplayerModal: React.FC<MultiplayerModalProps> = ({
  isOpen,
  onClose,
  roomId,
  isHost,
  players,
  localPlayer,
  onSelectRole,
  onToggleAiFill,
  onStartGame,
  onCreateRoom,
  onJoinRoom,
  isConnected,
  connectionStatus,
}) => {
  const [tab, setTab] = useState<'create' | 'join'>('create');
  const [inputRoomId, setInputRoomId] = useState('');
  const [playerName, setPlayerName] = useState(() => localStorage.getItem('codenames_player_name') || '요원_' + Math.floor(100 + Math.random() * 900));
  const [selectedMode, setSelectedMode] = useState<GameMode>('word');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    if (!roomId) return;
    const url = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('codenames_player_name', playerName);
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    onCreateRoom(newCode, playerName, selectedMode);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRoomId.trim()) return;
    localStorage.setItem('codenames_player_name', playerName);
    onJoinRoom(inputRoomId.trim().toUpperCase(), playerName);
  };

  const getPlayerInRole = (role: PlayerRole) => {
    return players.find(p => p.role === role);
  };

  const getAllInRole = (role: PlayerRole) => {
    return players.filter(p => p.role === role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-gradient-to-b from-[#131a2a] via-[#0f1422] to-[#0a0d18] border-2 border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95dvh]">
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-cyan-500/30 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span className="font-bold font-spy tracking-wider text-slate-100 text-lg">
              다인 작전실 (MULTIPLAYER P2P)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col gap-5">
          {!isConnected ? (
            /* 1단계: 방 생성 / 참가 탭 */
            <div className="flex flex-col gap-4">
              <div className="flex rounded-2xl bg-slate-950 p-1 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setTab('create')}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    tab === 'create'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  새 작전실 개설 (방장)
                </button>
                <button
                  type="button"
                  onClick={() => setTab('join')}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                    tab === 'join'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  기존 작전실 참가
                </button>
              </div>

              {/* 닉네임 입력 */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 mb-1">내 요원명 (닉네임)</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={12}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  placeholder="요원명을 입력하세요"
                />
              </div>

              {tab === 'create' ? (
                /* 방 개설 양식 */
                <form onSubmit={handleCreate} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">게임 모드 선택</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedMode('word')}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedMode === 'word'
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <div className="font-bold text-sm">낱말 카드 모드</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">5×5 그리드 (25장 정식 규격)</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedMode('picture')}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedMode === 'picture'
                            ? 'bg-purple-950/80 border-purple-400 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850'
                        }`}
                      >
                        <div className="font-bold text-sm">그림 카드 모드</div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">5×4 그리드 (100종 일러스트)</div>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-lg shadow-cyan-950/50 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>작전실 생성 및 입장</span>
                  </button>
                </form>
              ) : (
                /* 방 참가 양식 */
                <form onSubmit={handleJoin} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1">작전실 6자리 코드</label>
                    <input
                      type="text"
                      value={inputRoomId}
                      onChange={(e) => setInputRoomId(e.target.value.toUpperCase())}
                      maxLength={8}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono font-bold tracking-widest text-base uppercase focus:border-cyan-400 focus:outline-none"
                      placeholder="예: AGENT1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Play className="w-5 h-5" />
                    <span>작전실 참여하기</span>
                  </button>
                </form>
              )}

              {connectionStatus && (
                <div className="text-center text-xs font-mono text-cyan-400 animate-pulse">
                  {connectionStatus}
                </div>
              )}
            </div>
          ) : (
            /* 2단계: 대기실 로비 (역할 선택 및 준비) */
            <div className="flex flex-col gap-4">
              {/* 상단 룸 코드 및 초대 링크 복사 */}
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3 shadow-inner">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">기밀 작전실 코드</span>
                  <span className="text-xl sm:text-2xl font-black font-mono tracking-widest text-cyan-300">
                    {roomId}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3.5 py-2 rounded-xl bg-cyan-900/60 hover:bg-cyan-800 text-cyan-200 border border-cyan-500/50 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '초대 링크 복사됨!' : '초대 링크 복사'}</span>
                </button>
              </div>

              {/* 역할 배정 그리드 */}
              <div>
                <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
                  역할 선택 (원하는 자리를 클릭하여 배정받으세요)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 🔴 RED TEAM */}
                  <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 flex flex-col gap-2.5">
                    <span className="text-xs font-bold font-mono text-red-400 uppercase tracking-wider flex items-center gap-1">
                      <Shield className="w-4 h-4" /> 레드 팀 (RED)
                    </span>

                    {/* 레드 팀장 */}
                    <div
                      onClick={() => onSelectRole('red_spymaster')}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        localPlayer?.role === 'red_spymaster'
                          ? 'bg-red-900/70 border-red-400 text-white shadow-md ring-2 ring-red-500/40'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-red-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-red-300">팀장:</span>
                        <span>{getPlayerInRole('red_spymaster')?.name || '(공석 - 클릭하여 선택)'}</span>
                      </div>
                      {isHost && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const current = getPlayerInRole('red_spymaster');
                            onToggleAiFill('red_spymaster', !current?.isAi);
                          }}
                          title="AI 팀장 배치 토글"
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 font-mono"
                        >
                          <Bot className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* 레드 요원 */}
                    <div
                      onClick={() => onSelectRole('red_operative')}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        localPlayer?.role === 'red_operative'
                          ? 'bg-red-900/70 border-red-400 text-white shadow-md ring-2 ring-red-500/40'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-red-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-red-300">현장 요원:</span>
                        <span>{getAllInRole('red_operative').map(p => p.name).join(', ') || '(공석 - 클릭하여 선택)'}</span>
                      </div>
                      {isHost && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const current = getPlayerInRole('red_operative');
                            onToggleAiFill('red_operative', !current?.isAi);
                          }}
                          title="AI 요원 배치 토글"
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 font-mono"
                        >
                          <Bot className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 🔵 BLUE TEAM */}
                  <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/40 flex flex-col gap-2.5">
                    <span className="text-xs font-bold font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1">
                      <Shield className="w-4 h-4" /> 블루 팀 (BLUE)
                    </span>

                    {/* 블루 팀장 */}
                    <div
                      onClick={() => onSelectRole('blue_spymaster')}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        localPlayer?.role === 'blue_spymaster'
                          ? 'bg-blue-900/70 border-blue-400 text-white shadow-md ring-2 ring-blue-500/40'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-300">팀장:</span>
                        <span>{getPlayerInRole('blue_spymaster')?.name || '(공석 - 클릭하여 선택)'}</span>
                      </div>
                      {isHost && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const current = getPlayerInRole('blue_spymaster');
                            onToggleAiFill('blue_spymaster', !current?.isAi);
                          }}
                          title="AI 팀장 배치 토글"
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 font-mono"
                        >
                          <Bot className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* 블루 요원 */}
                    <div
                      onClick={() => onSelectRole('blue_operative')}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        localPlayer?.role === 'blue_operative'
                          ? 'bg-blue-900/70 border-blue-400 text-white shadow-md ring-2 ring-blue-500/40'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-300">현장 요원:</span>
                        <span>{getAllInRole('blue_operative').map(p => p.name).join(', ') || '(공석 - 클릭하여 선택)'}</span>
                      </div>
                      {isHost && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const current = getPlayerInRole('blue_operative');
                            onToggleAiFill('blue_operative', !current?.isAi);
                          }}
                          title="AI 요원 배치 토글"
                          className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 font-mono"
                        >
                          <Bot className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 👁️ 관전자 배정 */}
                <div
                  onClick={() => onSelectRole('spectator')}
                  className={`mt-2.5 p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    localPlayer?.role === 'spectator'
                      ? 'bg-slate-800 border-cyan-400 text-white ring-2 ring-cyan-500/40'
                      : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold">관전자 (키카드 및 양 팀 진행 상황 관전):</span>
                    <span>{getAllInRole('spectator').map(p => p.name).join(', ') || '없음'}</span>
                  </div>
                </div>
              </div>

              {/* 하단 시작 버튼 */}
              {isHost ? (
                <button
                  type="button"
                  onClick={onStartGame}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-600 to-blue-600 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Play className="w-5 h-5" />
                  <span>작전 개시 (게임 시작)</span>
                </button>
              ) : (
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-xs font-mono text-cyan-300">
                  <Radio className="w-4 h-4 inline mr-1 animate-spin" />
                  방장이 작전을 개시할 때까지 대기 중입니다...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
