import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useCodenames } from './hooks/useCodenames';
import { useMultiplayerGame } from './hooks/useMultiplayerGame';
import { Header } from './components/Header';
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
import { p2pManager } from './utils/p2p';
import { deduceBestCards } from './utils/operativeAi';
import { APP_VERSION } from './constants/version';
import { Hint } from './types/game';
import { PlayerRole } from './types/multiplayer';

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
    getAiSuggestedHint,
    setIsHumanSpymaster,
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

  // 인간 팀장 여부 동기화 (내가 팀장일 경우 AI가 임의로 첫 힌트를 내지 않고 내 입력을 대기)
  const isHumanSpymaster = isMultiplayerActive && (
    localPlayer?.role === 'red_spymaster' || localPlayer?.role === 'blue_spymaster'
  );
  useEffect(() => {
    setIsHumanSpymaster(isHumanSpymaster);
  }, [isHumanSpymaster, setIsHumanSpymaster]);

  // 요원 클릭 권한 (팀장/관전자는 지목 불가)
  const isPlayerActionAllowed = !isSpymasterRole && phase === 'playing' && turn === 'player_turn' && guessesLeft > 0;

  // 카드 선택 핸들러 (싱글 및 멀티 동기화)
  const handleSelectCard = useCallback((cardId: number) => {
    selectCard(cardId);
    if (isMultiplayerActive) {
      broadcastCardPick(cardId);
    }
  }, [selectCard, isMultiplayerActive, broadcastCardPick]);


  // 턴 패스 핸들러
  const handlePassTurn = useCallback(() => {
    passTurn();
    if (isMultiplayerActive) {
      broadcastPassTurn();
    }
  }, [passTurn, isMultiplayerActive, broadcastPassTurn]);

  // 🤖 관전자 모드 및 AI 요원 자동 카드 추리/지목 루프 (리렌더링에 안전한 독립 타이머 체인)
  const isSpectator = isMultiplayerActive && localPlayer?.role === 'spectator';
  const currentTeamOperativeRole = playerTeam === 'red' ? 'red_operative' : 'blue_operative';
  // 현장 요원 자리에 사람이 배정되어 있지 않거나 AI로 지정된 경우 -> AI 요원이 자동 진행!
  const isCurrentOperativeHuman = isMultiplayerActive && players.some(
    p => p.role === currentTeamOperativeRole && !p.isAi
  );
  const isOperativeAi = isMultiplayerActive ? (isSpectator || !isCurrentOperativeHuman) : false;

  const aiActiveStepRef = useRef<string | null>(null);
  const aiTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // AI 타이머 일괄 정리 헬퍼
  const clearAiTimers = useCallback(() => {
    aiTimersRef.current.forEach(t => clearTimeout(t));
    aiTimersRef.current = [];
  }, []);

  useEffect(() => {
    // AI 요원 턴이 아니거나 지목 기회가 없으면 타이머 및 조준 해제
    if (!isOperativeAi || phase !== 'playing' || turn !== 'player_turn' || guessesLeft <= 0) {
      clearAiTimers();
      aiActiveStepRef.current = null;
      setTargetingCardId(null);
      return;
    }

    const unrevealedCards = cards.filter(c => !c.revealed);
    if (unrevealedCards.length === 0) return;

    // 현재 턴·지목횟수·남은카드수로 구성된 고유 단계 키 (리렌더링 시 중복/리셋 방지)
    const stepKey = `${turn}_${guessesLeft}_${currentHint?.word || 'none'}_${unrevealedCards.length}`;
    if (aiActiveStepRef.current === stepKey) {
      return;
    }
    aiActiveStepRef.current = stepKey;
    clearAiTimers();

    // [1단계]: 힌트 수신 및 작전 카드 분석 (1.2초)
    setStatusMessage(`AI 요원이 팀장의 지령 "${currentHint?.word || ''}"을(를) 추리 분석 중입니다...`);

    const t1 = setTimeout(() => {
      const currentBoard = cards.filter(c => !c.revealed);
      if (currentBoard.length === 0) return;

      // 🧠 AI 요원의 실시간 시맨틱 추리 실행 (정답 키카드를 미리 알지 않고 보드 전체 단어와 연상 관계 분석)
      const deductions = deduceBestCards(currentHint?.word || '', currentBoard, difficulty);
      if (deductions.length === 0) return;

      const topPick = deductions[0];

      // 연관도 점수가 너무 낮거나 확실한 단어가 없으면 무모하게 찍지 않고 안전하게 턴 종료
      if (topPick.score < 18) {
        setStatusMessage(`AI 요원: "${currentHint?.word}"와(과) 연관된 유력한 카드가 없어 안전하게 턴을 종료합니다.`);
        const tPass = setTimeout(() => {
          handlePassTurn();
        }, 1200);
        aiTimersRef.current.push(tPass);
        return;
      }

      const chosenCard = topPick.card;

      // [2단계]: 목표 카드 조준 (1.2초간 보드에 네온 펄스 링과 [🎯 조준 중] 배지 표시)
      setTargetingCardId(chosenCard.id);
      setStatusMessage(`AI 요원 추리: ${topPick.reason} [${chosenCard.word}] 카드를 지목합니다!`);

      // [3단계]: 1.2초 후 카드 확정 지목 및 뒤집기!
      const t2 = setTimeout(() => {
        setTargetingCardId(null);
        aiActiveStepRef.current = null;
        if (chosenCard) {
          handleSelectCard(chosenCard.id);
        }
      }, 1200);
      aiTimersRef.current.push(t2);

    }, 1200);
    aiTimersRef.current.push(t1);

  }, [isOperativeAi, phase, turn, guessesLeft, cards, playerTeam, currentHint, handleSelectCard, handlePassTurn, setTargetingCardId, setStatusMessage, clearAiTimers]);


  // 멀티플레이 호스트의 게임 시작 (공석인 자리는 자동으로 AI 플레이어로 채워서 시작)
  const handleHostStartGame = () => {
    const standardRoles: { role: PlayerRole; name: string }[] = [
      { role: 'red_spymaster', name: '알파 (RED 팀장)' },
      { role: 'red_operative', name: '브라보 (RED 요원)' },
      { role: 'blue_spymaster', name: '찰리 (BLUE 팀장)' },
      { role: 'blue_operative', name: '델타 (BLUE 요원)' },
    ];
    standardRoles.forEach(({ role, name }) => {
      const exists = players.some(p => p.role === role);
      if (!exists) {
        p2pManager.setAiPlayer(role, true, name);
      }
    });

    startGame(difficulty, playerTeam, gameMode);
    setTimeout(() => {
      broadcastStartGame(cards, gameMode, 'spymaster_thinking');
    }, 100);
  };

  // 팀장의 직접 힌트 전송 (키카드를 모르는 AI 요원이 시맨틱 추리를 하도록 힌트 객체 구성)
  const handleSubmitSpymasterHint = (word: string, count: number) => {
    const deductions = deduceBestCards(word, cards.filter(c => !c.revealed), difficulty);
    const estimatedTargets = deductions.slice(0, count).map(d => d.card.word);

    const newHint: Hint = {
      word,
      count,
      targetWords: estimatedTargets,
      turnNumber: hintHistory.length + 1,
      confidence: 90,
      safetyLevel: 'SAFE',
      explanation: `팀장이 "${word}" (${count}장) 지령을 내렸습니다.`,
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

      {/* 메인 작전 구역 (상단 힌트 - 중앙 카드 - 하단 지목 한 화면 정렬) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2 sm:px-3 py-1 sm:py-2 flex flex-col justify-start gap-1 sm:gap-1.5">
        {/* 🤖 [팀장 힌트 본부] 3줄 컴팩트 (암호단어, 목표수량, 남은기회, 턴종료, AI브리핑) */}
        <SpymasterPanel
          currentHint={currentHint}
          hintHistory={hintHistory}
          turn={turn}
          playerTeam={playerTeam}
          statusMessage={statusMessage}
          combo={combo}
          guessesLeft={guessesLeft}
          onPassTurn={handlePassTurn}
          canPassTurn={isPlayerActionAllowed}
        />

        {/* 🃏 [카드판] 팀장힌트 바로 아래 위치 (5열 정밀 슬림 피팅) */}
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
            onGetAiSuggestion={getAiSuggestedHint}
          />
        ) : (
          /* ⌨️ 요원 하단 입력 컨트롤 (자동완성 칩 + 음성 인식 + 텍스트 타이핑 + 턴 패스) */
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
      <footer className="w-full bg-[#080a0f] border-t border-slate-900 py-1 sm:py-1.5 px-3 text-center text-[10px] sm:text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2">
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

      {/* 1인 싱글 설정 모달 (메인 시작 화면 - 다인 작전실 모달이 열리면 숨김) */}
      {phase === 'setup' && !isMultiplayerActive && !isMultiplayerModalOpen && (
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
