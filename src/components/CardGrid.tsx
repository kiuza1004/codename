import React, { useState, useEffect } from 'react';
import { CardItem, Hint, TeamColor } from '../types/game';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';
import { Skull, User, ShieldAlert, CheckCircle2, Volume2, Sparkles, Target, Radio, Eye, EyeOff } from 'lucide-react';

interface CardGridProps {
  cards: CardItem[];
  currentHint: Hint | null;
  guessesLeft: number;
  playerTeam: TeamColor;
  onSelectCard: (id: number) => void;
  disabled: boolean;
}

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  currentHint,
  guessesLeft,
  playerTeam,
  onSelectCard,
  disabled,
}) => {
  // 🎯 [사용자 요청] 힌트는 사용자가 선택(클릭)했을 때만 보여줌 (기본은 가림 처리하여 정답 추리에 방해 없도록 함)
  const [isHintRevealed, setIsHintRevealed] = useState(false);

  // 새로운 힌트가 들어오면 기본적으로 힌트를 가려둠 (사용자가 원할 때 확인하도록)
  useEffect(() => {
    setIsHintRevealed(false);
  }, [currentHint?.word]);

  const isPictureMode = cards.length > 0 && cards[0].mode === 'picture';
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

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-2 my-1 sm:my-2">
      {/* 🎯 [사용자 요청] 낱말/그림 카드 바로 위 암호단어 배너 (선택 시에만 힌트 노출) */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-slate-950 via-[#151c2e] to-slate-950 border-2 border-cyan-500/50 p-2.5 sm:p-4 shadow-xl shadow-cyan-950/40 relative overflow-hidden transition-all">
        {/* 상단 사이버 네온 라인 */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* 좌측: 암호단어 영역 (가림 / 확인 모드) */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap flex-1 min-w-[280px]">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700/80 shrink-0">
              <Target className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>암호 힌트</span>
            </div>

            {currentHint ? (
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {/* 🔒 힌트가 가려져 있을 때: 확인 버튼 제공 */}
                {!isHintRevealed ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleHint}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-cyan-900/40 border border-cyan-400/50 active:scale-95 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      <span>👁️ 힌트 확인하기 (선택 시 노출)</span>
                    </button>
                    <span className="text-[11px] text-slate-400 hidden md:inline font-mono">
                      ※ 답을 풀 때 시야를 방해하지 않도록 기본 가림 상태입니다.
                    </span>
                  </div>
                ) : (
                  /* 👁️ 힌트가 열려 있을 때: 암호단어와 수량 표시 및 가리기 버튼 */
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap animate-fadeIn">
                    {/* 초대형 암호단어 */}
                    <span className="text-xl sm:text-3xl md:text-4xl font-black font-spy tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] px-2.5 py-0.5 rounded-xl bg-cyan-950/70 border border-cyan-400/50">
                      "{currentHint.word}"
                    </span>

                    {/* 목표 카드 수량 */}
                    <span className="text-lg sm:text-2xl font-black font-mono text-amber-300 px-2.5 py-0.5 rounded-xl bg-amber-950/70 border border-amber-500/50 shadow-md">
                      {currentHint.count}장
                    </span>

                    {/* 힌트 다시 가리기 토글 버튼 */}
                    <button
                      type="button"
                      onClick={handleToggleHint}
                      title="힌트 가리기"
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-mono flex items-center gap-1"
                    >
                      <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                      <span className="hidden sm:inline">힌트 가리기</span>
                    </button>

                    {/* 음성 다시 듣기 */}
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

        {/* 힌트 해설 자막 라인 (선택 시에만 보임) */}
        {currentHint && isHintRevealed && (
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 animate-fadeIn">
            <span className="font-mono text-slate-400 text-[11px]">
              📢 <strong>팀장 지령:</strong> "{playerTeam === 'red' ? '레드' : '블루'} 팀장 힌트입니다. 단어 <strong className="text-cyan-300">[{currentHint.word}]</strong>, 목표 카드 <strong className="text-amber-300">[{currentHint.count}장]</strong>을 지목하십시오."
            </span>
          </div>
        )}
      </div>

      {/* 낱말 카드 (5x5, 25장) 또는 그림 카드 (5x4, 20장) 그리드 */}
      <div className="w-full grid grid-cols-5 gap-1.5 sm:gap-3 md:gap-4 my-1 sm:my-2">
        {cards.map((card) => {
          const isClickable = !card.revealed && !disabled;

          return (
            <div
              key={card.id}
              className="perspective-1000 h-20 sm:h-28 md:h-32 select-none"
              onMouseEnter={() => {
                if (isClickable) sound.playHover();
              }}
            >
              <div
                onClick={() => {
                  if (isClickable) onSelectCard(card.id);
                }}
                className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform cursor-pointer rounded-xl sm:rounded-2xl shadow-md ${
                  card.revealed ? 'rotate-y-180' : isClickable ? 'hover:-translate-y-1 hover:shadow-cyan-500/20 active:scale-95' : 'opacity-80 cursor-not-allowed'
                }`}
              >
                {/* 앞면 (미공개 상태: 낱말 카드 or 그림 카드) */}
                <div className="absolute inset-0 backface-hidden rounded-xl sm:rounded-2xl border border-slate-700/80 bg-gradient-to-b from-[#1e2738] to-[#141b28] p-1.5 sm:p-2.5 flex flex-col justify-between items-center transition-all group overflow-hidden shadow-inner">
                  {/* 상단 180도 회전 텍스트 / 번호 */}
                  <div className="w-full flex justify-between items-center opacity-40 group-hover:opacity-70 transition-opacity">
                    <span className="text-[8px] sm:text-xs font-mono font-semibold rotate-180 select-none tracking-tight truncate max-w-[70%]">
                      {card.mode === 'picture' ? 'PICTURE' : card.word}
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-slate-500">#{card.id + 1}</span>
                  </div>

                  {/* 중앙 메인: 그림 모드면 멋진 SVG 일러스트, 낱말 모드면 큼직한 텍스트 */}
                  {card.mode === 'picture' && card.svgIcon ? (
                    <div className="flex-1 w-full flex flex-col items-center justify-center p-0.5 overflow-hidden">
                      <div
                        className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 text-slate-200 group-hover:text-cyan-300 transition-colors drop-shadow"
                        dangerouslySetInnerHTML={{ __html: card.svgIcon }}
                      />
                      <span className="text-[10px] sm:text-xs font-bold text-slate-300 group-hover:text-cyan-200 tracking-tight truncate w-full text-center mt-0.5">
                        {card.word}
                      </span>
                    </div>
                  ) : (
                    <div className="my-auto py-1 text-center w-full px-1">
                      <span className="text-sm sm:text-xl md:text-2xl font-black tracking-wide text-slate-100 group-hover:text-cyan-300 transition-colors drop-shadow truncate block">
                        {card.word}
                      </span>
                    </div>
                  )}

                  {/* 하단 데코 라인 */}
                  <div className="w-full flex justify-center items-center gap-1.5 opacity-30">
                    <div className="h-[2px] w-6 sm:w-10 bg-slate-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <div className="h-[2px] w-6 sm:w-10 bg-slate-500 rounded-full"></div>
                  </div>

                  {/* 호버 테두리 글로우 */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-cyan-400/0 group-hover:border-cyan-400/40 pointer-events-none transition-all"></div>
                </div>

                {/* 뒷면 (공개 상태: 정체 공개) */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl sm:rounded-2xl p-1.5 sm:p-3 flex flex-col justify-between items-center shadow-lg border ${
                    card.type === 'red'
                      ? 'bg-gradient-to-br from-red-600 to-red-800 border-red-400 text-white shadow-red-900/50'
                      : card.type === 'blue'
                      ? 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400 text-white shadow-blue-900/50'
                      : card.type === 'assassin'
                      ? 'bg-gradient-to-br from-zinc-900 via-neutral-950 to-black border-red-600 text-red-500 shadow-black'
                      : 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 text-amber-950 shadow-amber-950/20'
                  }`}
                >
                  {/* 상단 레이블 */}
                  <div className="w-full flex justify-between items-center text-[8px] sm:text-[10px] font-mono uppercase tracking-wider font-bold opacity-80">
                    <span className="truncate">
                      {card.type === 'red' && 'RED AGENT'}
                      {card.type === 'blue' && 'BLUE AGENT'}
                      {card.type === 'neutral' && 'BYSTANDER'}
                      {card.type === 'assassin' && 'ASSASSIN'}
                    </span>
                    <span>#{card.id + 1}</span>
                  </div>

                  {/* 중앙 아이콘 & 단어 */}
                  <div className="flex flex-col items-center justify-center gap-1">
                    {card.type === 'red' && <ShieldAlert className="w-6 h-6 sm:w-8 sm:h-8 text-red-200 animate-pulse" />}
                    {card.type === 'blue' && <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200 animate-pulse" />}
                    {card.type === 'neutral' && <User className="w-6 h-6 sm:w-8 sm:h-8 text-amber-800" />}
                    {card.type === 'assassin' && <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 animate-bounce" />}

                    <span className={`text-xs sm:text-base font-black tracking-wide ${
                      card.type === 'neutral' ? 'text-amber-950' : card.type === 'assassin' ? 'text-red-400' : 'text-white'
                    }`}>
                      {card.word}
                    </span>
                  </div>

                  {/* 하단 스탬프 */}
                  <div className={`text-[7px] sm:text-[9px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-full border ${
                    card.type === 'neutral'
                      ? 'border-amber-400/60 bg-amber-200/50 text-amber-900'
                      : card.type === 'assassin'
                      ? 'border-red-500/80 bg-red-950/60 text-red-400'
                      : 'border-white/40 bg-black/20 text-white'
                  }`}>
                    {card.type === 'assassin' ? 'CRITICAL FAIL' : 'CONFIRMED'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
