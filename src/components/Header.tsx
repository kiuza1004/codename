import React from 'react';
import { Difficulty, GameMode, TeamColor } from '../types/game';
import { APP_VERSION, forceCacheReload } from '../constants/version';
import { Shield, Volume2, VolumeX, Mic, HelpCircle, RefreshCw, RotateCcw } from 'lucide-react';

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
}) => {
  const redRemaining = playerTeam === 'red' ? playerRemaining : opponentRemaining;
  const blueRemaining = playerTeam === 'blue' ? playerRemaining : opponentRemaining;

  const diffLabel = {
    easy: '초급',
    normal: '중급',
    hard: '고급',
  }[difficulty];

  return (
    <header className="w-full bg-[#101625]/95 backdrop-blur-md border-b border-slate-800/80 px-2.5 sm:px-4 py-2 sticky top-0 z-30 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        {/* 1행 (모바일) / 좌측 (PC): 로고 & 엠블럼 + 신속 제어 버튼 그룹 */}
        <div className="flex items-center justify-between gap-2 w-full md:w-auto">
          {/* 타이틀 및 엠블럼 + 버전 배지 */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 ring-1 ring-white/20 shrink-0">
              <Shield className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-sm sm:text-lg font-black tracking-wider text-white font-mono whitespace-nowrap">
                CODENAMES
              </h1>
              {/* 🎯 [사용자 요청] 메인화면 버전정보 명확히 등록 */}
              <span className="text-emerald-300 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-950 border border-emerald-500/50 whitespace-nowrap">
                {APP_VERSION}
              </span>
              <span className="text-cyan-400 font-sans text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-950/80 border border-cyan-500/30 whitespace-nowrap hidden sm:inline">
                AI 팀장
              </span>
            </div>
          </div>

          {/* 컨트롤 버튼 그룹 */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* 캐시 강제 새로고침 버튼 */}
            <button
              onClick={forceCacheReload}
              title="브라우저 캐시 초기화 및 최신 버전 새로고침"
              className="p-1.5 sm:p-2 rounded-xl border border-emerald-700/60 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60 transition-all flex items-center gap-1 text-[11px] font-mono"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">캐시갱신</span>
            </button>

            {/* 효과음 토글 */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-red-950/40 border-red-800/40 text-red-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* 팀장 TTS 음성 토글 */}
            <button
              onClick={onToggleTts}
              title={ttsEnabled ? '팀장 음성 낭독 끄기' : '팀장 음성 낭독 켜기'}
              className={`px-2 py-1.5 rounded-xl border transition-all flex items-center gap-1 text-[11px] font-mono whitespace-nowrap ${
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
              onClick={onOpenRules}
              title="게임 규칙 및 안내"
              className="p-1.5 sm:p-2 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* 다시 설정 / 새 게임 */}
            <button
              onClick={onReset}
              title="새 게임 설정"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all whitespace-nowrap"
            >
              <RefreshCw className="w-3 h-3 text-cyan-400" />
              <span>새 게임</span>
            </button>
          </div>
        </div>

        {/* 2행 (모바일 화면에서 독립된 라인에 여유롭게 배치) / 우측 (PC): 스코어보드 및 모드 배지 */}
        <div className="w-full md:w-auto flex items-center justify-between sm:justify-center gap-2 bg-slate-900/90 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-800/80 shadow-inner overflow-x-auto">
          {/* 레드팀 스코어 */}
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg transition-all whitespace-nowrap ${
            playerTeam === 'red' ? 'bg-red-500/20 border border-red-500/40 text-red-400 font-bold' : 'text-slate-400'
          }`}>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            <span className="text-xs uppercase font-mono tracking-wider">RED {playerTeam === 'red' ? '(내 팀)' : '(상대)'}</span>
            <span className="text-base sm:text-lg font-black font-mono text-red-400 ml-0.5">{redRemaining}</span>
          </div>

          <span className="text-slate-600 font-bold font-mono text-sm shrink-0">:</span>

          {/* 블루팀 스코어 */}
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg transition-all whitespace-nowrap ${
            playerTeam === 'blue' ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400 font-bold' : 'text-slate-400'
          }`}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
            <span className="text-xs uppercase font-mono tracking-wider">BLUE {playerTeam === 'blue' ? '(내 팀)' : '(상대)'}</span>
            <span className="text-base sm:text-lg font-black font-mono text-blue-400 ml-0.5">{blueRemaining}</span>
          </div>

          {/* 모드 및 난이도 배지 */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-700/80 text-[10px] sm:text-[11px] font-mono text-slate-400 whitespace-nowrap shrink-0">
            <span className={`px-1.5 py-0.5 rounded font-bold ${
              gameMode === 'picture' ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40' : 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40'
            }`}>
              {gameMode === 'picture' ? '🎨 픽처스' : '📝 낱말'}
            </span>
            <span className="hidden xs:inline text-amber-400 font-bold">[{diffLabel}]</span>
          </div>
        </div>
      </div>
    </header>
  );
};
