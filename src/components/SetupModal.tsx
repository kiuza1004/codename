import React, { useState } from 'react';
import { Difficulty, GameMode, TeamColor } from '../types/game';
import { Shield, Sparkles, Shuffle, Flame, Zap, Award, Type, Image as ImageIcon } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-lg bg-[#141b2b] border border-slate-700/80 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden my-auto">
        {/* 장식용 배경 글로우 */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 상단 엠블럼 */}
        <div className="flex flex-col items-center text-center mb-4 sm:mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-1 ring-white/20 mb-2">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide font-mono">
            CODENAMES
          </h2>
          <p className="text-[11px] text-cyan-400 font-mono tracking-widest mt-0.5">
            SPYMASTER AI TACTICAL TRAINING
          </p>
        </div>

        {/* STEP 1: 카드 형식 선택 (가장 먼저 선택) */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2">
            STEP 1. 카드 종류 선택 (가장 먼저 선택)
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {/* 낱말 카드 */}
            <button
              type="button"
              onClick={() => setSelectedMode('word')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedMode === 'word'
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-900/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Type className="w-6 h-6 text-cyan-400" />
              <span className="font-bold text-sm">📝 낱말(단어) 카드</span>
              <span className="text-[10px] text-slate-400 leading-tight">정통 클래식 텍스트 200+</span>
            </button>

            {/* 그림 카드 */}
            <button
              type="button"
              onClick={() => setSelectedMode('picture')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedMode === 'picture'
                  ? 'bg-purple-950/60 border-purple-400 text-purple-300 ring-2 ring-purple-500/30 shadow-lg shadow-purple-900/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <ImageIcon className="w-6 h-6 text-purple-400" />
              <span className="font-bold text-sm">🎨 그림(픽처스) 카드</span>
              <span className="text-[10px] text-slate-400 leading-tight">초현실 메타포 일러스트</span>
            </button>
          </div>
        </div>

        {/* STEP 2: 난이도 설정 */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            STEP 2. 작전 난이도 선택
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* 초급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('easy')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                selectedDifficulty === 'easy'
                  ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/20 shadow-md shadow-emerald-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-xs">초급</span>
              <span className="text-[9px] text-slate-500">안전한 힌트</span>
            </button>

            {/* 중급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('normal')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                selectedDifficulty === 'normal'
                  ? 'bg-blue-950/50 border-blue-500 text-blue-300 ring-1 ring-blue-500/20 shadow-md shadow-blue-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Award className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-xs">중급</span>
              <span className="text-[9px] text-slate-500">표준 규칙</span>
            </button>

            {/* 고급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('hard')}
              className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                selectedDifficulty === 'hard'
                  ? 'bg-amber-950/50 border-amber-500 text-amber-300 ring-1 ring-amber-500/20 shadow-md shadow-amber-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs">고급</span>
              <span className="text-[9px] text-slate-500">스피드런</span>
            </button>
          </div>
        </div>

        {/* STEP 3: 팀 색상 선택 */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            STEP 3. 소속 팀 색상 선택
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {/* 레드팀 */}
            <button
              type="button"
              onClick={() => setSelectedTeam('red')}
              className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                selectedTeam === 'red'
                  ? 'bg-red-950/50 border-red-500 text-red-300 ring-2 ring-red-500/30 font-bold shadow-md shadow-red-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="font-mono text-xs sm:text-sm">RED (레드팀)</span>
            </button>

            {/* 블루팀 */}
            <button
              type="button"
              onClick={() => setSelectedTeam('blue')}
              className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                selectedTeam === 'blue'
                  ? 'bg-blue-950/50 border-blue-500 text-blue-300 ring-2 ring-blue-500/30 font-bold shadow-md shadow-blue-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="font-mono text-xs sm:text-sm">BLUE (블루팀)</span>
            </button>
          </div>
        </div>

        {/* 시작 버튼: 카드를 섞은 후 진행 */}
        <button
          type="button"
          onClick={handleStart}
          disabled={isShuffling}
          className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/30 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {isShuffling ? (
            <>
              <Shuffle className="w-5 h-5 animate-spin" />
              <span>{selectedMode === 'picture' ? '그림 카드' : '낱말 카드'} 셔플 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>카드 섞고 작전 개시</span>
            </>
          )}
        </button>

        {/* 안내문 */}
        <p className="text-[10px] text-center text-slate-500 font-mono mt-3">
          ※ {selectedMode === 'picture' ? '독창적 일러스트 픽처스 모드' : '실제 공식 한국어 단어 200+ 모드'} | 기기 화면 자동 최적화 피팅
        </p>
      </div>
    </div>
  );
};
