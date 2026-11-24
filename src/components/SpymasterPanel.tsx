import React, { useState } from 'react';
import { Hint, TeamColor, TurnPhase } from '../types/game';
import { Bot, Radio, Target, History, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

interface SpymasterPanelProps {
  currentHint: Hint | null;
  hintHistory: Hint[];
  turn: TurnPhase;
  playerTeam: TeamColor;
  statusMessage: string;
}

export const SpymasterPanel: React.FC<SpymasterPanelProps> = ({
  currentHint,
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
    <div className="w-full rounded-2xl border border-slate-800 bg-[#121724]/95 backdrop-blur-md p-3 sm:p-4 shadow-lg my-1">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* 🤖 [팀장 힌트] 카드 바로 위에 위치하는 팀장 AI 작전 본부 */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border ${
              playerTeam === 'red' ? 'bg-red-950/70 border-red-500/60 text-red-400' : 'bg-blue-950/70 border-blue-500/60 text-blue-400'
            }`}>
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 ${
              isPlayerTurn ? 'bg-emerald-500 animate-ping' : isOpponentTurn ? 'bg-amber-500' : 'bg-cyan-500'
            }`}></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200">팀장 힌트 본부 (SPYMASTER AI)</span>
              <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full uppercase font-bold border ${
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

        {/* 힌트 히스토리 토글 버튼 */}
        {hintHistory.length > 0 && (
          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition-all font-mono"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>이전 힌트 기록 ({hintHistory.length})</span>
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {/* 📢 팀장 지령 안내 라인 (카드 바로 위에서 팀장의 구체적 지시사항 안내) */}
      {currentHint && isPlayerTurn && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-300 animate-fadeIn">
          <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-mono text-slate-300 text-[11px] sm:text-xs">
            📢 <strong>팀장 작전 지령:</strong> "위의 암호힌트를 확인하고 연관된 우리 팀 카드 <strong className="text-amber-300">[{currentHint.count}장]</strong>을 아래 카드판에서 신중히 지목하십시오."
          </span>
        </div>
      )}

      {/* 힌트 히스토리 드롭다운 */}
      {showHistory && hintHistory.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 animate-fadeIn">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
            이번 작전 누적 힌트 목록:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {hintHistory.map((h, i) => (
              <div key={i} className="bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">#{i + 1}턴</span>
                <span className="font-bold text-cyan-300">"{h.word}"</span>
                <span className="font-mono text-amber-300 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">{h.count}장</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
