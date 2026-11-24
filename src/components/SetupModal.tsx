import React, { useState } from 'react';
import { Difficulty, GameMode, TeamColor } from '../types/game';
import { APP_VERSION, APP_BUILD_DATE, forceCacheReload } from '../constants/version';
import { Shield, Sparkles, Shuffle, Flame, Zap, Award, Type, Image as ImageIcon, RotateCcw } from 'lucide-react';

interface SetupModalProps {
  onStart: (difficulty: Difficulty, team: TeamColor, mode: GameMode) => void;
  isShuffling: boolean;
}

export const SetupModal: React.FC<SetupModalProps> = ({ onStart, isShuffling }) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('word');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');
  const [selectedTeam, setSelectedTeam] = useState<TeamColor>('red');

  const handleStart = () => {
    onStart(selectedDifficulty, selectedTeam, selectedMode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      {/* 📱 모바일/PC 화면 최적화 피팅 */}
      <div className="w-full max-w-md bg-[#131927] border border-slate-700/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-2xl relative overflow-hidden my-auto max-h-[96dvh] flex flex-col justify-between">
        {/* 장식용 배경 글로우 */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 상단 엠블럼 및 버전 뱃지 (최신 버전 명시) */}
        <div className="flex flex-col items-center text-center mb-2 sm:mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-1 ring-white/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-wide font-mono">
              CODENAMES
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300">
              {APP_VERSION}
            </span>
          </div>
          <p className="text-[10px] text-cyan-400 font-mono tracking-widest">
            SPYMASTER AI TACTICAL TRAINING
          </p>
        </div>

        {/* STEP 1: 카드 종류 선택 */}
        <div className="mb-2 sm:mb-3">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold mb-1 sm:mb-1.5">
            STEP 1. 카드 종류 선택 (선택 필수)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {/* 낱말 카드 */}
            <button
              type="button"
              onClick={() => setSelectedMode('word')}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                selectedMode === 'word'
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/30 shadow-md shadow-cyan-900/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Type className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-xs sm:text-sm whitespace-nowrap">📝 낱말(단어) 5×5</span>
              <span className="text-[9px] text-slate-400 leading-none">정통 200+ 공식 단어</span>
            </button>

            {/* 그림 카드 */}
            <button
              type="button"
              onClick={() => setSelectedMode('picture')}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                selectedMode === 'picture'
                  ? 'bg-purple-950/60 border-purple-400 text-purple-300 ring-2 ring-purple-500/30 shadow-md shadow-purple-900/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <ImageIcon className="w-5 h-5 text-purple-400" />
              <span className="font-bold text-xs sm:text-sm whitespace-nowrap">🎨 그림(픽처스) 5×4</span>
              <span className="text-[9px] text-slate-400 leading-none">초현실 일러스트 20장</span>
            </button>
          </div>
        </div>

        {/* STEP 2: 난이도 설정 */}
        <div className="mb-2 sm:mb-3">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 sm:mb-1.5">
            STEP 2. 작전 난이도 선택
          </label>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {/* 초급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('easy')}
              className={`p-1.5 sm:p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 ${
                selectedDifficulty === 'easy'
                  ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/20 shadow-md shadow-emerald-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-xs">초급</span>
              <span className="text-[8px] text-slate-500">안전 힌트</span>
            </button>

            {/* 중급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('normal')}
              className={`p-1.5 sm:p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 ${
                selectedDifficulty === 'normal'
                  ? 'bg-blue-950/50 border-blue-500 text-blue-300 ring-1 ring-blue-500/20 shadow-md shadow-blue-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-bold text-xs">중급</span>
              <span className="text-[8px] text-slate-500">표준 규칙</span>
            </button>

            {/* 고급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('hard')}
              className={`p-1.5 sm:p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 ${
                selectedDifficulty === 'hard'
                  ? 'bg-amber-950/50 border-amber-500 text-amber-300 ring-1 ring-amber-500/20 shadow-md shadow-amber-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-xs">고급</span>
              <span className="text-[8px] text-slate-500">스피드런</span>
            </button>
          </div>
        </div>

        {/* STEP 3: 팀 색상 선택 */}
        <div className="mb-2.5 sm:mb-3.5">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1 sm:mb-1.5">
            STEP 3. 소속 팀 색상 선택
          </label>
          <div className="grid grid-cols-2 gap-2">
            {/* 레드팀 */}
            <button
              type="button"
              onClick={() => setSelectedTeam('red')}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                selectedTeam === 'red'
                  ? 'bg-red-950/50 border-red-500 text-red-300 ring-2 ring-red-500/30 font-bold shadow-md shadow-red-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="font-mono text-xs sm:text-sm font-bold">RED (레드팀)</span>
            </button>

            {/* 블루팀 */}
            <button
              type="button"
              onClick={() => setSelectedTeam('blue')}
              className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                selectedTeam === 'blue'
                  ? 'bg-blue-950/50 border-blue-500 text-blue-300 ring-2 ring-blue-500/30 font-bold shadow-md shadow-blue-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="font-mono text-xs sm:text-sm font-bold">BLUE (블루팀)</span>
            </button>
          </div>
        </div>

        {/* 시작 버튼: 카드를 섞은 후 진행 */}
        <button
          type="button"
          onClick={handleStart}
          disabled={isShuffling}
          className="w-full py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/30 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {isShuffling ? (
            <>
              <Shuffle className="w-4 h-4 animate-spin" />
              <span>{selectedMode === 'picture' ? '그림 카드' : '낱말 카드'} 셔플 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>카드 섞고 작전 개시</span>
            </>
          )}
        </button>

        {/* 하단 버전 정보 및 캐시 클리어 버튼 */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 font-mono">
          <span>버전: <strong className="text-emerald-400">{APP_VERSION}</strong> ({APP_BUILD_DATE})</span>
          <button
            type="button"
            onClick={forceCacheReload}
            title="브라우저 캐시를 지우고 최신 버전을 다시 불러옵니다"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>캐시 강제 새로고침</span>
          </button>
        </div>
      </div>
    </div>
  );
};
