import React, { useState } from 'react';
import { CardItem, GameStats, TeamColor } from '../types/game';
import { Trophy, AlertTriangle, RefreshCw, Key, CheckCircle2, ShieldAlert, Skull, User, Eye, EyeOff } from 'lucide-react';

interface GameOverModalProps {
  winner: TeamColor | 'assassin_loss' | null;
  playerTeam: TeamColor;
  cards: CardItem[];
  stats: GameStats;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  playerTeam,
  cards,
  stats,
  onRestart,
}) => {
  const [showKeycard, setShowKeycard] = useState(true);

  const isVictory = winner === playerTeam;
  const isAssassinLoss = winner === 'assassin_loss';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#141b2b] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-6">
        {/* 상단 결과 배너 */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl mb-3 ${
            isVictory
              ? 'bg-gradient-to-br from-amber-400 to-yellow-600 shadow-yellow-500/30 text-white ring-4 ring-yellow-400/20'
              : 'bg-gradient-to-br from-red-600 to-zinc-900 shadow-red-600/30 text-white ring-4 ring-red-500/20'
          }`}>
            {isVictory ? <Trophy className="w-8 h-8 animate-bounce" /> : <AlertTriangle className="w-8 h-8 animate-pulse" />}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-wide font-mono">
            {isVictory && <span className="text-yellow-400">MISSION ACCOMPLISHED!</span>}
            {!isVictory && isAssassinLoss && <span className="text-red-500">ASSASSIN ELIMINATED!</span>}
            {!isVictory && !isAssassinLoss && <span className="text-red-400">MISSION COMPROMISED!</span>}
          </h2>

          <p className="text-sm text-slate-300 font-medium mt-1">
            {isVictory && "모든 아군 요원과 비밀 접선에 성공하여 작전에서 최종 승리했습니다!"}
            {isAssassinLoss && "암살자 카드를 지목하여 본부가 즉시 발각되었습니다. (암살 패배)"}
            {!isVictory && !isAssassinLoss && "상대 팀이 모든 요원을 먼저 확보하여 작전에서 패배했습니다."}
          </p>
        </div>

        {/* 통계 요약 박스 */}
        <div className="grid grid-cols-3 gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 text-center">
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase">소요 턴 수</div>
            <div className="text-xl font-bold font-mono text-cyan-400">{stats.turnsTaken}턴</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase">발견한 아군 요원</div>
            <div className="text-xl font-bold font-mono text-emerald-400">{stats.correctGuesses}명</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase">오답 / 턴오버</div>
            <div className="text-xl font-bold font-mono text-red-400">{stats.wrongGuesses}회</div>
          </div>
        </div>

        {/* 비밀 키카드 (Secret Keycard) 25장 전체 복기 맵 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>기밀 키카드(Keycard) 원본 전체 공개</span>
            </div>
            <button
              onClick={() => setShowKeycard(!showKeycard)}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
            >
              {showKeycard ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showKeycard ? '접기' : '보기'}</span>
            </button>
          </div>

          {showKeycard && (
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-3">
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {cards.map((c) => (
                  <div
                    key={c.id}
                    className={`p-1.5 sm:p-2 rounded-xl text-center border text-[11px] sm:text-xs font-bold font-spy flex flex-col items-center justify-center gap-0.5 ${
                      c.type === 'red'
                        ? 'bg-red-950/80 border-red-500/70 text-red-300'
                        : c.type === 'blue'
                        ? 'bg-blue-950/80 border-blue-500/70 text-blue-300'
                        : c.type === 'assassin'
                        ? 'bg-black border-red-600 text-red-500 ring-1 ring-red-500/40'
                        : 'bg-amber-950/30 border-amber-600/40 text-amber-200'
                    }`}
                  >
                    <span className="truncate w-full">{c.word}</span>
                    <span className="text-[9px] font-mono opacity-80 flex items-center gap-0.5">
                      {c.type === 'red' && <ShieldAlert className="w-2.5 h-2.5" />}
                      {c.type === 'blue' && <CheckCircle2 className="w-2.5 h-2.5" />}
                      {c.type === 'assassin' && <Skull className="w-2.5 h-2.5" />}
                      {c.type === 'neutral' && <User className="w-2.5 h-2.5" />}
                      {c.type === 'red' ? 'RED' : c.type === 'blue' ? 'BLUE' : c.type === 'assassin' ? '암살자' : '민간인'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-base tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/30 hover:brightness-110 active:scale-[0.99] transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            <span>새 작전 도전하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
