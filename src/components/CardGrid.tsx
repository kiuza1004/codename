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
}

export const CardGrid: React.FC<CardGridProps> = ({
  cards,
  onSelectCard,
  onToggleMarkCard,
  onClearMarks,
  disabled,
  isSpymasterView = false,
}) => {
  // 🔍 모바일/PC 사용자 편의용 카드 확대 보기(Large View) 토글 및 그림 카드 정밀 확대 모달
  const [isLargeZoom, setIsLargeZoom] = useState(false);
  const [inspectedCard, setInspectedCard] = useState<CardItem | null>(null);

  if (!cards || cards.length === 0) {
    return null;
  }

  const markedCount = cards.filter(c => c.marked && !c.revealed).length;

  return (
    <div className="w-full my-1">
      {/* 🎯 Argon 전술 그리드 보조 툴바: 후보 핀 마킹 안내 및 카드 크기 확대/표준 전환 */}
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Pin className="w-3 h-3 text-cyan-400" />
            <span>카드 우측 상단 <strong className="text-cyan-300">[핀]</strong>으로 추리 후보를 체크할 수 있습니다</span>
          </span>
          {markedCount > 0 && (
            <div className="flex items-center gap-1.5 bg-cyan-950/80 border border-cyan-500/50 px-2 py-0.5 rounded-lg text-[11px] font-mono text-cyan-300">
              <span>📌 후보 {markedCount}장</span>
              {onClearMarks && (
                <button
                  type="button"
                  onClick={onClearMarks}
                  className="text-slate-400 hover:text-white underline ml-1"
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
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-[11px] font-mono font-bold transition-all shrink-0 ${
            isLargeZoom
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm'
              : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:bg-slate-800'
          }`}
        >
          {isLargeZoom ? <ZoomOut className="w-3.5 h-3.5 text-cyan-400" /> : <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />}
          <span>{isLargeZoom ? '표준 크기로' : '카드 크게 보기'}</span>
        </button>
      </div>

      {/* 낱말 카드 (5x5, 25장) 또는 그림 카드 (5x4, 20장) 5열 고정 그리드 */}
      <div className="w-full grid grid-cols-5 gap-1.5 sm:gap-3 md:gap-4">
        {cards.map((card) => {
          const isClickable = !card.revealed && !disabled && !isSpymasterView;
          const isMarked = Boolean(card.marked && !card.revealed);

          let spymasterBorderClass = '';
          let spymasterBadge = null;
          if (isSpymasterView && !card.revealed) {
            if (card.type === 'red') {
              spymasterBorderClass = 'border-2 border-red-500/80 bg-red-950/40';
              spymasterBadge = <span className="text-[8px] font-mono font-black text-red-300 bg-red-950 border border-red-500/60 px-1 rounded">RED</span>;
            } else if (card.type === 'blue') {
              spymasterBorderClass = 'border-2 border-blue-500/80 bg-blue-950/40';
              spymasterBadge = <span className="text-[8px] font-mono font-black text-blue-300 bg-blue-950 border border-blue-500/60 px-1 rounded">BLUE</span>;
            } else if (card.type === 'neutral') {
              spymasterBorderClass = 'border-2 border-amber-500/50 bg-amber-950/20';
              spymasterBadge = <span className="text-[8px] font-mono font-bold text-amber-300/80 bg-amber-950/60 border border-amber-500/40 px-1 rounded">중립</span>;
            } else if (card.type === 'assassin') {
              spymasterBorderClass = 'border-2 border-rose-600 bg-black/80 ring-2 ring-rose-500/50';
              spymasterBadge = <span className="text-[8px] font-mono font-black text-rose-400 bg-black border border-rose-600 px-1 rounded">💀암살자</span>;
            }
          }

          return (
            <div
              key={card.id}
              className={`perspective-1000 select-none transition-all duration-300 ${
                isLargeZoom ? 'h-28 sm:h-36 md:h-40' : 'h-20 sm:h-28 md:h-32'
              }`}
              onMouseEnter={() => {
                if (isClickable) sound.playHover();
              }}
            >
              <div
                onClick={() => {
                  if (isClickable) onSelectCard(card.id);
                }}
                className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform cursor-pointer rounded-xl sm:rounded-2xl shadow-md ${
                  card.revealed
                    ? 'rotate-y-180'
                    : isClickable
                    ? 'hover:-translate-y-1 hover:shadow-cyan-500/20 active:scale-95'
                    : 'opacity-85 cursor-not-allowed'
                }`}
              >
                {/* 앞면 (미공개 상태: 낱말 카드 or 그림 카드) */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-xl sm:rounded-2xl border p-1.5 sm:p-2.5 flex flex-col justify-between items-center transition-all group overflow-hidden shadow-inner ${
                    spymasterBorderClass ||
                    (isMarked
                      ? 'border-2 border-amber-400 bg-gradient-to-b from-amber-950/60 via-[#1e2738] to-[#141b28] ring-2 ring-amber-400/30 shadow-lg shadow-amber-500/10'
                      : 'border-slate-700/80 bg-gradient-to-b from-[#1e2738] to-[#141b28]')
                  }`}
                >
                  {/* 상단 바: 번호, 팀장 투시 배지 & 후보 핀 마킹 버튼 */}
                  <div className="w-full flex justify-between items-center z-10">
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-slate-400 opacity-75">
                        #{card.id + 1}
                      </span>
                      {spymasterBadge}
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
                        className={`p-1 rounded-lg transition-all ${
                          isMarked
                            ? 'bg-amber-400 text-slate-950 shadow-sm scale-110'
                            : 'bg-slate-800/70 text-slate-400 opacity-60 hover:opacity-100 hover:bg-slate-700 hover:text-cyan-300'
                        }`}
                      >
                        <Pin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    )}
                  </div>

                  {/* 중앙 메인: 그림 모드면 SVG 일러스트, 낱말 모드면 텍스트 */}
                  {card.mode === 'picture' && card.svgIcon ? (
                    <div className="flex-1 w-full flex flex-col items-center justify-center p-0.5 overflow-hidden relative">
                      <div
                        className={`${
                          isLargeZoom ? 'w-14 h-14 sm:w-20 sm:h-20' : 'w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20'
                        } text-slate-200 group-hover:text-cyan-300 transition-colors drop-shadow`}
                        dangerouslySetInnerHTML={{ __html: card.svgIcon }}
                      />
                      <span className={`${
                        isLargeZoom ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'
                      } font-bold text-slate-200 group-hover:text-cyan-200 tracking-tight truncate w-full text-center mt-0.5`}>
                        {card.word}
                      </span>
                    </div>
                  ) : (
                    <div className="my-auto py-1 text-center w-full px-0.5">
                      <span className={`${
                        isLargeZoom ? 'text-base sm:text-2xl md:text-3xl' : 'text-xs sm:text-xl md:text-2xl'
                      } font-black tracking-wide text-slate-100 group-hover:text-cyan-300 transition-colors drop-shadow truncate block`}>
                        {card.word}
                      </span>
                    </div>
                  )}

                  {/* 하단 데코 라인 또는 후보 배지 / 그림 확대 버튼 */}
                  <div className="w-full flex justify-between items-center z-10">
                    {isMarked ? (
                      <span className="text-[7px] sm:text-[9px] font-mono font-black text-amber-300 bg-amber-950/90 px-1.5 py-0.2 rounded border border-amber-400/50 mx-auto">
                        ★ 후보
                      </span>
                    ) : (
                      <div className="w-full flex justify-center items-center gap-1 opacity-30">
                        <div className="h-[2px] w-4 sm:w-8 bg-slate-500 rounded-full"></div>
                        <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                        <div className="h-[2px] w-4 sm:w-8 bg-slate-500 rounded-full"></div>
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
                        className="p-0.5 sm:p-1 rounded bg-slate-800/80 text-slate-400 hover:text-cyan-300 opacity-70 hover:opacity-100 transition-all shrink-0"
                      >
                        <Maximize2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    )}
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
                  <div className="w-full flex justify-between items-center text-[7px] sm:text-[10px] font-mono uppercase tracking-wider font-bold opacity-85">
                    <span className="truncate">
                      {card.type === 'red' && 'RED'}
                      {card.type === 'blue' && 'BLUE'}
                      {card.type === 'neutral' && 'CIVIL'}
                      {card.type === 'assassin' && 'ASSASSIN'}
                    </span>
                    <span>#{card.id + 1}</span>
                  </div>

                  {/* 중앙 아이콘 & 단어 */}
                  <div className="flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                    {card.type === 'red' && <ShieldAlert className="w-5 h-5 sm:w-7 sm:h-7 text-red-200 animate-pulse" />}
                    {card.type === 'blue' && <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7 text-blue-200 animate-pulse" />}
                    {card.type === 'neutral' && <User className="w-5 h-5 sm:w-7 sm:h-7 text-amber-800" />}
                    {card.type === 'assassin' && <Skull className="w-5 h-5 sm:w-7 sm:h-7 text-red-500 animate-bounce" />}

                    <span className={`text-[11px] sm:text-base font-black tracking-wide truncate max-w-full ${
                      card.type === 'neutral' ? 'text-amber-950' : card.type === 'assassin' ? 'text-red-400' : 'text-white'
                    }`}>
                      {card.word}
                    </span>
                  </div>

                  {/* 하단 스탬프 */}
                  <div className={`text-[7px] sm:text-[9px] font-mono tracking-widest uppercase font-bold px-1.5 py-0.2 rounded-full border ${
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
