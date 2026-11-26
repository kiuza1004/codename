import React, { useState } from 'react';
import { CardItem, GameStats, Hint, TeamColor } from '../types/game';
import { Trophy, AlertTriangle, RefreshCw, Key, CheckCircle2, ShieldAlert, Skull, User, Eye, EyeOff, Target, MessageSquare, Award } from 'lucide-react';

interface GameOverModalProps {
  winner: TeamColor | 'assassin_loss' | null;
  playerTeam: TeamColor;
  cards: CardItem[];
  stats: GameStats;
  hintHistory: Hint[];
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  playerTeam,
  cards,
  stats,
  hintHistory,
  onRestart,
}) => {
  const [showKeycard, setShowKeycard] = useState(true);
  const [showHintReview, setShowHintReview] = useState(true);

  const isVictory = winner === playerTeam;
  const isAssassinLoss = winner === 'assassin_loss';

  // 플레이어가 직접 밝힌 카드 집합
  const revealedCardMap = new Map<string, CardItem>();
  cards.forEach(c => revealedCardMap.set(c.word, c));

  // Argon 전술 작전 등급 산출 (S / A / B / C)
  const getTacticalGrade = () => {
    if (!isVictory) return { grade: 'C', label: '작전 실패 (재도전 요망)', color: 'text-red-400 border-red-500/50 bg-red-950/60' };
    if (stats.wrongGuesses === 0 && stats.turnsTaken <= 4) {
      return { grade: 'S+', label: '완벽한 전설적 요원 (무결점 클리어)', color: 'text-amber-300 border-amber-400 bg-amber-950/70' };
    }
    if (stats.wrongGuesses <= 1) {
      return { grade: 'S', label: '최정예 스페셜 요원', color: 'text-emerald-300 border-emerald-400 bg-emerald-950/70' };
    }
    if (stats.wrongGuesses <= 2) {
      return { grade: 'A', label: '우수 현장 요원', color: 'text-cyan-300 border-cyan-400 bg-cyan-950/70' };
    }
    return { grade: 'B', label: '작전 완수', color: 'text-blue-300 border-blue-400 bg-blue-950/70' };
  };

  const gradeInfo = getTacticalGrade();

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#141b2b] border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl relative my-auto max-h-[95vh] overflow-y-auto">
        {/* 상단 결과 배너 */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center shadow-xl mb-3 ${
            isVictory
              ? 'bg-gradient-to-br from-amber-400 to-yellow-600 shadow-yellow-500/30 text-white ring-4 ring-yellow-400/20'
              : 'bg-gradient-to-br from-red-600 to-zinc-900 shadow-red-600/30 text-white ring-4 ring-red-500/20'
          }`}>
            {isVictory ? <Trophy className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" /> : <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />}
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-wide font-mono">
            {isVictory && <span className="text-yellow-400">MISSION ACCOMPLISHED!</span>}
            {!isVictory && isAssassinLoss && <span className="text-red-500">ASSASSIN ELIMINATED!</span>}
            {!isVictory && !isAssassinLoss && <span className="text-red-400">MISSION COMPROMISED!</span>}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            {isVictory && '모든 아군 요원과 비밀 접선에 성공하여 작전에서 최종 승리했습니다!'}
            {isAssassinLoss && '암살자 카드를 지목하여 본부가 즉시 발각되었습니다. (암살 패배)'}
            {!isVictory && !isAssassinLoss && '상대 팀이 모든 요원을 먼저 확보하여 작전에서 패배했습니다.'}
          </p>

          {/* Argon 작전 등급 배지 */}
          <div className={`mt-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold ${gradeInfo.color}`}>
            <Award className="w-4 h-4" />
            <span>작전 평가 등급: [{gradeInfo.grade}] · {gradeInfo.label}</span>
          </div>
        </div>

        {/* 통계 요약 박스 */}
        <div className="grid grid-cols-4 gap-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 mb-5 text-center">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">소요 턴</div>
            <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">{stats.turnsTaken}턴</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">구출 요원</div>
            <div className="text-base sm:text-lg font-bold font-mono text-emerald-400">{stats.correctGuesses}명</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">최대 콤보</div>
            <div className="text-base sm:text-lg font-bold font-mono text-amber-400">{stats.maxCombo || 0}연속</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">오답 횟수</div>
            <div className="text-base sm:text-lg font-bold font-mono text-red-400">{stats.wrongGuesses}회</div>
          </div>
        </div>

        {/* 1. 팀장 힌트 의도 복기 섹션 */}
        <div className="mb-5 bg-slate-950/90 border border-cyan-800/40 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase font-bold text-cyan-300">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>작전 힌트 의도 전체 복기 ({hintHistory.length}회)</span>
            </div>
            <button
              onClick={() => setShowHintReview(!showHintReview)}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
            >
              {showHintReview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showHintReview ? '접기' : '펼치기'}</span>
            </button>
          </div>

          {showHintReview && (
            <div className="space-y-2.5">
              {hintHistory.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-2">기록된 힌트가 없습니다.</p>
              ) : (
                hintHistory.map((h, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          #{i + 1}턴
                        </span>
                        <span className="text-sm font-black text-cyan-300">"{h.word}"</span>
                        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40">
                          {h.count}장 목표
                        </span>
                      </div>
                      {h.confidence && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                          AI 확신도 {h.confidence}%
                        </span>
                      )}
                    </div>

                    {/* 팀장이 유도했던 타깃 카드 목록 및 실제 적중 여부 */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs">
                      <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                        🎯 유도한 목표 카드:
                      </span>
                      {h.targetWords && h.targetWords.length > 0 ? (
                        h.targetWords.map((tw, idx) => {
                          const cardState = revealedCardMap.get(tw);
                          const isFound = cardState?.revealed;
                          return (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded-lg font-bold text-xs border ${
                                isFound
                                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50'
                                  : 'bg-slate-800 text-slate-300 border-slate-700'
                              }`}
                            >
                              {isFound ? `✓ ${tw} (확보)` : `○ ${tw} (미확보)`}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-slate-500 text-xs">기록 없음</span>
                      )}
                    </div>

                    {/* 팀장의 힌트 상세 해설 */}
                    {h.explanation && (
                      <p className="text-[11px] text-slate-400 font-mono bg-slate-950/50 p-1.5 rounded mt-0.5 flex items-start gap-1">
                        <MessageSquare className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{h.explanation}</span>
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* 2. 비밀 키카드 (Secret Keycard) 전체 복기 맵 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>기밀 키카드(Keycard) 원본 전체 공개 ({cards.length}장)</span>
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
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-2.5 sm:p-3">
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {cards.map((c) => (
                  <div
                    key={c.id}
                    className={`p-1.5 sm:p-2 rounded-xl text-center border text-[10px] sm:text-xs font-bold font-spy flex flex-col items-center justify-center gap-0.5 ${
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
                    <span className="text-[8px] sm:text-[9px] font-mono opacity-80 flex items-center gap-0.5">
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
            className="flex-1 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/30 hover:brightness-110 active:scale-[0.99] transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            <span>새 작전 도전하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
