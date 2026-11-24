import React, { useState } from 'react';
import { CardItem } from '../types/game';
import { sound } from '../utils/audio';
import { Skull, User, ShieldAlert, CheckCircle2, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface CardGridProps {
  cards: CardItem[];
  onSelectCard: (id: number) => void;
  disabled: boolean;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, onSelectCard, disabled }) => {
  // 모바일 및 PC 줌 배율 관리 (기본 100%, 80% ~ 180%)
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 20, 180));
    sound.playHover();
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 20, 80));
    sound.playHover();
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
    sound.playHover();
  };

  return (
    <div className="w-full flex flex-col gap-2 my-2">
      {/* 줌 컨트롤러 툴바: 모바일 확대/축소 및 화면 맞춤 */}
      <div className="w-full flex items-center justify-between px-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>5×5 작전 보드 (25장 전체 뷰)</span>
        </div>

        {/* 확대/축소 조작 버튼들 */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-sm">
          <button
            type="button"
            onClick={handleZoomOut}
            title="축소"
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono font-bold text-cyan-400 px-1.5 min-w-[42px] text-center select-none">
            {zoomLevel}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            title="확대"
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleZoomReset}
            title="모바일 전체 맞춤"
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-mono border border-slate-700 transition-all ml-0.5"
          >
            <Maximize2 className="w-3 h-3 text-cyan-400" />
            <span>화면 맞춤</span>
          </button>
        </div>
      </div>

      {/* 가로 스크롤 가능 컨테이너 (확대 시 자유로운 터치 스크롤 지원) */}
      <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 select-none">
        <div
          style={{
            width: zoomLevel === 100 ? '100%' : `${zoomLevel}%`,
            minWidth: zoomLevel > 100 ? `${zoomLevel}%` : '100%',
            transition: 'width 0.2s ease-in-out',
          }}
          className="mx-auto"
        >
          {/* 모바일에서도 무조건 5열 고정: grid-cols-5 */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5 md:gap-3.5">
            {cards.map((card) => {
              const isClickable = !card.revealed && !disabled;

              return (
                <div
                  key={card.id}
                  className="perspective-1000 h-16 sm:h-22 md:h-28 lg:h-32 select-none"
                  onMouseEnter={() => {
                    if (isClickable) sound.playHover();
                  }}
                >
                  <div
                    onClick={() => {
                      if (isClickable) onSelectCard(card.id);
                    }}
                    className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform cursor-pointer rounded-xl sm:rounded-2xl shadow-sm ${
                      card.revealed ? 'rotate-y-180' : isClickable ? 'hover:-translate-y-0.5 hover:shadow-cyan-500/20 active:scale-95' : 'opacity-80 cursor-not-allowed'
                    }`}
                  >
                    {/* 앞면 (미공개 상태: 단어 카드) */}
                    <div className="absolute inset-0 backface-hidden rounded-xl sm:rounded-2xl border border-slate-700/80 bg-gradient-to-b from-[#1e2738] to-[#141b28] p-1 sm:p-2 flex flex-col justify-between items-center transition-all group overflow-hidden shadow-inner">
                      {/* 상단 180도 회전 텍스트 (모바일에서는 간결하게) */}
                      <div className="w-full flex justify-between items-center opacity-40 group-hover:opacity-60 transition-opacity">
                        <span className="text-[8px] sm:text-[10px] font-mono font-semibold rotate-180 select-none tracking-tight truncate max-w-[60%]">
                          {card.word}
                        </span>
                        <span className="text-[7px] sm:text-[9px] font-mono text-slate-500">#{card.id + 1}</span>
                      </div>

                      {/* 중앙 메인 단어 (모바일에서도 5장이 한 줄에 쏙 들어가도록 최적화된 폰트 크기) */}
                      <div className="my-auto py-0.5 text-center w-full px-0.5 flex items-center justify-center">
                        <span className="text-xs sm:text-base md:text-xl lg:text-2xl font-black tracking-tight sm:tracking-wide text-slate-100 group-hover:text-cyan-300 transition-colors drop-shadow truncate w-full">
                          {card.word}
                        </span>
                      </div>

                      {/* 하단 데코 라인 */}
                      <div className="w-full flex justify-center items-center gap-1 opacity-30">
                        <div className="h-[1.5px] w-4 sm:w-8 bg-slate-500 rounded-full"></div>
                        <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                        <div className="h-[1.5px] w-4 sm:w-8 bg-slate-500 rounded-full"></div>
                      </div>

                      {/* 호버 테두리 */}
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/40 pointer-events-none transition-all"></div>
                    </div>

                    {/* 뒷면 (공개 상태: 정체 공개) */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl sm:rounded-2xl p-1 sm:p-2 flex flex-col justify-between items-center shadow-lg border ${
                        card.type === 'red'
                          ? 'bg-gradient-to-br from-red-600 to-red-800 border-red-400 text-white shadow-red-900/40'
                          : card.type === 'blue'
                          ? 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400 text-white shadow-blue-900/40'
                          : card.type === 'assassin'
                          ? 'bg-gradient-to-br from-zinc-900 via-neutral-950 to-black border-red-600 text-red-500 shadow-black'
                          : 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 text-amber-950 shadow-amber-950/20'
                      }`}
                    >
                      {/* 상단 레이블 */}
                      <div className="w-full flex justify-between items-center text-[7px] sm:text-[9px] font-mono uppercase tracking-wider font-bold opacity-80">
                        <span className="truncate">
                          {card.type === 'red' && 'RED'}
                          {card.type === 'blue' && 'BLUE'}
                          {card.type === 'neutral' && 'PASS'}
                          {card.type === 'assassin' && 'KILL'}
                        </span>
                        <span>#{card.id + 1}</span>
                      </div>

                      {/* 중앙 아이콘 & 단어 */}
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        {card.type === 'red' && <ShieldAlert className="w-4 h-4 sm:w-6 sm:h-6 text-red-200 animate-pulse" />}
                        {card.type === 'blue' && <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 text-blue-200 animate-pulse" />}
                        {card.type === 'neutral' && <User className="w-4 h-4 sm:w-6 sm:h-6 text-amber-800" />}
                        {card.type === 'assassin' && <Skull className="w-4 h-4 sm:w-6 sm:h-6 text-red-500 animate-bounce" />}

                        <span className={`text-[10px] sm:text-xs md:text-sm font-black tracking-tight truncate max-w-full ${
                          card.type === 'neutral' ? 'text-amber-950' : card.type === 'assassin' ? 'text-red-400' : 'text-white'
                        }`}>
                          {card.word}
                        </span>
                      </div>

                      {/* 하단 상태 표식 */}
                      <div className={`text-[6px] sm:text-[8px] font-mono uppercase font-bold px-1 py-0.2 rounded border ${
                        card.type === 'neutral'
                          ? 'border-amber-400/60 bg-amber-200/50 text-amber-900'
                          : card.type === 'assassin'
                          ? 'border-red-500/80 bg-red-950/60 text-red-400'
                          : 'border-white/40 bg-black/20 text-white'
                      }`}>
                        {card.type === 'assassin' ? 'FAIL' : 'OK'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
