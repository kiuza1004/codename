import React from 'react';
import { Difficulty, GameMode, TeamColor } from '../types/game';
import { APP_VERSION, AgentCareerStats, forceCacheReload, getAgentRankTitle } from '../constants/version';
import { Shield, Volume2, VolumeX, Mic, HelpCircle, RefreshCw, RotateCcw, Award, Users, BookOpen } from 'lucide-react';

interface HeaderProps {
  playerTeam: TeamColor;
  difficulty: Difficulty;
  gameMode?: GameMode;
  playerRemaining: number;
  opponentRemaining: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  ttsEnabled: boolean;
  onToggleTts: () => void;
  onOpenRules: () => void;
  onReset: () => void;
  career?: AgentCareerStats;
  onOpenMultiplayer?: () => void;
  onOpenArchive?: () => void;
  isMultiplayerActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  playerTeam,
  difficulty,
  gameMode = 'word',
  playerRemaining,
  opponentRemaining,
  soundEnabled,
  onToggleSound,
  ttsEnabled,
  onToggleTts,
  onOpenRules,
  onReset,
  career,
  onOpenMultiplayer,
  onOpenArchive,
  isMultiplayerActive = false,
}) => {
  const redRemaining = playerTeam === 'red' ? playerRemaining : opponentRemaining;
  const blueRemaining = playerTeam === 'blue' ? playerRemaining : opponentRemaining;

  const diffLabel = {
    easy: '초급',
    normal: '중급',
    hard: '고급',
  }[difficulty];

  const rankTitle = getAgentRankTitle(career?.wins || 0);

  return (
    <header className="w-full bg-[#101625]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 py-2 sticky top-0 z-30 shadow-lg">
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-2">
        {/* 1단: 로고 & 계급 + 주요 기능 버튼 그룹 (복기, 멀티작전, 새게임, 캐시갱신) */}
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
          {/* 좌측: 타이틀 및 엠블럼 + 계급 */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-cyan-500/20 ring-1 ring-white/20 shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-sm sm:text-base font-black tracking-wider text-white font-mono whitespace-nowrap">
                CODENAMES
              </h1>
              <span className="text-emerald-300 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-950 border border-emerald-500/50 whitespace-nowrap">
                {APP_VERSION}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-amber-300 font-mono text-[10px] px-2 py-0.2 rounded-full bg-amber-950/70 border border-amber-500/30 whitespace-nowrap">
                <Award className="w-3 h-3 text-amber-400" />
                {rankTitle}
              </span>
            </div>
          </div>

          {/* 우측: 핵심 액션 버튼들 (자리가 모자라면 아래칸에 자연스럽게 나열) */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* 📜 복기 버튼 (모바일/PC 모두 한글 '복기' 상시 노출) */}
            {onOpenArchive && (
              <button
                type="button"
                onClick={onOpenArchive}
                title="기밀 작전 보관소 (과거 게임 및 힌트 유도 내용 복기)"
                className="px-2.5 py-1.5 rounded-xl border border-indigo-500/60 bg-gradient-to-r from-indigo-950 to-purple-950 text-indigo-200 hover:text-white hover:border-indigo-400 transition-all flex items-center gap-1.5 text-xs font-mono font-bold whitespace-nowrap shadow-sm shadow-indigo-950/40 active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>복기</span>
              </button>
            )}

            {/* 👥 다인 멀티 작전실 버튼 */}
            {onOpenMultiplayer && (
              <button
                type="button"
                onClick={onOpenMultiplayer}
                title="다인 작전실 (P2P 멀티플레이 & 보이스)"
                className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-mono font-bold whitespace-nowrap shadow-sm active:scale-95 ${
                  isMultiplayerActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-400 text-white animate-pulse'
                    : 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900/60'
                }`}
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>{isMultiplayerActive ? '멀티(ON)' : '멀티작전'}</span>
              </button>
            )}

            {/* 🔄 다시 설정 / 새 게임 */}
            <button
              type="button"
              onClick={onReset}
              title="새 게임 설정"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 hover:text-white transition-all whitespace-nowrap active:scale-95"
            >
              <RefreshCw className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>새 게임</span>
            </button>

            {/* 캐시 강제 새로고침 버튼 */}
            <button
              type="button"
              onClick={forceCacheReload}
              title="브라우저 캐시 초기화 및 최신 버전 새로고침"
              className="px-2 py-1.5 rounded-xl border border-emerald-700/60 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 transition-all flex items-center gap-1 text-[11px] font-mono whitespace-nowrap active:scale-95"
            >
              <RotateCcw className="w-3 h-3 shrink-0" />
              <span>캐시갱신</span>
            </button>
          </div>
        </div>

        {/* 2단: 스코어보드 & 보조 토글 컨트롤 (사운드/TTS/규칙) */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60 w-full">
          {/* 스코어보드 & 모드 배지 */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* 레드팀 스코어 */}
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg transition-all whitespace-nowrap ${
              playerTeam === 'red' ? 'bg-red-500/20 border border-red-500/40 text-red-400 font-bold' : 'text-slate-400 bg-slate-900/60 border border-slate-800'
            }`}>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
              <span className="text-[11px] uppercase font-mono tracking-wider">RED {playerTeam === 'red' ? '(내팀)' : '(상대)'}</span>
              <span className="text-sm sm:text-base font-black font-mono text-red-400 ml-0.5">{redRemaining}</span>
            </div>

            <span className="text-slate-600 font-bold font-mono text-xs shrink-0">:</span>

            {/* 블루팀 스코어 */}
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg transition-all whitespace-nowrap ${
              playerTeam === 'blue' ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400 font-bold' : 'text-slate-400 bg-slate-900/60 border border-slate-800'
            }`}>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
              <span className="text-[11px] uppercase font-mono tracking-wider">BLUE {playerTeam === 'blue' ? '(내팀)' : '(상대)'}</span>
              <span className="text-sm sm:text-base font-black font-mono text-blue-400 ml-0.5">{blueRemaining}</span>
            </div>

            {/* 모드 및 난이도 배지 */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400 whitespace-nowrap shrink-0">
              <span className={`px-2 py-0.5 rounded-md font-bold ${
                gameMode === 'picture' ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40' : 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40'
              }`}>
                {gameMode === 'picture' ? '🎨 픽처스' : '📝 낱말'}
              </span>
              <span className="text-amber-400 font-bold">[{diffLabel}]</span>
            </div>
          </div>

          {/* 보조 사운드 / TTS / 규칙 컨트롤 */}
          <div className="flex items-center gap-1.5 shrink-0 ml-auto">
            {/* 효과음 토글 */}
            <button
              type="button"
              onClick={onToggleSound}
              title={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
              className={`p-1.5 rounded-lg border text-xs transition-all flex items-center gap-1 ${
                soundEnabled
                  ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-red-950/40 border-red-800/40 text-red-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-red-400" />}
              <span className="text-[10px] font-mono hidden sm:inline">{soundEnabled ? '사운드' : '음소거'}</span>
            </button>

            {/* 팀장 TTS 음성 토글 */}
            <button
              type="button"
              onClick={onToggleTts}
              title={ttsEnabled ? '팀장 음성 낭독 끄기' : '팀장 음성 낭독 켜기'}
              className={`px-2 py-1.5 rounded-lg border transition-all flex items-center gap-1 text-[10px] font-mono whitespace-nowrap ${
                ttsEnabled
                  ? 'bg-cyan-950/50 border-cyan-700/60 text-cyan-400 hover:bg-cyan-900/40'
                  : 'bg-slate-800/90 border-slate-700 text-slate-500'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>TTS {ttsEnabled ? 'ON' : 'OFF'}</span>
            </button>

            {/* 게임 규칙 버튼 */}
            <button
              type="button"
              onClick={onOpenRules}
              title="게임 규칙 및 안내"
              className="p-1.5 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all flex items-center gap-1 text-xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-mono hidden sm:inline">규칙</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
