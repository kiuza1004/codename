import React from 'react';
import { Hint, TeamColor, TurnPhase } from '../types/game';
import { speech } from '../utils/speech';
import { Bot, Radio, Target, Sparkles, Volume2 } from 'lucide-react';

interface SpymasterPanelProps {
  currentHint: Hint | null;
  turn: TurnPhase;
  playerTeam: TeamColor;
  guessesLeft: number;
  statusMessage: string;
}

export const SpymasterPanel: React.FC<SpymasterPanelProps> = ({
  currentHint,
  turn,
  playerTeam,
  guessesLeft,
  statusMessage,
}) => {
  const isPlayerTurn = turn === 'player_turn';
  const isOpponentTurn = turn === 'opponent_turn';
  const isThinking = turn === 'spymaster_thinking';

  const teamColorClass = playerTeam === 'red' ? 'text-red-400 border-red-500/40 bg-red-950/20' : 'text-blue-400 border-blue-500/40 bg-blue-950/20';
  const teamGlow = playerTeam === 'red' ? 'shadow-glow-red' : 'shadow-glow-blue';

  const replayVoiceHint = () => {
    if (currentHint) {
      const teamLabel = playerTeam === 'red' ? '레드' : '블루';
      speech.speakHint(teamLabel, currentHint.word, currentHint.count);
    }
  };

  return (
    <div className={`w-full rounded-2xl border transition-all duration-300 backdrop-blur-md p-4 sm:p-5 ${
      isPlayerTurn ? `${teamColorClass} ${teamGlow}` : 'border-slate-800 bg-slate-900/60'
    }`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 팀장 AI 프로필 & 상태 인디케이터 */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
              playerTeam === 'red' ? 'bg-red-950/60 border-red-500/50 text-red-400' : 'bg-blue-950/60 border-blue-500/50 text-blue-400'
            }`}>
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 ${
              isPlayerTurn ? 'bg-emerald-500 animate-ping' : isOpponentTurn ? 'bg-amber-500' : 'bg-cyan-500'
            }`}></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">SPYMASTER AI</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase border ${
                playerTeam === 'red' ? 'bg-red-950/80 border-red-500/40 text-red-300' : 'bg-blue-950/80 border-blue-500/40 text-blue-300'
              }`}>
                {playerTeam.toUpperCase()} TEAM LEADER
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              {isThinking && (
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Radio className="w-4 h-4 animate-spin" /> 팀장이 암호 힌트를 분석 중입니다...
                </span>
              )}
              {isOpponentTurn && (
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Radio className="w-4 h-4 animate-pulse" /> 상대 팀 요원들이 행동 중입니다...
                </span>
              )}
              {isPlayerTurn && (
                <span className="text-white flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-400" /> 현장 요원 작전 지목 단계
                </span>
              )}
            </h3>
          </div>
        </div>

        {/* 현재 제시된 힌트 영역 */}
        {currentHint && (
          <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 shadow-inner">
            <span className="text-xs font-mono text-slate-400">팀장 암호 힌트:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black font-spy tracking-wide text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                "{currentHint.word}"
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono font-bold text-sm">
                {currentHint.count}장
              </span>
            </div>

            {/* 음성 다시 듣기 버튼 */}
            <button
              onClick={replayVoiceHint}
              title="팀장 힌트 다시 듣기"
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-900/40 text-slate-300 hover:text-cyan-300 transition-all border border-slate-700"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 잔여 지목 기회 */}
        {isPlayerTurn && (
          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-medium">남은 지목 기회:</span>
            <span className="text-lg font-black font-mono">{guessesLeft}회</span>
          </div>
        )}
      </div>

      {/* 상태 안내 서브바 */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm">
        <span className="text-slate-300 font-medium tracking-wide">
          💡 {statusMessage}
        </span>
        {isPlayerTurn && (
          <span className="text-slate-400 font-mono text-xs hidden sm:inline">
            ※ 원치 않으면 언제든 아래 [턴 종료(Pass)]를 누를 수 있습니다.
          </span>
        )}
      </div>
    </div>
  );
};
