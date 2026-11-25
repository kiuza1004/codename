import React, { useState } from 'react';
import { Hint, TeamColor, TurnPhase } from '../types/game';
import { Bot, Radio, Target, History, ChevronDown, ChevronUp, Flame, ShieldCheck } from 'lucide-react';

interface SpymasterPanelProps {
  currentHint: Hint | null;
  hintHistory: Hint[];
  turn: TurnPhase;
  playerTeam: TeamColor;
  statusMessage: string;
  combo?: number;
}

export const SpymasterPanel: React.FC<SpymasterPanelProps> = ({
  currentHint,
  hintHistory,
  turn,
  playerTeam,
  statusMessage,
  combo = 0,
}) => {
  const [showHistory, setShowHistory] = useState(false);

  const isPlayerTurn = turn === 'player_turn';
  const isOpponentTurn = turn === 'opponent_turn';
  const isThinking = turn === 'spymaster_thinking';

  const activeTeam: TeamColor = isOpponentTurn ? (playerTeam === 'red' ? 'blue' : 'red') : playerTeam;
  const teamLabel = isOpponentTurn
    ? (playerTeam === 'red' ? '상대팀 블루(BLUE)' : '상대팀 레드(RED)')
    : (playerTeam === 'red' ? '아군 레드(RED)' : '아군 블루(BLUE)');

  return (
    <div className="w-full flex flex-col gap-2 my-1">
      {/* 2번 화면 - ① [맨 위] 이전 힌트 기록 패널 */}
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
                  <div className="flex items-center gap-1.5">
                    {h.confidence && (
                      <span className="text-[9px] font-mono text-emerald-400 hidden sm:inline">
                        {h.confidence}%
                      </span>
                    )}
                    <span className="font-mono text-amber-300 font-bold bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/40 text-[11px]">
                      {h.count}장
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2번 화면 - ② [바로 아래] 팀장 힌트 패널 (카드 바로 위에 위치) */}
      <div className={`w-full rounded-2xl border p-2.5 sm:p-3.5 shadow-md transition-all ${
        isOpponentTurn
          ? (activeTeam === 'red' ? 'bg-[#1a0f14]/95 border-red-500/50' : 'bg-[#0f1422]/95 border-blue-500/50')
          : 'bg-[#121725]/95 border-slate-700/70'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap flex-1">
            <div className="relative shrink-0">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border shadow-inner ${
                activeTeam === 'red' ? 'bg-red-950/70 border-red-500/60 text-red-400' : 'bg-blue-950/70 border-blue-500/60 text-blue-400'
              }`}>
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                isPlayerTurn ? 'bg-emerald-500 animate-ping' : isOpponentTurn ? 'bg-amber-500 animate-pulse' : 'bg-cyan-500'
              }`}></span>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[220px]">
              {/* 상단: 팀장 라벨 및 팀 정보 */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
                  {isOpponentTurn ? '상대 팀장 힌트' : '팀장 힌트'}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold border ${
                  activeTeam === 'red' ? 'bg-red-950/80 border-red-500/40 text-red-300' : 'bg-blue-950/80 border-blue-500/40 text-blue-300'
                }`}>
                  {teamLabel}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  ARGON AI ENGINE
                </span>
              </div>

              {/* 하단: 핵심 팀장 힌트 내용 (단어 + 수량) 바로 노출 */}
              {currentHint ? (
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap mt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-2xl font-black font-spy tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white px-2.5 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-400/50 shadow-sm">
                      "{currentHint.word}"
                    </span>
                    <span className="text-sm sm:text-lg font-black font-mono text-amber-300 px-2 py-0.5 rounded-lg bg-amber-950/80 border border-amber-500/50 shadow-sm">
                      {currentHint.count}장
                    </span>
                  </div>

                  {/* 상태 메시지 */}
                  <div className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
                    {isThinking && <span className="text-cyan-400 flex items-center gap-1"><Radio className="w-3.5 h-3.5 animate-spin" /> 팀장 AI가 새 암호단어를 연산 중...</span>}
                    {isOpponentTurn && <span className="text-amber-400 flex items-center gap-1"><Radio className="w-3.5 h-3.5 animate-pulse" /> {statusMessage}</span>}
                    {isPlayerTurn && <span className="text-emerald-400 flex items-center gap-1"><Target className="w-3.5 h-3.5 shrink-0" /> <span>{statusMessage}</span></span>}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mt-0.5">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>팀장 힌트를 생성 중입니다...</span>
                </div>
              )}
            </div>
          </div>

          {/* 연속 정답 콤보 배지 (2콤보 이상 시 활성화) */}
          {combo >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/50 text-amber-300 text-xs font-mono font-black animate-bounce shrink-0">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{combo} COMBO!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
