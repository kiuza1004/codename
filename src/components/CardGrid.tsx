import React, { useState } from 'react';
import { CardItem } from '../types/game';
import { sound } from '../utils/audio';
import { Skull, User, ShieldAlert, CheckCircle2, Pin, ZoomIn, ZoomOut, Maximize2, X, Target } from 'lucide-react';

interface CardGridProps {
  cards: CardItem[];
  onSelectCard: (id: number) => void;
  onToggleMarkCard?: (id: number) => void;
  onClearMarks?: () => void;
  disabled: boolean;
  isSpymasterView?: boolean;
  targetingCardId?: number | null;
}

// 🔤 글자 길이에 따른 최적화 폰트 크기 계산 (긴 단어 잘림 방지 및 세로 공간 최적화)
const getCardFontSize = (word: string, isLarge: boolean) => {
  const len = word.length;
  if (isLarge) {
    if (len <= 2) return 'text-xs sm:text-base md:text-lg';
    if (len === 3) return 'text-[11px] sm:text-sm md:text-base';
    if (len === 4) return 'text-[10px] sm:text-xs md:text-sm tracking-tight';
    return 'text-[9px] sm:text-[11px] md:text-xs tracking-tighter leading-tight';
  } else {
    if (len <= 2) return 'text-[11px] sm:text-xs md:text-sm';
    if (len === 3) return 'text-[10px] sm:text-[11px] md:text-xs';
    if (len === 4) return 'text-[9px] sm:text-[10px] md:text-[11px] tracking-tight';
    return 'text-[8px] sm:text-[9px] md:text-[10px] tracking-tighter leading-tight';
  }
};

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onSelectCard,
  onToggleMarkCard,
  onClearMarks,
  disabled,
  isSpymasterView = false,
  targetingCardId = null,
}) => {
  // 🔍 모바일/PC 사용자 편의용 카드 확대 보기(Large View) 토글 및 그림 카드 정밀 확대 모달
  const [isLargeZoom, setIsLargeZoom] = useState(false);
  const [inspectedCard, setInspectedCard] = useState<CardItem | null>(null);

  if (!cards || cards.length === 0) {
    return null;
  }

  const markedCount = cards.filter(c => c.marked && !c.revealed).length;

  return (
    <div className="w-full my-0.5">
      {/* 🎯 Argon 전술 그리드 보조 툴바: 후보 핀 마킹 안내 및 카드 크기 확대/표준 전환 */}
      <div className="flex items-center justify-between gap-1.5 mb-1 px-1">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Pin className="w-2.5 h-2.5 text-cyan-400" />
            <span>카드 우측상단 <strong className="text-cyan-300">[핀]</strong>으로 후보 체크</span>
          </span>
          {markedCount > 0 && (
            <div className="flex items-center gap-1 bg-cyan-950/80 border border-cyan-500/50 px-1.5 py-0.2 rounded text-[10px] font-mono text-cyan-300">
              <span>📌 {markedCount}장</span>
              {onClearMarks && (
                <button
                  type="button"
                  onClick={onClearMarks}
                  className="text-slate-400 hover:text-white underline ml-0.5"
                >
                  초기화
                </button>
              )}
            </div>
          )}
        </div>

        {/* 카드 확대/표준 토글 버튼 */}
        <button
          type="button"
          onClick={() => {
            sound.playHover();
            setIsLargeZoom(!isLargeZoom);
          }}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold transition-all shrink-0 ${
            isLargeZoom
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm'
              : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          {isLargeZoom ? <ZoomOut className="w-3 h-3 text-cyan-400" /> : <ZoomIn className="w-3 h-3 text-cyan-400" />}
          <span>{isLargeZoom ? '표준 크기로' : '크게 보기'}</span>
        </button>
      </div>

      {/* 낱말 카드 (5x5, 25장) 또는 그림 카드 (5x4, 20장) 5열 고정 그리드 */}
      <div className="w-full grid grid-cols-5 gap-1 sm:gap-1.5 md:gap-2">
        {cards.map((card) => {
          const isClickable = !card.revealed && !disabled && !isSpymasterView;
          const isMarked = Boolean(card.marked && !card.revealed);
          const isTargeting = Boolean(targetingCardId !== null && targetingCardId !== undefined && card.id === targetingCardId && !card.revealed);

          let spymasterBorderClass = '';
          let spymasterBadge = null;
          if (isSpymasterView && !card.revealed) {
            if (card.type === 'red') {
              spymasterBorderClass = 'border-2 border-red-500/80 bg-red-950/40';
              spymasterBadge = <span className="text-[7px] font-mono font-black text-red-300 bg-red-950 border border-red-500/60 px-0.5 rounded">RED</span>;
            } else if (card.type === 'blue') {
              spymasterBorderClass = 'border-2 border-blue-500/80 bg-blue-950/40';
              spymasterBadge = <span className="text-[7px] font-mono font-black text-blue-300 bg-blue-950 border border-blue-500/60 px-0.5 rounded">BLUE</span>;
            } else if (card.type === 'neutral') {
              spymasterBorderClass = 'border-2 border-amber-500/50 bg-amber-950/20';
              spymasterBadge = <span className="text-[7px] font-mono font-bold text-amber-300/80 bg-amber-950/60 border border-amber-500/40 px-0.5 rounded">중립</span>;
            } else if (card.type === 'assassin') {
              spymasterBorderClass = 'border-2 border-rose-600 bg-black/80 ring-2 ring-rose-500/50';
              spymasterBadge = <span className="text-[7px] font-mono font-black text-rose-400 bg-black border border-rose-600 px-0.5 rounded">💀암살</span>;
            }
          }

          let cardFrontStyle = 'border-slate-700/80 bg-gradient-to-b from-[#1e2738] to-[#141b28]';
          if (isTargeting) {
            cardFrontStyle = 'border-2 border-cyan-400 bg-gradient-to-b from-cyan-950/90 via-[#1e2738] to-[#141b28] ring-2 ring-cyan-400/60 shadow-lg shadow-cyan-500/40 animate-pulse';
          } else if (isMarked) {
            cardFrontStyle = 'border-2 border-amber-400 bg-gradient-to-b from-amber-950/60 via-[#1e2738] to-[#141b28] ring-1 ring-amber-400/30 shadow-md shadow-amber-500/10';
          } else if (spymasterBorderClass) {
            cardFrontStyle = spymasterBorderClass;
          }

          return (
            <div
              key={card.id}
              className={`perspective-1000 select-none transition-all duration-300 ${
                isLargeZoom ? 'h-20 sm:h-24 md:h-28 lg:h-32' : 'h-12 sm:h-16 md:h-18 lg:h-20'
              } ${isTargeting ? 'scale-[1.03] z-20' : ''}`}
              onMouseEnter={() => {
                if (isClickable) sound.playHover();
              }}
            >
              <div
                onClick={() => {
                  if (isClickable) onSelectCard(card.id);
                }}
                className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform cursor-pointer rounded-lg sm:rounded-xl shadow-sm ${
                  card.revealed
                    ? 'rotate-y-180'
                    : isClickable
                    ? 'hover:-translate-y-0.5 hover:shadow-cyan-500/20 active:scale-95'
                    : 'opacity-85 cursor-not-allowed'
                }`}
              >
                {/* 앞면 (미공개 상태: 낱말 카드 or 그림 카드) */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-lg sm:rounded-xl border p-1 sm:p-1.5 flex flex-col justify-between items-center transition-all group overflow-hidden shadow-inner ${cardFrontStyle}`}
                >
                  {/* 상단 바: 번호, 팀장 투시 배지 & 후보 핀 마킹 버튼 */}
                  <div className="w-full flex justify-between items-center z-10 leading-none">
                    <div className="flex items-center gap-1">
                      <span className="text-[7px] sm:text-[9px] font-mono tracking-wider text-slate-400 opacity-75">
                        #{card.id + 1}
                      </span>
                      {spymasterBadge}
                      {isTargeting && (
                        <span className="flex items-center gap-0.5 bg-cyan-500 text-slate-950 font-black text-[6px] sm:text-[8px] px-1 py-0.2 rounded-full shadow animate-bounce">
                          <Target className="w-2 h-2 animate-spin" />
                          <span>조준</span>
                        </span>
                      )}
                    </div>

                    {/* 📌 후보 핀 마킹 버튼 (카드 뒤집기와 독립 동작) */}
                    {onToggleMarkCard && !card.revealed && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleMarkCard(card.id);
                        }}
                        title={isMarked ? '후보 마킹 해제' : '추리 후보로 핀 마킹'}
                        className={`p-0.5 rounded transition-all ${
                          isMarked
                            ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                            : 'bg-slate-800/70 text-slate-400 opacity-60 hover:opacity-100 hover:bg-slate-700 hover:text-cyan-300'
                        }`}
                      >
                        <Pin className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      </button>
                    )}
                  </div>

                  {/* 중앙 메인: 그림 모드면 SVG 일러스트, 낱말 모드면 텍스트 */}
                  {card.mode === 'picture' && card.svgIcon ? (
                    <div className="flex-1 w-full flex flex-col items-center justify-center p-0.5 overflow-hidden relative">
                      <div
                        className={`${
                          isLargeZoom ? 'w-9 h-9 sm:w-13 sm:h-13' : 'w-6 h-6 sm:w-9 sm:h-9 md:w-10 md:h-10'
                        } text-slate-200 group-hover:text-cyan-300 transition-colors drop-shadow`}
                        dangerouslySetInnerHTML={{ __html: card.svgIcon }}
                      />
                      <span className={`${
                        isLargeZoom ? 'text-[9px] sm:text-[11px]' : 'text-[8px] sm:text-[9px]'
                      } font-bold text-slate-200 group-hover:text-cyan-200 tracking-tight break-keep text-center leading-none w-full mt-0.5 px-0.5`}>
                        {card.word}
                      </span>
                    </div>
                  ) : (
                    <div className="my-auto py-0.5 text-center w-full px-0.5 flex items-center justify-center">
                      <span className={`${getCardFontSize(card.word, isLargeZoom)} font-black text-slate-100 group-hover:text-cyan-300 transition-colors drop-shadow break-keep text-center leading-tight block w-full px-0.5`}>
                        {card.word}
                      </span>
                    </div>
                  )}

                  {/* 하단 데코 라인 또는 후보 배지 / 그림 확대 버튼 */}
                  <div className="w-full flex justify-between items-center z-10 leading-none">
                    {isTargeting ? (
                      <span className="text-[6px] sm:text-[8px] font-mono font-black text-cyan-300 bg-cyan-950/90 px-1 py-0.2 rounded border border-cyan-400/60 mx-auto animate-pulse">
                        🎯 목표
                      </span>
                    ) : isMarked ? (
                      <span className="text-[6px] sm:text-[8px] font-mono font-black text-amber-300 bg-amber-950/90 px-1 py-0.2 rounded border border-amber-400/50 mx-auto">
                        ★ 후보
                      </span>
                    ) : (
                      <div className="w-full flex justify-center items-center gap-0.5 opacity-30">
                        <div className="h-[1.5px] w-3 sm:w-6 bg-slate-500 rounded-full"></div>
                        <div className="w-0.5 h-0.5 rounded-full bg-cyan-400"></div>
                        <div className="h-[1.5px] w-3 sm:w-6 bg-slate-500 rounded-full"></div>
                      </div>
                    )}

                    {/* 그림 카드 정밀 확대 버튼 */}
                    {card.mode === 'picture' && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playHover();
                          setInspectedCard(card);
                        }}
                        title="그림 카드 크게 확대해서 보기"
                        className="p-0.5 rounded bg-slate-800/80 text-slate-400 hover:text-cyan-300 opacity-70 hover:opacity-100 transition-all shrink-0"
                      >
                        <Maximize2 className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      </button>
                    )}
                  </div>

                  {/* 호버 테두리 글로우 */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl border border-cyan-400/0 group-hover:border-cyan-400/40 pointer-events-none transition-all"></div>
                </div>

                {/* 뒷면 (공개 상태: 정체 공개 - 카드 밖 밀림 방지 및 완벽 내부 피팅) */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-lg sm:rounded-xl p-1 sm:p-1.5 flex flex-col justify-between items-center shadow-md border overflow-hidden ${
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
                  <div className="w-full flex justify-between items-center text-[6px] sm:text-[8px] font-mono uppercase tracking-wider font-bold opacity-85 leading-none shrink-0">
                    <span className="truncate">
                      {card.type === 'red' && 'RED'}
                      {card.type === 'blue' && 'BLUE'}
                      {card.type === 'neutral' && 'CIVIL'}
                      {card.type === 'assassin' && 'ASSASSIN'}
                    </span>
                    <span>#{card.id + 1}</span>
                  </div>

                  {/* 중앙 아이콘 & 단어 (가변 flex로 밀림 방지) */}
                  <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-center gap-0.5 overflow-hidden my-auto">
                    {card.type === 'red' && <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-200 animate-pulse shrink-0" />}
                    {card.type === 'blue' && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-200 animate-pulse shrink-0" />}
                    {card.type === 'neutral' && <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-800 shrink-0" />}
                    {card.type === 'assassin' && <Skull className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 animate-bounce shrink-0" />}

                    <span className={`${getCardFontSize(card.word, isLargeZoom)} font-black tracking-tight break-keep text-center leading-tight max-w-full px-0.5`}>
                      {card.word}
                    </span>
                  </div>

                  {/* 하단 스탬프 (shrink-0 및 안전 패딩으로 카드 내부 하단에 정렬) */}
                  <div className={`shrink-0 text-[6px] sm:text-[8px] font-mono tracking-wider uppercase font-bold px-1.5 py-0.5 rounded-full border leading-none ${
                    card.type === 'neutral'
                      ? 'border-amber-400/60 bg-amber-200/50 text-amber-900'
                      : card.type === 'assassin'
                      ? 'border-red-500/80 bg-red-950/60 text-red-400'
                      : 'border-white/40 bg-black/20 text-white'
                  }`}>
                    {card.type === 'assassin' ? 'FAIL' : 'CLEAR'}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔍 그림 카드 정밀 확대 판독 모달 */}
      {inspectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setInspectedCard(null)}
        >
          <div
            className="w-full max-w-sm bg-[#161f33] border-2 border-cyan-500/60 rounded-3xl p-5 shadow-2xl flex flex-col items-center gap-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setInspectedCard(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
              PICTURE CARD #{inspectedCard.id + 1} 정밀 판독
            </div>

            {inspectedCard.svgIcon && (
              <div
                className="w-44 h-44 text-cyan-200 bg-slate-900/90 border border-slate-700 rounded-2xl p-4 shadow-inner"
                dangerouslySetInnerHTML={{ __html: inspectedCard.svgIcon }}
              />
            )}

            <div className="text-center">
              <h4 className="text-xl font-black text-white">{inspectedCard.word}</h4>
              {inspectedCard.keywords && (
                <p className="text-xs text-slate-400 font-mono mt-1">
                  연상 요소: {inspectedCard.keywords.slice(0, 4).join(' · ')}
                </p>
              )}
            </div>

            <div className="flex w-full gap-2">
              {onToggleMarkCard && !inspectedCard.revealed && (
                <button
                  type="button"
                  onClick={() => {
                    onToggleMarkCard(inspectedCard.id);
                    setInspectedCard(prev => prev ? { ...prev, marked: !prev.marked } : null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center justify-center gap-1.5"
                >
                  <Pin className="w-4 h-4" />
                  <span>{inspectedCard.marked ? '후보 마킹 해제' : '후보로 마킹'}</span>
                </button>
              )}

              {!inspectedCard.revealed && !disabled && (
                <button
                  type="button"
                  onClick={() => {
                    const id = inspectedCard.id;
                    setInspectedCard(null);
                    onSelectCard(id);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-600/30"
                >
                  <Target className="w-4 h-4" />
                  <span>이 카드 지목하기</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
