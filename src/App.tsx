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
import { APP_VERSION } from './constants/version';

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
    combo,
    career,
    soundEnabled,
    setSoundEnabled,
    ttsEnabled,
    setTtsEnabled,
    isListening,
    voiceError,
    startGame,
    selectCard,
    selectCardByWord,
    toggleMarkCard,
    clearAllMarks,
    passTurn,
    toggleVoiceInput,
    resetToSetup,
  } = useCodenames();

  const [showRules, setShowRules] = useState(false);

  const isPlayerActionAllowed = phase === 'playing' && turn === 'player_turn' && guessesLeft > 0;

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white font-spy">
      {/* 상단 기밀 HUD 헤더 (다단 반응형 레이아웃 + 버전 정보 + 캐시 갱신) */}
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
        career={career}
      />

      {/* 메인 작전 구역 (엄격한 상하 레이아웃 순서 유지) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-2 sm:py-4 flex flex-col justify-between gap-2.5 sm:gap-3.5">
        {/* 🎯 1. [암호힌트] 팀장힌트 위로 배치 (선택 시에만 노출) */}
        <SecretHintBanner
          currentHint={currentHint}
          guessesLeft={guessesLeft}
          playerTeam={playerTeam}
          isPictureMode={cards.length > 0 && cards[0].mode === 'picture'}
          disabled={!isPlayerActionAllowed}
        />

        {/* 🤖 2. [2번 패널] 맨 위: 이전 힌트 기록 / 바로 아래: 팀장 힌트 (카드 바로 위) */}
        <SpymasterPanel
          currentHint={currentHint}
          hintHistory={hintHistory}
          turn={turn}
          playerTeam={playerTeam}
          statusMessage={statusMessage}
          combo={combo}
        />

        {/* 🃏 3. [카드판] 팀장힌트 바로 아래 위치 (낱말 5x5 / 그림 5x4 + 후보 핀 마킹 & 확대) */}
        <CardGrid
          cards={cards}
          onSelectCard={selectCard}
          onToggleMarkCard={toggleMarkCard}
          onClearMarks={clearAllMarks}
          disabled={!isPlayerActionAllowed}
        />

        {/* ⌨️ 4. 하단 입력 컨트롤 (자동완성 칩 + 음성 인식 + 텍스트 타이핑 + 턴 패스) */}
        <ActionControls
          cards={cards}
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
          <span>CODENAMES : SPYMASTER AI TRAINING WEBAPP <strong className="text-emerald-400">{APP_VERSION}</strong> (2026.11.25)</span>
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

      {/* 설정 모달 (화면 최적화 피팅 + 커리어 전적 + 낱말/그림 선택 -> 난이도 -> 팀 색상) */}
      {phase === 'setup' && (
        <SetupModal
          onStart={startGame}
          isShuffling={isShuffling}
          career={career}
        />
      )}

      {/* 게임 오버 결과 모달 (작전 등급 S~C + 힌트 의도 복기 + 비밀 키카드 원본) */}
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

      {/* 규칙 안내 모달 */}
      {showRules && (
        <RuleModal onClose={() => setShowRules(false)} />
      )}
    </div>
  );
};

export default App;

