import React from 'react';
import { Difficulty, TeamColor } from '../types/game';
import { Shield, Volume2, VolumeX, Mic, HelpCircle, RefreshCw } from 'lucide-react';

interface HeaderProps {
  playerTeam: TeamColor;
  difficulty: Difficulty;
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
    easy: '초급 (AGENT)',
    normal: '중급 (SPECIAL AGENT)',
    hard: '고급 (MASTER SPY)',
  }[difficulty];

  return (
    <header className="w-full bg-[#111726]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 sticky top-0 z-30 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* 타이틀 및 엠블럼 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-wider text-white font-mono">
                CODENAMES <span className="text-cyan-400 font-sans text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30">AI 팀장 모드</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium">스마트 스파이마스터 연습 웹앱</p>
          </div>
        </div>

        {/* 전광판: 레드팀 vs 블루팀 스코어 */}
        <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
          {/* 레드팀 */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-xl transition-all ${
            playerTeam === 'red' ? 'bg-red-500/20 border border-red-500/40 text-red-400 font-bold' : 'text-slate-400'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs uppercase font-mono tracking-wider">RED {playerTeam === 'red' ? '(내 팀)' : '(상대)'}</span>
            <span className="text-lg font-black font-mono text-red-400">{redRemaining}</span>
          </div>

          <span className="text-slate-600 font-bold font-mono">:</span>

          {/* 블루팀 */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-xl transition-all ${
            playerTeam === 'blue' ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400 font-bold' : 'text-slate-400'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs uppercase font-mono tracking-wider">BLUE {playerTeam === 'blue' ? '(내 팀)' : '(상대)'}</span>
            <span className="text-lg font-black font-mono text-blue-400">{blueRemaining}</span>
          </div>

          {/* 난이도 배지 */}
          <div className="hidden sm:block ml-2 pl-3 border-l border-slate-700/80 text-[11px] font-mono text-slate-400">
            난이도: <span className="text-amber-400 font-semibold">{diffLabel}</span>
          </div>
        </div>

        {/* 컨트롤 버튼 그룹 */}
        <div className="flex items-center gap-2">
          {/* 효과음 토글 */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-red-950/40 border-red-800/40 text-red-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* 팀장 TTS 음성 토글 */}
          <button
            onClick={onToggleTts}
            title={ttsEnabled ? '팀장 음성 낭독 끄기' : '팀장 음성 낭독 켜기'}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs ${
              ttsEnabled
                ? 'bg-cyan-950/40 border-cyan-700/50 text-cyan-400 hover:bg-cyan-900/40'
                : 'bg-slate-800 border-slate-700 text-slate-500'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span className="hidden md:inline font-mono text-[11px]">TTS {ttsEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* 게임 규칙 버튼 */}
          <button
            onClick={onOpenRules}
            title="게임 규칙 및 안내"
            className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* 다시 설정 / 새 게임 */}
          <button
            onClick={onReset}
            title="새 게임 설정"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">새 게임</span>
          </button>
        </div>
      </div>
    </header>
  );
};
