import React, { useState } from 'react';
import { Hint, TeamColor, TurnPhase } from '../types/game';
import { Bot, Radio, Target, History, ChevronDown, ChevronUp } from 'lucide-react';

interface SpymasterPanelProps {
  currentHint: Hint | null;
  hintHistory: Hint[];
  turn: TurnPhase;
  playerTeam: TeamColor;
  statusMessage: string;
}

export const SpymasterPanel: React.FC<SpymasterPanelProps> = ({
  hintHistory,
  turn,
  playerTeam,
  statusMessage,
}) => {
  const [showHistory, setShowHistory] = useState(false);

  const isPlayerTurn = turn === 'player_turn';
  const isOpponentTurn = turn === 'opponent_turn';
  const isThinking = turn === 'spymaster_thinking';

  const teamLabel = playerTeam === 'red' ? '레드(RED)' : '블루(BLUE)';

  return (
    <div className="w-full flex flex-col gap-2 my-1">
      {/* 2번 화면 - 1. [맨 위] 이전 힌트 기록 패널 */}
      <div className="w-full rounded-2xl border border-slate-700/70 bg-[#121725]/95 backdrop-blur-md p-2.5 sm:p-3.5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
              <History className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              이전 힌트 기록
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 font-bold">
              {hintHistory.length}건
            </span>
          </div>

          {hintHistory.length > 0 ? (
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-xs text-cyan-300 hover:text-white border border-cyan-500/40 transition-all font-mono font-bold shadow-sm"
            >
              <span>{showHistory ? '기록 접기' : '기록 열람'}</span>
              {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          ) : (
            <span className="text-[10px] text-slate-500 font-mono">기록 없음 (작전 개시 턴)</span>
          )}
        </div>

        {/* 힌트 히스토리 드롭다운 */}
        {showHistory && hintHistory.length > 0 && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-800 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {hintHistory.map((h, i) => (
                <div key={i} className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">#{i + 1}턴</span>
                  <span className="font-bold text-cyan-300">"{h.word}"</span>
                  <span className="font-mono text-amber-300 font-bold bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/40 text-[11px]">{h.count}장</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2번 화면 - 2. [바로 아래] 팀장 힌트 패널 (카드 바로 위에 배치) */}
      <div className="w-full rounded-2xl border border-slate-700/70 bg-[#121725]/95 backdrop-blur-md p-2.5 sm:p-3.5 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative shrink-0">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border ${
                playerTeam === 'red' ? 'bg-red-950/70 border-red-500/60 text-red-400' : 'bg-blue-950/70 border-blue-500/60 text-blue-400'
              }`}>
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                isPlayerTurn ? 'bg-emerald-500 animate-ping' : isOpponentTurn ? 'bg-amber-500' : 'bg-cyan-500'
              }`}></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">팀장 힌트</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold border ${
                  playerTeam === 'red' ? 'bg-red-950/80 border-red-500/40 text-red-300' : 'bg-blue-950/80 border-blue-500/40 text-blue-300'
                }`}>
                  {teamLabel}
                </span>
              </div>
              <div className="text-xs text-slate-300 font-medium flex items-center gap-1.5 mt-0.5">
                {isThinking && <span className="text-cyan-400 flex items-center gap-1"><Radio className="w-3.5 h-3.5 animate-spin" /> 팀장 AI가 새 암호단어를 연산 중...</span>}
                {isOpponentTurn && <span className="text-amber-400 flex items-center gap-1"><Radio className="w-3.5 h-3.5 animate-pulse" /> 상대 팀 요원 행동 중...</span>}
                {isPlayerTurn && <span className="text-emerald-400 flex items-center gap-1"><Target className="w-3.5 h-3.5" /> {statusMessage}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
