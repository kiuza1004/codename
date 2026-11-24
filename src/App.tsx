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
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-[#0b0e14] text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-cyan-500 selection:text-white font-spy">
      {/* 상단 기밀 HUD 헤더 (고정 슬림 바) */}
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

      {/* 메인 작전 구역 (화면 높이에 맞춰 세로 스크롤 없이 100% 핏) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-1.5 sm:px-3 py-1 sm:py-2 flex flex-col justify-between gap-1 sm:gap-2 min-h-0 overflow-hidden">
        {/* 스파이마스터 팀장 브리핑 전광판 */}
        <div className="flex-shrink-0">
          <SpymasterPanel
            currentHint={currentHint}
            hintHistory={hintHistory}
            turn={turn}
            playerTeam={playerTeam}
            guessesLeft={guessesLeft}
            statusMessage={statusMessage}
          />
        </div>

        {/* 5x5 실제 코드네임 카드 그리드 (25장 전체 기기 맞춤 뷰) */}
        <CardGrid
          cards={cards}
          onSelectCard={selectCard}
          disabled={!isPlayerActionAllowed}
        />

        {/* 하단 입력 컨트롤 (음성 인식 + 텍스트 타이핑 + 턴 패스) */}
        <div className="flex-shrink-0">
          <ActionControls
            onSelectByWord={selectCardByWord}
            onPassTurn={passTurn}
            onToggleVoice={toggleVoiceInput}
            isListening={isListening}
            voiceError={voiceError}
            disabled={!isPlayerActionAllowed}
          />
        </div>
      </main>

      {/* 푸터: 슬림 한 줄 바 */}
      <footer className="w-full bg-[#080a0f] border-t border-slate-900/80 py-1 px-2 text-center text-[10px] text-slate-500 font-mono flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <span className="hidden sm:inline">CODENAMES AI TRAINING</span>
          <span className="text-amber-500/80 text-[10px]">
            ※ PWA 안내: 캐시가 꼬일 수 있으니 꼭 기존 앱을 완전히 삭제하고 설치하셔야 합니다.
          </span>
          <a
            href="https://github.com/kiuza1004/codename"
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline"
          >
            GitHub
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
