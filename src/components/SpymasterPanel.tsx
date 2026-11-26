import React, { useState } from 'react';
import { Hint, TeamColor, TurnPhase } from '../types/game';
import { Bot, Radio, Target, History, ChevronDown, ChevronUp, Flame, ShieldCheck, SkipForward } from 'lucide-react';

interface SpymasterPanelProps {
  currentHint: Hint | null;
  hintHistory: Hint[];
  turn: TurnPhase;
  playerTeam: TeamColor;
  statusMessage: string;
  combo?: number;
  guessesLeft?: number;
  onPassTurn?: () => void;
  canPassTurn?: boolean;
}

export const SpymasterPanel: React.FC<SpymasterPanelProps> = ({
  currentHint,
  hintHistory,
  turn,
  playerTeam,
  statusMessage,
  combo = 0,
  guessesLeft = 0,
  onPassTurn,
  canPassTurn = false,
}) => {
  const [showHistory, setShowHistory] = useState(false);

  const isPlayerTurn = turn === 'player_turn';
  const isOpponentTurn = turn === 'opponent_turn';
  const isThinking = turn === 'spymaster_thinking';

  const activeTeam: TeamColor = isOpponentTurn ? (playerTeam === 'red' ? 'blue' : 'red') : playerTeam;
  const teamLabel = isOpponentTurn
    ? (playerTeam === 'red' ? '상대 블루' : '상대 레드')
    : (playerTeam === 'red' ? '아군 레드' : '아군 블루');

  return (
    <div className={`w-full rounded-xl border px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-sm transition-all my-0.5 ${
      isOpponentTurn
        ? (activeTeam === 'red' ? 'bg-[#1a0f14]/95 border-red-500/50' : 'bg-[#0f1422]/95 border-blue-500/50')
        : 'bg-[#121725]/95 border-slate-700/70'
    }`}>
      {/* 🔹 1줄: 상단 메타 바 (팀 정보, 이전기록 토글, 턴 종료 버튼) */}
      <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5 flex-wrap">
          <div className="relative shrink-0">
            <div className={`w-5 h-5 rounded-lg flex items-center justify-center border shadow-inner ${
              activeTeam === 'red' ? 'bg-red-950/70 border-red-500/60 text-red-400' : 'bg-blue-950/70 border-blue-500/60 text-blue-400'
            }`}>
              <Bot className="w-3 h-3 animate-pulse" />
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-slate-950 ${
              isPlayerTurn ? 'bg-emerald-500 animate-ping' : isOpponentTurn ? 'bg-amber-500 animate-pulse' : 'bg-cyan-500'
            }`}></span>
          </div>

          <span className="text-[11px] font-mono font-black text-slate-200">
            {isOpponentTurn ? '상대 팀장 힌트' : '팀장 힌트'}
          </span>
          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full uppercase font-bold border ${
            activeTeam === 'red' ? 'bg-red-950/80 border-red-500/40 text-red-300' : 'bg-blue-950/80 border-blue-500/40 text-blue-300'
          }`}>
            {teamLabel}
          </span>

          {combo >= 2 && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-md bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[9px] font-mono font-black animate-bounce">
              <Flame className="w-2.5 h-2.5 text-amber-400" />
              <span>{combo}연속!</span>
            </span>
          )}
        </div>

        {/* 우측 컨트롤: 이전 기록 토글 + 턴 종료 버튼 */}
        <div className="flex items-center gap-1.5 shrink-0">
          {hintHistory.length > 0 && (
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 hover:text-cyan-300 border border-slate-700 transition-all font-mono"
            >
              <History className="w-3 h-3 text-cyan-400" />
              <span>기록 {hintHistory.length}건</span>
              {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          {onPassTurn && (
            <button
              type="button"
              onClick={onPassTurn}
              disabled={!canPassTurn}
              title={canPassTurn ? '남은 지목 기회를 마치고 상대 턴으로 넘깁니다' : '현재는 턴을 넘길 수 없습니다'}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-bold font-mono text-[10px] sm:text-[11px] border transition-all shadow-sm ${
                canPassTurn
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border-amber-400 text-white shadow-amber-900/50 cursor-pointer active:scale-95 animate-pulse'
                  : 'bg-slate-900/60 text-slate-500 border-slate-800 cursor-not-allowed opacity-40'
              }`}
            >
              <SkipForward className={`w-3 h-3 ${canPassTurn ? 'text-amber-200' : 'text-slate-500'}`} />
              <span>턴 종료</span>
            </button>
          )}
        </div>
      </div>

      {/* 🔹 2줄: 핵심 힌트 바 (암호 단어 + 목표 수량 + 남은 기회 바로 노출) */}
      <div className="flex items-center justify-between gap-2 py-0.5 flex-wrap">
        {currentHint ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-base font-black font-spy tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-400/50 shadow-sm">
              "{currentHint.word}"
            </span>
            <span className="text-[11px] sm:text-xs font-black font-mono text-amber-300 px-1.5 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/50 shadow-sm">
              {currentHint.count}장 목표
            </span>
            {guessesLeft > 0 && isPlayerTurn && (
              <span className="text-[10px] sm:text-[11px] font-bold font-mono text-emerald-300 px-1.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/50">
                기회 {guessesLeft}회
              </span>
            )}
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 py-0.5">
            <Radio className="w-3 h-3 text-cyan-400 animate-spin" />
            <span>팀장 암호 지령을 연산 중입니다...</span>
          </div>
        )}

        <span className="hidden sm:inline-flex items-center gap-1 text-[8px] font-mono text-cyan-400/80 bg-cyan-950/40 px-1.5 py-0.2 rounded border border-cyan-500/20">
          <ShieldCheck className="w-2.5 h-2.5" />
          ARGON NEURAL ENGINE
        </span>
      </div>

      {/* 🔹 3줄: 실시간 상태 및 AI 요원 추리 브리핑 라인 */}
      <div className="text-[10px] sm:text-[11px] text-slate-300 font-medium flex items-center gap-1 pt-0.5 truncate border-t border-slate-800/60">
        {isThinking && (
          <span className="text-cyan-400 flex items-center gap-1 truncate">
            <Radio className="w-3 h-3 animate-spin shrink-0" />
            <span className="truncate">팀장이 키카드를 분석하여 최적의 암호단어를 도출하고 있습니다...</span>
          </span>
        )}
        {isOpponentTurn && (
          <span className="text-amber-400 flex items-center gap-1 truncate">
            <Radio className="w-3 h-3 animate-pulse shrink-0" />
            <span className="truncate">{statusMessage}</span>
          </span>
        )}
        {isPlayerTurn && (
          <span className="text-emerald-400 flex items-center gap-1 truncate">
            <Target className="w-3 h-3 shrink-0" />
            <span className="truncate font-mono">{statusMessage}</span>
          </span>
        )}
      </div>

      {/* 이전 힌트 기록 드롭다운 (펼칠 때만 컴팩트하게 노출) */}
      {showHistory && hintHistory.length > 0 && (
        <div className="mt-1 pt-1 border-t border-slate-800 animate-fadeIn max-h-24 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
            {hintHistory.map((h, i) => (
              <div key={i} className="bg-slate-900/90 border border-slate-800 px-1.5 py-0.5 rounded flex items-center justify-between text-[9px]">
                <span className="text-slate-400 font-mono">#{i + 1}턴</span>
                <span className="font-bold text-cyan-300 truncate mx-1">"{h.word}"</span>
                <span className="font-mono text-amber-300 font-bold bg-amber-950/50 px-1 rounded border border-amber-500/40">
                  {h.count}장
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
