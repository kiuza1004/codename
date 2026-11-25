import React, { useState } from 'react';
import { Difficulty, GameMode, TeamColor } from '../types/game';
import { APP_VERSION, APP_BUILD_DATE, AgentCareerStats, forceCacheReload, getAgentRankTitle } from '../constants/version';
import { Shield, Sparkles, Shuffle, Flame, Zap, Award, Type, Image as ImageIcon, RotateCcw, Trophy, Users, AlertTriangle, ArrowRight } from 'lucide-react';

interface SetupModalProps {
  onStart: (difficulty: Difficulty, team: TeamColor, mode: GameMode) => void;
  isShuffling: boolean;
  career?: AgentCareerStats;
  onOpenMultiplayer: () => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({ onStart, isShuffling, career, onOpenMultiplayer }) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('word');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');
  const [selectedTeam, setSelectedTeam] = useState<TeamColor>('red');

  const handleStart = () => {
    onStart(selectedDifficulty, selectedTeam, selectedMode);
  };

  const rankTitle = getAgentRankTitle(career?.wins || 0);
  const winRate = career && career.gamesPlayed > 0
    ? Math.round((career.wins / career.gamesPlayed) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      {/* 📱 모바일/PC 화면 최적화 피팅 (세로 스크롤 없이 한 화면에 컴팩트하게 표시) */}
      <div className="w-full max-w-md bg-[#131927] border border-slate-700/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-2xl relative overflow-hidden my-auto max-h-[96dvh] flex flex-col justify-between">
        {/* 장식용 배경 글로우 */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* 상단 엠블럼 및 버전 뱃지 */}
        <div className="flex flex-col items-center text-center mb-2">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-1 ring-white/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-wide font-mono">
              CODENAMES
            </h2>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300">
              {APP_VERSION}
            </span>
          </div>

          {/* Argon 요원 커리어 미니 배지 */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-slate-800 mt-0.5">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Trophy className="w-3 h-3" /> {rankTitle}
            </span>
            <span className="text-slate-600">|</span>
            <span>전적: <strong className="text-cyan-300">{career?.wins || 0}승</strong> ({winRate}%)</span>
            {career && career.currentStreak > 0 && (
              <>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-bold">🔥 {career.currentStreak}연승</span>
              </>
            )}
          </div>
        </div>

        {/* 🚀 [최우선 선택] 다인 멀티 작전방 입장 배너 */}
        <div className="mb-2.5 p-2.5 rounded-2xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 border-2 border-indigo-500/60 shadow-lg shadow-indigo-950/50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-300 shrink-0">
              <Users className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold font-spy text-white block">다인 멀티 작전방 (P2P 대전)</span>
              <span className="text-[10px] text-indigo-200/80 font-mono">친구 초대 · 팀장/요원/관전 · 실시간 음성 대화</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenMultiplayer}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110 text-white font-bold text-xs font-mono flex items-center gap-1 shadow-md transition-all active:scale-95 shrink-0"
          >
            <span>방 입장</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 1인 솔로 AI 전술 훈련 구분선 */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-[1px] flex-1 bg-slate-800"></div>
          <span className="text-[10px] font-mono text-cyan-400/80 font-bold uppercase tracking-wider">
            또는 1인 솔로 AI 훈련 설정
          </span>
          <div className="h-[1px] flex-1 bg-slate-800"></div>
        </div>

        {/* STEP 1: 카드 종류 선택 */}
        <div className="mb-2 sm:mb-2.5">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold mb-1">
            STEP 1. 카드 종류 선택 (선택 필수)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {/* 낱말 카드 */}
            <button
              type="button"
              onClick={() => setSelectedMode('word')}
              className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 ${
                selectedMode === 'word'
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/30 shadow-md shadow-cyan-900/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <Type className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              <span className="font-bold text-xs sm:text-sm whitespace-nowrap">📝 낱말(단어) 5×5</span>
              <span className="text-[9px] text-slate-400 leading-none">정통 200+ 공식 단어</span>
            </button>

            {/* 그림 카드 */}
            <button
              type="button"
              onClick={() => setSelectedMode('picture')}
              className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 ${
                selectedMode === 'picture'
                  ? 'bg-purple-950/60 border-purple-400 text-purple-300 ring-2 ring-purple-500/30 shadow-md shadow-purple-900/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="font-bold text-xs sm:text-sm whitespace-nowrap">🎨 그림(픽처스) 5×4</span>
              <span className="text-[9px] text-slate-400 leading-none">초현실 그림 100종 (20장)</span>
            </button>
          </div>
        </div>

        {/* STEP 2: 난이도 설정 */}
        <div className="mb-2 sm:mb-2.5">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
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
              <span className="text-[8px] text-slate-500">다중 연결</span>
            </button>
          </div>
        </div>

        {/* STEP 3: 팀 색상 선택 */}
        <div className="mb-2.5 sm:mb-3">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
            STEP 3. 소속 팀 색상 선택
          </label>
          <div className="grid grid-cols-2 gap-2">
            {/* 레드팀 */}
            <button
              type="button"
              onClick={() => setSelectedTeam('red')}
              className={`p-2 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
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
              className={`p-2 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
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
          className="w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/30 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60"
        >
          {isShuffling ? (
            <>
              <Shuffle className="w-4 h-4 animate-spin" />
              <span>{selectedMode === 'picture' ? '그림 카드' : '낱말 카드'} 셔플 중...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>1인 작전 개시</span>
            </>
          )}
        </button>

        {/* ⚠️ 웹앱 보안 취약점 안내 박스 */}
        <div className="mt-2 p-2 sm:p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[9px] sm:text-[10px] text-amber-200/90 font-mono leading-relaxed">
          <div className="flex items-center gap-1 font-bold text-amber-400 mb-0.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>웹앱 보안 및 P2P 통신 유의사항</span>
          </div>
          <p className="text-slate-400">
            본 서비스는 별도의 중앙 DB 서버 없이 브라우저 간 P2P(WebRTC) 및 로컬 환경에서 실행되는 오픈 웹앱입니다. 공용 Wi-Fi나 신뢰할 수 없는 네트워크 환경에서는 통신 패킷이 가로채일 위험이 있으므로, <strong>실제 계정 비밀번호나 민감한 개인정보를 암호 힌트나 닉네임으로 절대 사용하지 마십시오.</strong>
          </p>
        </div>

        {/* 하단 버전 정보 및 캐시 클리어 버튼 */}
        <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 font-mono">
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
