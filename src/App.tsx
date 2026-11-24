import React, { useState } from 'react';
import { useCodenames } from './hooks/useCodenames';
import { Header } from './components/Header';
import { SecretHintBanner } from './components/SecretHintBanner';
import { SpymasterPanel } from './components/SpymasterPanel';
import { CardGrid } from './components/CardGrid';
import { ActionControls } from './components/ActionControls';
import { SetupModal } from './components/SetupModal';
import { GameOverModal } from './components/GameOverModal';
import { RuleModal } from './components/RuleModal';

export const App: React.FC = () => {
  const {
    phase,
    gameMode,
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
        gameMode={gameMode}
        playerRemaining={playerRemaining}
        opponentRemaining={opponentRemaining}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        ttsEnabled={ttsEnabled}
        onToggleTts={() => setTtsEnabled(!ttsEnabled)}
        onOpenRules={() => setShowRules(true)}
        onReset={resetToSetup}
      />

      {/* 메인 작전 구역 */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-2 sm:py-4 flex flex-col justify-between gap-2.5 sm:gap-3.5">
        {/* 🎯 1. [암호힌트] 팀장힌트 위로 배치 */}
        <SecretHintBanner
          currentHint={currentHint}
          guessesLeft={guessesLeft}
          playerTeam={playerTeam}
          isPictureMode={cards.length > 0 && cards[0].mode === 'picture'}
          disabled={!isPlayerActionAllowed}
        />

        {/* 🤖 2. [팀장힌트] 카드 바로 위에 위치 */}
        <SpymasterPanel
          currentHint={currentHint}
          hintHistory={hintHistory}
          turn={turn}
          playerTeam={playerTeam}
          statusMessage={statusMessage}
        />

        {/* 🃏 3. [카드판] 팀장힌트 바로 아래 위치 (낱말 5x5 / 그림 5x4) */}
        <CardGrid
          cards={cards}
          onSelectCard={selectCard}
          disabled={!isPlayerActionAllowed}
        />

        {/* 4. 하단 입력 컨트롤 (음성 인식 + 텍스트 타이핑 + 턴 패스) */}
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
          <span>CODENAMES : SPYMASTER AI TRAINING WEBAPP <strong className="text-emerald-400">v1.4.0</strong> (2026.11.25)</span>
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

      {/* 설정 모달 (1단계: 낱말 카드 vs 그림 카드 선택 ➔ 2단계: 난이도 ➔ 3단계: 팀 색상 ➔ 카드 셔플) */}
      {phase === 'setup' && (
        <SetupModal
          onStart={startGame}
          isShuffling={isShuffling}
        />
      )}

      {/* 게임 오버 결과 모달 (승리/패배 + 전체 비밀 키카드 복기 맵 + 힌트 의도 복기) */}
      {phase === 'gameover' && (
        <GameOverModal
          winner={winner}
          playerTeam={playerTeam}
          cards={cards}
          stats={stats}
          hintHistory={hintHistory}
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
