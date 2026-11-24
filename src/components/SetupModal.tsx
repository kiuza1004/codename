import React, { useState } from 'react';
import { Difficulty, TeamColor } from '../types/game';
import { Shield, Sparkles, Shuffle, Flame, Zap, Award } from 'lucide-react';

interface SetupModalProps {
  onStart: (difficulty: Difficulty, team: TeamColor) => void;
  isShuffling: boolean;
}

export const SetupModal: React.FC<SetupModalProps> = ({ onStart, isShuffling }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');
  const [selectedTeam, setSelectedTeam] = useState<TeamColor>('red');

  const handleStart = () => {
    onStart(selectedDifficulty, selectedTeam);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-[#141b2b] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* 장식용 배경 글로우 */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 상단 엠블럼 */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-1 ring-white/20 mb-3">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide font-mono">
            CODENAMES
          </h2>
          <p className="text-xs sm:text-sm text-cyan-400 font-mono tracking-widest mt-1">
            SPYMASTER AI TACTICAL TRAINING
          </p>
          <p className="text-xs text-slate-400 mt-2">
            AI 팀장이 암호 힌트를 제시하면 현장 요원이 되어 정답 카드를 맞추는 실전 훈련입니다.
          </p>
        </div>

        {/* 1단계: 난이도 설정 */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
            STEP 1. 작전 난이도 선택
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {/* 초급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('easy')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedDifficulty === 'easy'
                  ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Zap className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-xs sm:text-sm">초급</span>
              <span className="text-[10px] text-slate-500 leading-tight">직관적 힌트<br/>여유로운 진행</span>
            </button>

            {/* 중급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('normal')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedDifficulty === 'normal'
                  ? 'bg-blue-950/50 border-blue-500 text-blue-300 ring-2 ring-blue-500/20 shadow-lg shadow-blue-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Award className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-xs sm:text-sm">중급</span>
              <span className="text-[10px] text-slate-500 leading-tight">정식 규칙<br/>표준 AI 팀장</span>
            </button>

            {/* 고급 */}
            <button
              type="button"
              onClick={() => setSelectedDifficulty('hard')}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                selectedDifficulty === 'hard'
                  ? 'bg-amber-950/50 border-amber-500 text-amber-300 ring-2 ring-amber-500/20 shadow-lg shadow-amber-900/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Flame className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-xs sm:text-sm">고급</span>
              <span className="text-[10px] text-slate-500 leading-tight">다중 연결 힌트<br/>빠른 상대팀 AI</span>
            </button>
          </div>
        </div>

        {/* 2단계: 팀 색상 선택 */}
        <div className="mb-7">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
            STEP 2. 소속 팀 색상 선택
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* 레드팀 */}
            <button
              type="button"
              onClick={() => setSelectedTeam('red')}
              className={`p-3.5 rounded-2xl border text-center transition-all flex items-center justify-center gap-3 ${
                selectedTeam === 'red'
                  ? 'bg-red-950/50 border-red-500 text-red-300 ring-2 ring-red-500/30 shadow-lg shadow-red-900/30 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-red-500/20"></span>
              <span className="font-mono text-sm sm:text-base">RED TEAM (레드)</span>
            </button>

            {/* 블루팀 */}
            <button
              type="button"
              onClick={() => setSelectedTeam('blue')}
              className={`p-3.5 rounded-2xl border text-center transition-all flex items-center justify-center gap-3 ${
                selectedTeam === 'blue'
                  ? 'bg-blue-950/50 border-blue-500 text-blue-300 ring-2 ring-blue-500/30 shadow-lg shadow-blue-900/30 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20"></span>
              <span className="font-mono text-sm sm:text-base">BLUE TEAM (블루)</span>
            </button>
          </div>
        </div>

        {/* 시작 버튼: 카드를 섞은 후 진행 */}
        <button
          type="button"
          onClick={handleStart}
          disabled={isShuffling}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-base sm:text-lg tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-600/30 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {isShuffling ? (
            <>
              <Shuffle className="w-5 h-5 animate-spin" />
              <span>실제 카드 덱 셔플 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>카드 섞고 작전 개시</span>
            </>
          )}
        </button>

        {/* 하단 품질 안내 */}
        <p className="text-[11px] text-center text-slate-500 font-mono mt-4">
          ※ 실제 코드네임 한국어 공식 단어 풀(200+) 적용 | 이전 출현 카드 중복 방지 알고리즘 작동 중
        </p>
      </div>
    </div>
  );
};
