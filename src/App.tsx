import React, { useState, useEffect, useCallback } from 'react';
import { useCodenames } from './hooks/useCodenames';
import { useMultiplayerGame } from './hooks/useMultiplayerGame';
import { Header } from './components/Header';
import { SecretHintBanner } from './components/SecretHintBanner';
import { SpymasterPanel } from './components/SpymasterPanel';
import { CardGrid } from './components/CardGrid';
import { ActionControls } from './components/ActionControls';
import { SetupModal } from './components/SetupModal';
import { GameOverModal } from './components/GameOverModal';
import { RuleModal } from './components/RuleModal';
import { MultiplayerModal } from './components/MultiplayerModal';
import { VoiceChatBar } from './components/VoiceChatBar';
import { ArchiveModal } from './components/ArchiveModal';
import { SpymasterInputBar } from './components/SpymasterInputBar';
import { archiveManager } from './utils/archive';
import { APP_VERSION } from './constants/version';
import { Hint, CardItem } from './types/game';

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
    setStatusMessage,
    targetingCardId,
    setTargetingCardId,
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
    syncBoardState,
    applySpymasterHint,
  } = useCodenames();

  const [showRules, setShowRules] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  // 🌐 멀티플레이 P2P 및 보이스 통신 훅 연결
  const {
    isModalOpen: isMultiplayerModalOpen,
    setIsModalOpen: setIsMultiplayerModalOpen,
    isMultiplayerActive,
    roomId,
    isHost,
    players,
    localPlayer,
    isConnected,
    connectionStatus,
    isVoiceActive,
    isMuted,
    isDeafened,
    createRoom,
    joinRoom,
    selectRole,
    toggleAiFill,
    toggleVoice,
    toggleMute,
    toggleDeafen,
    broadcastStartGame,
    broadcastCardPick,
    broadcastHint,
    broadcastPassTurn,
  } = useMultiplayerGame({
    onSyncReceivedBoard: (receivedCards, mode, initialTurn, initialHint) => {
      syncBoardState(receivedCards, mode, initialTurn, initialHint);
    },
    onRemoteCardPick: (cardId) => {
      selectCard(cardId);
    },
    onRemoteHintSubmit: (hint) => {
      applySpymasterHint(hint);
    },
    onRemotePassTurn: () => {
      passTurn();
    },
  });

  // 역할 판별
  const isSpymasterRole = isMultiplayerActive && (
    localPlayer?.role === 'red_spymaster' ||
    localPlayer?.role === 'blue_spymaster' ||
    localPlayer?.role === 'spectator'
  );

  const isMySpymasterTurn = isMultiplayerActive && (
    (localPlayer?.role === 'red_spymaster' && playerTeam === 'red' && turn === 'spymaster_thinking') ||
    (localPlayer?.role === 'blue_spymaster' && playerTeam === 'blue' && turn === 'spymaster_thinking')
  );

  // 요원 클릭 권한 (팀장/관전자는 지목 불가)
  const isPlayerActionAllowed = !isSpymasterRole && phase === 'playing' && turn === 'player_turn' && guessesLeft > 0;

  // 카드 선택 핸들러 (싱글 및 멀티 동기화)
  const handleSelectCard = useCallback((cardId: number) => {
    selectCard(cardId);
    if (isMultiplayerActive) {
      broadcastCardPick(cardId);
    }
  }, [selectCard, isMultiplayerActive, broadcastCardPick]);

  // 🤖 관전자 모드 및 AI 요원 자동 카드 추리/지목 루프 (1~2초 숙지 후 조준 및 순차 지목)
  const isSpectator = isMultiplayerActive && localPlayer?.role === 'spectator';
  const currentTeamOperativeRole = playerTeam === 'red' ? 'red_operative' : 'blue_operative';
  const isOperativeAi = isMultiplayerActive
    ? (isSpectator || !!players.find(p => p.role === currentTeamOperativeRole)?.isAi)
    : false;

  useEffect(() => {
    if (!isOperativeAi || phase !== 'playing' || turn !== 'player_turn' || guessesLeft <= 0) {
      setTargetingCardId(null);
      return;
    }

    const unrevealedCards = cards.filter(c => !c.revealed);
    if (unrevealedCards.length === 0) return;

    let timer1: ReturnType<typeof setTimeout> | null = null;
    let timer2: ReturnType<typeof setTimeout> | null = null;

    // 1단계: 사용자가 팀장의 힌트(단어, 수량)를 확인할 수 있도록 1.8초 동안 대기 및 분석 안내
    setStatusMessage(`AI 요원이 팀장의 지령을 분석하며 작전 카드를 탐색 중입니다...`);

    timer1 = setTimeout(() => {
      // 힌트 유도 타깃 카드가 남아있다면 1순위로 선정
      const targetWords = currentHint?.targetWords || [];
      const matchingTargetCards = unrevealedCards.filter(c => targetWords.includes(c.word));
      const myTeamCards = unrevealedCards.filter(c => c.type === playerTeam);
      const civilianCards = unrevealedCards.filter(c => c.type === 'neutral');

      let chosenCard: CardItem | null = null;
      if (matchingTargetCards.length > 0) {
        chosenCard = matchingTargetCards[0];
      } else if (myTeamCards.length > 0 && (Math.random() < 0.88 || civilianCards.length === 0)) {
        chosenCard = myTeamCards[Math.floor(Math.random() * myTeamCards.length)];
      } else if (civilianCards.length > 0) {
        chosenCard = civilianCards[Math.floor(Math.random() * civilianCards.length)];
      } else {
        chosenCard = unrevealedCards[0];
      }

      if (!chosenCard) return;

      // 2단계: AI 요원이 목표 카드를 1.5초간 조준(Targeting)하여 화면에 네온 펄스 효과 점등
      setTargetingCardId(chosenCard.id);
      setStatusMessage(`AI 요원이 [${chosenCard.word}] 카드를 목표로 검토 중입니다...`);

      // 3단계: 1.5초 후 확정 지목 및 카드 뒤집기
      timer2 = setTimeout(() => {
        setTargetingCardId(null);
        if (chosenCard) {
          handleSelectCard(chosenCard.id);
        }
      }, 1500);
    }, 1800);

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      setTargetingCardId(null);
    };
  }, [isOperativeAi, phase, turn, guessesLeft, cards, playerTeam, currentHint, handleSelectCard, setTargetingCardId, setStatusMessage]);

  // 턴 패스 핸들러
  const handlePassTurn = useCallback(() => {
    passTurn();
    if (isMultiplayerActive) {
      broadcastPassTurn();
    }
  }, [passTurn, isMultiplayerActive, broadcastPassTurn]);

  // 멀티플레이 호스트의 게임 시작
  const handleHostStartGame = () => {
    startGame(difficulty, playerTeam, gameMode);
    setTimeout(() => {
      broadcastStartGame(cards, gameMode, 'spymaster_thinking');
    }, 100);
  };

  // 팀장의 직접 힌트 전송
  const handleSubmitSpymasterHint = (word: string, count: number) => {
    const currentUnrevealedTeamCards = cards
      .filter(c => c.type === playerTeam && !c.revealed)
      .slice(0, count)
      .map(c => c.word);

    const newHint: Hint = {
      word,
      count,
      targetWords: currentUnrevealedTeamCards,
      turnNumber: hintHistory.length + 1,
      confidence: 100,
      safetyLevel: 'SAFE',
      explanation: `팀장이 [${currentUnrevealedTeamCards.join(', ')}] 카드를 의도하여 "${word}" (${count}장) 지령을 내렸습니다.`,
    };
    applySpymasterHint(newHint);
    if (isMultiplayerActive) {
      broadcastHint(newHint);
    }
  };

  // 📜 게임 종료 시 작전 보관소(Archive) 자동 저장
  const hasSavedArchive = React.useRef<string | null>(null);
  useEffect(() => {
    if (phase === 'gameover' && winner && hasSavedArchive.current !== `${winner}_${cards[0]?.word}`) {
      hasSavedArchive.current = `${winner}_${cards[0]?.word}`;
      archiveManager.saveArchive({
        title: `${gameMode === 'picture' ? '5×4 그림' : '5×5 낱말'} 작전 (${
          winner === 'assassin_loss' ? '암살자 피격 실패' : `${winner.toUpperCase()} 팀 승리`
        })`,
        date: new Date().toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        mode: gameMode,
        winner: winner === 'assassin_loss' ? 'assassin' : winner,
        playerTeam,
        isMultiplayer: isMultiplayerActive,
        players: isMultiplayerActive
          ? players.map(p => ({ name: p.name, role: p.role, isAi: p.isAi }))
          : [
              { name: '현장 요원 (플레이어)', role: playerTeam === 'red' ? 'red_operative' : 'blue_operative' },
              { name: '스파이마스터 AI', role: playerTeam === 'red' ? 'red_spymaster' : 'blue_spymaster', isAi: true },
            ],
        cards,
        hintHistory,
        actionLogs: [],
        totalTurns: stats.turnsTaken || hintHistory.length,
      });
    }
  }, [phase, winner, gameMode, playerTeam, isMultiplayerActive, players, cards, hintHistory, stats]);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white font-spy">
      {/* 상단 기밀 HUD 헤더 (다단 반응형 + 멀티플레이 & 작전 복기 버튼) */}
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
        onOpenMultiplayer={() => setIsMultiplayerModalOpen(true)}
        onOpenArchive={() => setShowArchiveModal(true)}
        isMultiplayerActive={isMultiplayerActive}
      />

      {/* 🎙️ 실시간 보이스 통화 바 (멀티플레이 활성화 시 전원 동시 음성 통화) */}
      {isMultiplayerActive && (
        <VoiceChatBar
          players={players}
          localPlayer={localPlayer}
          isVoiceActive={isVoiceActive}
          onToggleVoice={toggleVoice}
          onToggleMute={toggleMute}
          onToggleDeafen={toggleDeafen}
          isMuted={isMuted}
          isDeafened={isDeafened}
          roomId={roomId}
        />
      )}

      {/* 메인 작전 구역 (엄격한 3단 상하 레이아웃 유지) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-4 py-2 sm:py-4 flex flex-col justify-between gap-2.5 sm:gap-3.5">
        {/* 🎯 1. [암호힌트] 팀장힌트 위로 배치 (선택 시에만 노출) */}
        <SecretHintBanner
          currentHint={currentHint}
          guessesLeft={guessesLeft}
          playerTeam={playerTeam}
          isPictureMode={cards.length > 0 && cards[0].mode === 'picture'}
          disabled={!isPlayerActionAllowed}
        />

        {/* 🤖 2. [2번 패널] 맨 위: 이전 힌트 기록 / 바로 아래: 팀장 힌트 본부 (카드 바로 위) */}
        <SpymasterPanel
          currentHint={currentHint}
          hintHistory={hintHistory}
          turn={turn}
          playerTeam={playerTeam}
          statusMessage={statusMessage}
          combo={combo}
        />

        {/* 🃏 3. [카드판] 팀장힌트 바로 아래 위치 (팀장일 경우 키카드 투시 뷰 활성화) */}
        <CardGrid
          cards={cards}
          onSelectCard={handleSelectCard}
          onToggleMarkCard={toggleMarkCard}
          onClearMarks={clearAllMarks}
          disabled={!isPlayerActionAllowed}
          isSpymasterView={isSpymasterRole}
          targetingCardId={targetingCardId}
        />

        {/* 📝 팀장 역할일 때: 하단 힌트 입력 지령 바 */}
        {isMySpymasterTurn ? (
          <SpymasterInputBar
            onSubmitHint={handleSubmitSpymasterHint}
            disabled={turn !== 'spymaster_thinking'}
            team={playerTeam}
          />
        ) : (
          /* ⌨️ 4. 요원 하단 입력 컨트롤 (자동완성 칩 + 음성 인식 + 텍스트 타이핑 + 턴 패스) */
          <ActionControls
            cards={cards}
            onSelectByWord={selectCardByWord}
            onPassTurn={handlePassTurn}
            onToggleVoice={toggleVoiceInput}
            isListening={isListening}
            voiceError={voiceError}
            disabled={!isPlayerActionAllowed}
          />
        )}
      </main>

      {/* 푸터: 크레딧 및 PWA 안내 가이드라인 */}
      <footer className="w-full bg-[#080a0f] border-t border-slate-900 py-3 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CODENAMES : SPYMASTER AI & MULTIPLAYER <strong className="text-emerald-400">{APP_VERSION}</strong></span>
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

      {/* 👥 다인 멀티플레이어 대기실 모달 */}
      <MultiplayerModal
        isOpen={isMultiplayerModalOpen}
        onClose={() => setIsMultiplayerModalOpen(false)}
        roomId={roomId}
        isHost={isHost}
        players={players}
        localPlayer={localPlayer}
        onSelectRole={selectRole}
        onToggleAiFill={toggleAiFill}
        onStartGame={handleHostStartGame}
        onCreateRoom={createRoom}
        onJoinRoom={joinRoom}
        isConnected={isConnected}
        connectionStatus={connectionStatus}
      />

      {/* 📜 작전 정밀 복기실 (아카이브) 모달 */}
      <ArchiveModal
        isOpen={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
      />

      {/* 게임 규칙 모달 */}
      {showRules && (
        <RuleModal
          onClose={() => setShowRules(false)}
        />
      )}

      {/* 1인 싱글 설정 모달 (메인 시작 화면) */}
      {phase === 'setup' && !isMultiplayerActive && (
        <SetupModal
          onStart={startGame}
          isShuffling={isShuffling}
          career={career}
          onOpenMultiplayer={() => setIsMultiplayerModalOpen(true)}
        />
      )}

      {/* 게임 오버 결과 모달 */}
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
    </div>
  );
};

export default App;
