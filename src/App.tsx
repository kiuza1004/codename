import React, { useState } from 'react';
import { useCodenames } from './hooks/useCodenames';
import { Header } from './components/Header';
import { SpymasterPanel } from './components/SpymasterPanel';
import { CardGrid } from './components/CardGrid';
import { ActionControls } from './components/ActionControls';
import { SetupModal } from './components/SetupModal';
import { GameOverModal } from './components/GameOverModal';
import { RuleModal } from './components/RuleModal';

export const App: React.FC = () => {
  const {
    phase,
    difficulty,
    playerTeam,
    cards,
    turn,
    currentHint,
    hintHistory,
    guessesLeft,
    statusMessage,
    winner,
    isShuffling,
    playerRemaining,
    opponentRemaining,
    stats,
    soundEnabled,
    setSoundEnabled,
    ttsEnabled,
    setTtsEnabled,
    isListening,
    voiceError,
    startGame,
    selectCard,
    selectCardByWord,
    passTurn,
    toggleVoiceInput,
    resetToSetup,
  } = useCodenames();

  const [showRules, setShowRules] = useState(false);

  const isPlayerActionAllowed = phase === 'playing' && turn === 'player_turn' && guessesLeft > 0;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white font-spy">
      {/* 상단 기밀 HUD 헤더 */}
      <Header
        playerTeam={playerTeam}
        difficulty={difficulty}
        playerRemaining={playerRemaining}
        opponentRemaining={opponentRemaining}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        ttsEnabled={ttsEnabled}
        onToggleTts={() => setTtsEnabled(!ttsEnabled)}
        onOpenRules={() => setShowRules(true)}
        onReset={resetToSetup}
      />

      {/* 메인 컨테이너 */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 sm:py-6 flex flex-col justify-between gap-4">
        {/* 스파이마스터 팀장 브리핑 패널 */}
        <SpymasterPanel
          currentHint={currentHint}
          hintHistory={hintHistory}
          turn={turn}
          playerTeam={playerTeam}
          guessesLeft={guessesLeft}
          statusMessage={statusMessage}
        />

        {/* 5x5 실제 코드네임 카드 그리드 (25장) */}
        <CardGrid
          cards={cards}
          onSelectCard={selectCard}
          disabled={!isPlayerActionAllowed}
        />

        {/* 하단 입력 컨트롤 (음성 인식 + 텍스트 타이핑 + 턴 패스) */}
        <ActionControls
          onSelectByWord={selectCardByWord}
          onPassTurn={passTurn}
          onToggleVoice={toggleVoiceInput}
          isListening={isListening}
          voiceError={voiceError}
          disabled={!isPlayerActionAllowed}
        />
      </main>

      {/* 푸터: 크레딧 및 PWA 안내 가이드라인 */}
      <footer className="w-full bg-[#080a0f] border-t border-slate-900 py-3 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CODENAMES : SPYMASTER AI TRAINING WEBAPP © 2026</span>
          <span className="text-amber-500/80">
            ※ PWA 안내: 캐시가 꼬일 수 있으니 꼭 기존 앱을 완전히 삭제하고 설치하셔야 합니다.
          </span>
          <a
            href="https://github.com/kiuza1004/codename"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline"
          >
            GitHub Repository
          </a>
        </div>
      </footer>

      {/* 설정 모달 (게임 난이도 선택 + 팀 색상 선택 + 카드 셔플 시작) */}
      {phase === 'setup' && (
        <SetupModal
          onStart={startGame}
          isShuffling={isShuffling}
        />
      )}

      {/* 게임 오버 결과 모달 (승리/패배 + 전체 비밀 키카드 복기 맵) */}
      {phase === 'gameover' && (
        <GameOverModal
          winner={winner}
          playerTeam={playerTeam}
          cards={cards}
          stats={stats}
          onRestart={resetToSetup}
        />
      )}

      {/* 룰 설명 모달 */}
      {showRules && (
        <RuleModal onClose={() => setShowRules(false)} />
      )}
    </div>
  );
};

export default App;
