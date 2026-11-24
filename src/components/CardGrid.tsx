import React from 'react';
import { CardItem } from '../types/game';
import { sound } from '../utils/audio';
import { Skull, User, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface CardGridProps {
  cards: CardItem[];
  onSelectCard: (id: number) => void;
  disabled: boolean;
}

export const CardGrid: React.FC<CardGridProps> = ({ cards, onSelectCard, disabled }) => {
  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3.5 my-4">
      {cards.map((card) => {
        const isClickable = !card.revealed && !disabled;

        return (
          <div
            key={card.id}
            className="perspective-1000 h-24 sm:h-28 md:h-32 select-none"
            onMouseEnter={() => {
              if (isClickable) sound.playHover();
            }}
          >
            <div
              onClick={() => {
                if (isClickable) onSelectCard(card.id);
              }}
              className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform cursor-pointer rounded-2xl shadow-md ${
                card.revealed ? 'rotate-y-180' : isClickable ? 'hover:-translate-y-1 hover:shadow-cyan-500/20 hover:shadow-xl' : 'opacity-80 cursor-not-allowed'
              }`}
            >
              {/* 앞면 (미공개 상태: 단어 카드) */}
              <div className="absolute inset-0 backface-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-b from-[#1e2738] to-[#141b28] p-2 sm:p-2.5 flex flex-col justify-between items-center transition-all group overflow-hidden shadow-inner">
                {/* 앤틱 카드 헤더 라인 & 180도 회전 텍스트 (실제 보드게임 카드 스타일) */}
                <div className="w-full flex justify-between items-center opacity-40 group-hover:opacity-60 transition-opacity">
                  <span className="text-[10px] sm:text-xs font-mono font-semibold rotate-180 select-none tracking-tight">
                    {card.word}
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-slate-500">#{card.id + 1}</span>
                </div>

                {/* 중앙 메인 단어 (가독성 최우선) */}
                <div className="my-auto py-1 text-center w-full">
                  <span className="text-base sm:text-xl md:text-2xl font-black tracking-wide text-slate-100 group-hover:text-cyan-300 transition-colors drop-shadow">
                    {card.word}
                  </span>
                </div>

                {/* 하단 데코 라인 */}
                <div className="w-full flex justify-center items-center gap-1.5 opacity-30">
                  <div className="h-[2px] w-8 bg-slate-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  <div className="h-[2px] w-8 bg-slate-500 rounded-full"></div>
                </div>

                {/* 호버 시 은은한 테두리 글로우 효과 */}
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/0 group-hover:border-cyan-400/40 pointer-events-none transition-all"></div>
              </div>

              {/* 뒷면 (공개 상태: 정체 공개) */}
              <div
                className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-2 sm:p-3 flex flex-col justify-between items-center shadow-lg border ${
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
                <div className="w-full flex justify-between items-center text-[10px] font-mono uppercase tracking-wider font-bold opacity-80">
                  <span>
                    {card.type === 'red' && 'RED AGENT'}
                    {card.type === 'blue' && 'BLUE AGENT'}
                    {card.type === 'neutral' && 'BYSTANDER'}
                    {card.type === 'assassin' && 'ASSASSIN'}
                  </span>
                  <span>#{card.id + 1}</span>
                </div>

                {/* 중앙 아이콘 & 단어 */}
                <div className="flex flex-col items-center justify-center gap-1">
                  {card.type === 'red' && <ShieldAlert className="w-6 h-6 sm:w-7 sm:h-7 text-red-200 animate-pulse" />}
                  {card.type === 'blue' && <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-200 animate-pulse" />}
                  {card.type === 'neutral' && <User className="w-6 h-6 sm:w-7 sm:h-7 text-amber-800" />}
                  {card.type === 'assassin' && <Skull className="w-7 h-7 sm:w-8 sm:h-8 text-red-500 animate-bounce" />}

                  <span className={`text-sm sm:text-base font-black tracking-wide ${
                    card.type === 'neutral' ? 'text-amber-950' : card.type === 'assassin' ? 'text-red-400' : 'text-white'
                  }`}>
                    {card.word}
                  </span>
                </div>

                {/* 하단 스탬프 */}
                <div className={`text-[9px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded-full border ${
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
  );
};
