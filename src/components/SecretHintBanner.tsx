import React, { useState, useEffect } from 'react';
import { Hint, TeamColor } from '../types/game';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';
import { Target, Radio, Sparkles, Eye, EyeOff, Volume2 } from 'lucide-react';

interface SecretHintBannerProps {
  currentHint: Hint | null;
  guessesLeft: number;
  playerTeam: TeamColor;
  isPictureMode: boolean;
  disabled: boolean;
}

export const SecretHintBanner: React.FC<SecretHintBannerProps> = ({
  currentHint,
  guessesLeft,
  playerTeam,
  isPictureMode,
  disabled,
}) => {
  // 🎯 암호힌트는 기본 가림 처리 (선택 시에만 노출하여 정답 추리에 방해 없도록 함)
  const [isHintRevealed, setIsHintRevealed] = useState(false);

  useEffect(() => {
    setIsHintRevealed(false);
  }, [currentHint?.word]);

  const gridLayoutLabel = isPictureMode ? '5×4 (20장 그림판)' : '5×5 (25장 낱말판)';

  const replayVoice = () => {
    if (currentHint) {
      speech.speakHint(playerTeam === 'red' ? '레드' : '블루', currentHint.word, currentHint.count);
    }
  };

  const handleToggleHint = () => {
    sound.playCardFlip();
    setIsHintRevealed((prev) => !prev);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-slate-950 via-[#151c2e] to-slate-950 border-2 border-cyan-500/50 p-2.5 sm:p-4 shadow-xl shadow-cyan-950/40 relative overflow-hidden transition-all">
      {/* 상단 사이버 네온 라인 */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* 좌측: 암호힌트 영역 (가림 / 확인 토글 모드) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap flex-1 min-w-[280px]">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700/80 shrink-0">
            <Target className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>암호 힌트</span>
          </div>

          {currentHint ? (
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* 🔒 힌트가 가려져 있을 때: 확인 버튼 */}
              {!isHintRevealed ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleHint}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-cyan-900/40 border border-cyan-400/50 active:scale-95 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>👁️ 암호힌트 확인하기 (선택 시 노출)</span>
                  </button>
                  <span className="text-[11px] text-slate-400 hidden md:inline font-mono">
                    ※ 카드를 먼저 관찰한 뒤 암호힌트를 열어보세요.
                  </span>
                </div>
              ) : (
                /* 👁️ 암호힌트 공개 상태: 암호단어와 수량 및 가리기 버튼 */
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap animate-fadeIn">
                  {/* 암호단어 */}
                  <span className="text-xl sm:text-3xl md:text-4xl font-black font-spy tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] px-2.5 py-0.5 rounded-xl bg-cyan-950/70 border border-cyan-400/50">
                    "{currentHint.word}"
                  </span>

                  {/* 목표 수량 */}
                  <span className="text-lg sm:text-2xl font-black font-mono text-amber-300 px-2.5 py-0.5 rounded-xl bg-amber-950/70 border border-amber-500/50 shadow-md">
                    {currentHint.count}장
                  </span>

                  {/* 다시 가리기 */}
                  <button
                    type="button"
                    onClick={handleToggleHint}
                    title="암호힌트 가리기"
                    className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1"
                  >
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline">힌트 가리기</span>
                  </button>

                  {/* 음성 듣기 */}
                  <button
                    type="button"
                    onClick={replayVoice}
                    title="팀장 음성 다시 듣기"
                    className="p-1.5 sm:p-2 rounded-xl bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-500/40 text-cyan-300 hover:text-white transition-all shadow-sm flex items-center gap-1"
                  >
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px] font-bold font-mono hidden sm:inline">음성 듣기</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium">
              <Radio className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>팀장 AI가 암호단어를 연산 중입니다...</span>
            </div>
          )}
        </div>

        {/* 우측: 남은 지목 기회 및 보드 정보 */}
        <div className="flex items-center gap-2 shrink-0">
          {!disabled && (
            <div className="flex items-center gap-1.5 bg-emerald-950/70 border border-emerald-500/60 px-2.5 sm:px-3 py-1 rounded-xl text-emerald-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] sm:text-xs font-medium hidden sm:inline">남은 지목:</span>
              <span className="text-sm sm:text-base font-black font-mono">{guessesLeft}회</span>
            </div>
          )}

          <div className="text-[10px] sm:text-xs font-mono text-slate-400 bg-slate-900/80 px-2 sm:px-2.5 py-1 rounded-xl border border-slate-800">
            {gridLayoutLabel}
          </div>
        </div>
      </div>
    </div>
  );
};
