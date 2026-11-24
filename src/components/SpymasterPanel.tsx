import React, { useState } from 'react';
import { Hint, TeamColor, TurnPhase } from '../types/game';
import { speech } from '../utils/speech';
import { Bot, Radio, Target, Sparkles, Volume2, History, ChevronDown, ChevronUp } from 'lucide-react';

interface SpymasterPanelProps {
  currentHint: Hint | null;
  hintHistory: Hint[];
  turn: TurnPhase;
  playerTeam: TeamColor;
  guessesLeft: number;
  statusMessage: string;
}

export const SpymasterPanel: React.FC<SpymasterPanelProps> = ({
  currentHint,
  hintHistory,
  turn,
  playerTeam,
  guessesLeft,
  statusMessage,
}) => {
  const [showHistory, setShowHistory] = useState(false);

  const isPlayerTurn = turn === 'player_turn';
  const isOpponentTurn = turn === 'opponent_turn';
  const isThinking = turn === 'spymaster_thinking';

  const teamLabel = playerTeam === 'red' ? '레드(RED)' : '블루(BLUE)';
  const teamColorClass = playerTeam === 'red' 
    ? 'border-red-500/50 bg-gradient-to-b from-[#1e131d] to-[#121622] shadow-glow-red' 
    : 'border-blue-500/50 bg-gradient-to-b from-[#131b2e] to-[#121622] shadow-glow-blue';

  const replayVoiceHint = () => {
    if (currentHint) {
      speech.speakHint(playerTeam === 'red' ? '레드' : '블루', currentHint.word, currentHint.count);
    }
  };

  return (
    <div className={`w-full rounded-3xl border-2 transition-all duration-300 backdrop-blur-xl p-4 sm:p-6 shadow-2xl ${
      isPlayerTurn ? teamColorClass : 'border-slate-800 bg-[#121724]'
    }`}>
      {/* 1. 상단 바: 팀장 상태 및 모드 안내 */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${
              playerTeam === 'red' ? 'bg-red-950/70 border-red-500/60 text-red-400' : 'bg-blue-950/70 border-blue-500/60 text-blue-400'
            }`}>
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
              isPlayerTurn ? 'bg-emerald-500 animate-ping' : isOpponentTurn ? 'bg-amber-500' : 'bg-cyan-500'
            }`}></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-slate-300">SPYMASTER AI</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold border ${
                playerTeam === 'red' ? 'bg-red-950/80 border-red-500/40 text-red-300' : 'bg-blue-950/80 border-blue-500/40 text-blue-300'
              }`}>
                {teamLabel} 팀장
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              {isThinking && <span className="text-cyan-400 flex items-center gap-1"><Radio className="w-3.5 h-3.5 animate-spin" /> 전술 암호 분석 중...</span>}
              {isOpponentTurn && <span className="text-amber-400 flex items-center gap-1"><Radio className="w-3.5 h-3.5 animate-pulse" /> 상대 팀 요원 활동 중...</span>}
              {isPlayerTurn && <span className="text-emerald-400 flex items-center gap-1"><Target className="w-3.5 h-3.5" /> 현장 요원 정답 지목 단계</span>}
            </div>
          </div>
        </div>

        {/* 잔여 기회 및 히스토리 버튼 */}
        <div className="flex items-center gap-2">
          {isPlayerTurn && (
            <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/50 px-3.5 py-1.5 rounded-xl text-emerald-300 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium">남은 지목 기회:</span>
              <span className="text-base sm:text-lg font-black font-mono text-emerald-300">{guessesLeft}회</span>
            </div>
          )}

          {hintHistory.length > 0 && (
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 hover:text-white border border-slate-700 transition-all font-mono"
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>힌트 기록 ({hintHistory.length})</span>
              {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>
      </div>

      {/* 2. 메인 초대형 글자 힌트 전광판 (MEGA HINT BILLBOARD) */}
      <div className="my-4 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-700/80 shadow-inner flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* 장식용 사이버 라인 */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

        <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>CURRENT TACTICAL HINT (현재 팀장 힌트)</span>
        </div>

        {currentHint ? (
          <div className="w-full flex flex-col items-center gap-3">
            {/* 글자 힌트 핵심 디스플레이: 아주 크고 또렷하게 표시 */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-1">
              <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase">암호 단어:</span>
              <span className="text-3xl sm:text-5xl md:text-6xl font-black font-spy tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white drop-shadow-[0_0_20px_rgba(6,182,212,0.6)] px-4 py-1 rounded-2xl bg-cyan-950/40 border border-cyan-500/30">
                "{currentHint.word}"
              </span>

              <span className="text-xs sm:text-sm font-mono text-slate-400 uppercase">수량:</span>
              <span className="text-2xl sm:text-4xl md:text-5xl font-black font-mono text-amber-300 px-4 py-1 rounded-2xl bg-amber-950/40 border border-amber-500/40 shadow-lg shadow-amber-900/30">
                {currentHint.count}장
              </span>

              {/* 음성 다시 듣기 버튼 */}
              <button
                onClick={replayVoiceHint}
                title="팀장 음성 힌트 다시 듣기"
                className="p-2 sm:p-3 rounded-2xl bg-cyan-600/30 hover:bg-cyan-500/40 border border-cyan-400/50 text-cyan-300 hover:text-white transition-all shadow-md flex items-center gap-1.5"
              >
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                <span className="text-xs font-bold font-mono hidden sm:inline">다시 듣기</span>
              </button>
            </div>

            {/* 글자로 명확히 보여주는 음성 낭독 스크립트 자막 바 */}
            <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 flex items-center justify-center gap-2">
              <span className="text-cyan-400 font-mono font-bold">📢 팀장 지령 자막:</span>
              <span>"{playerTeam === 'red' ? '레드' : '블루'} 팀장 힌트입니다. 단어 <strong className="text-cyan-300 text-sm">[{currentHint.word}]</strong>, 목표 카드 <strong className="text-amber-300 text-sm">[{currentHint.count}장]</strong>입니다."</span>
            </div>

            {currentHint.explanation && (
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                💡 {currentHint.explanation}
              </p>
            )}
          </div>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-400">
            <Radio className="w-8 h-8 text-cyan-400 animate-spin" />
            <span className="text-base font-bold text-slate-200">팀장이 비밀 키카드를 분석하고 있습니다...</span>
            <span className="text-xs text-slate-500">잠시 후 화면과 음성으로 힌트가 전달됩니다.</span>
          </div>
        )}
      </div>

      {/* 3. 이전 힌트 히스토리 드롭다운 */}
      {showHistory && hintHistory.length > 0 && (
        <div className="mb-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 animate-fadeIn">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-cyan-400" /> 이번 작전 힌트 기록 (총 {hintHistory.length}회)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {hintHistory.map((h, i) => (
              <div key={i} className="bg-slate-900/80 border border-slate-800 px-3 py-2 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">#{i + 1}번째</span>
                <span className="font-bold text-cyan-300 text-sm">"{h.word}"</span>
                <span className="font-mono text-amber-300 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">{h.count}장</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. 하단 상태 안내 */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-300 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>{statusMessage}</span>
        </div>
        {isPlayerTurn && (
          <span className="text-slate-400 font-mono text-[11px]">
            ※ 카드를 직접 클릭하거나, 아래 음성/텍스트로 지목할 수 있습니다.
          </span>
        )}
      </div>
    </div>
  );
};
