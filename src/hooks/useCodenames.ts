import { useState, useEffect, useCallback, useRef } from 'react';
import { CardItem, CardType, Difficulty, GameMode, GamePhase, GameStats, Hint, TeamColor, TurnPhase } from '../types/game';
import { ALL_CODENAME_WORDS } from '../data/words';
import { PICTURE_CARDS } from '../data/pictures';
import { generateSpymasterHint } from '../utils/spymasterAi';
import { AgentCareerStats, loadCareerStats, saveCareerStats } from '../constants/version';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';

const RECENT_WORDS_KEY = 'codenames_recent_words';

export function useCodenames() {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [gameMode, setGameMode] = useState<GameMode>('word');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [playerTeam, setPlayerTeam] = useState<TeamColor>('red');
  const [cards, setCards] = useState<CardItem[]>(() => {
    return ALL_CODENAME_WORDS.slice(0, 25).map((word, idx) => ({
      id: idx,
      word,
      type: idx < 9 ? 'red' : idx < 17 ? 'blue' : idx < 24 ? 'neutral' : 'assassin',
      revealed: false,
      marked: false,
      mode: 'word',
    }));
  });
  const [turn, setTurn] = useState<TurnPhase>('spymaster_thinking');
  const [currentHint, setCurrentHint] = useState<Hint | null>(null);
  const [hintHistory, setHintHistory] = useState<Hint[]>([]);
  const [guessesLeft, setGuessesLeft] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [winner, setWinner] = useState<TeamColor | 'assassin_loss' | null>(null);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [combo, setCombo] = useState<number>(0);
  const [career, setCareer] = useState<AgentCareerStats>(() => loadCareerStats());

  const [stats, setStats] = useState<GameStats>({
    turnsTaken: 0,
    correctGuesses: 0,
    wrongGuesses: 0,
    startTime: Date.now(),
    maxCombo: 0,
  });

  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    speech.ttsEnabled = ttsEnabled;
  }, [ttsEnabled]);

  const opponentTeam: TeamColor = playerTeam === 'red' ? 'blue' : 'red';
  const playerRemaining = cards.filter(c => c.type === playerTeam && !c.revealed).length;
  const opponentRemaining = cards.filter(c => c.type === opponentTeam && !c.revealed).length;

  // 커리어 전적 업데이트 헬퍼
  const recordGameOutcome = useCallback((isWin: boolean, correctCount: number) => {
    setCareer(prev => {
      const nextWins = isWin ? prev.wins + 1 : prev.wins;
      const nextStreak = isWin ? prev.currentStreak + 1 : 0;
      const updated: AgentCareerStats = {
        gamesPlayed: prev.gamesPlayed + 1,
        wins: nextWins,
        currentStreak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
        totalCorrect: prev.totalCorrect + correctCount,
      };
      saveCareerStats(updated);
      return updated;
    });
  }, []);

  // 후보 카드 핀 마킹(Tactical Mark) 토글
  const toggleMarkCard = useCallback((cardId: number) => {
    sound.playHover();
    setCards(prev =>
      prev.map(c => (c.id === cardId && !c.revealed ? { ...c, marked: !c.marked } : c))
    );
  }, []);

  // 모든 후보 핀 마킹 초기화
  const clearAllMarks = useCallback(() => {
    sound.playHover();
    setCards(prev => prev.map(c => (c.marked ? { ...c, marked: false } : c)));
  }, []);

  // 최근 사용된 단어들 피해서 25장 무작위 카드 추출
  const pick25Words = useCallback((): string[] => {
    let recentWords: string[] = [];
    try {
      const stored = sessionStorage.getItem(RECENT_WORDS_KEY);
      if (stored) recentWords = JSON.parse(stored);
    } catch {
      recentWords = [];
    }

    const freshWords = ALL_CODENAME_WORDS.filter(w => !recentWords.includes(w));
    let pool = [...freshWords];

    if (pool.length < 25) {
      pool = [...ALL_CODENAME_WORDS];
      recentWords = [];
    }

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const selected = pool.slice(0, 25);

    try {
      const updated = Array.from(new Set([...selected, ...recentWords])).slice(0, 75);
      sessionStorage.setItem(RECENT_WORDS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    return selected;
  }, []);

  // 카드 섞고 게임 시작
  const startGame = useCallback((selectedDiff: Difficulty, selectedTeam: TeamColor, selectedMode: GameMode = 'word') => {
    setIsShuffling(true);
    sound.playCardFlip();
    speech.cancelSpeech();
    hasTriggeredFirstHint.current = false;

    setTimeout(() => {
      const types: CardType[] = [];
      const otherTeam: CardType = selectedTeam === 'red' ? 'blue' : 'red';

      if (selectedMode === 'picture') {
        // 그림판 정식 규칙: 5x4 = 20장 (선공 8, 후공 7, 민간인 4, 암살자 1)
        for (let i = 0; i < 8; i++) types.push(selectedTeam);
        for (let i = 0; i < 7; i++) types.push(otherTeam);
        for (let i = 0; i < 4; i++) types.push('neutral');
        types.push('assassin');
      } else {
        // 낱말판 정식 규칙: 5x5 = 25장 (선공 9, 후공 8, 민간인 7, 암살자 1)
        for (let i = 0; i < 9; i++) types.push(selectedTeam);
        for (let i = 0; i < 8; i++) types.push(otherTeam);
        for (let i = 0; i < 7; i++) types.push('neutral');
        types.push('assassin');
      }

      for (let i = types.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [types[i], types[j]] = [types[j], types[i]];
      }

      let initialCards: CardItem[] = [];

      if (selectedMode === 'picture') {
        const shuffledPics = [...PICTURE_CARDS];
        for (let i = shuffledPics.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledPics[i], shuffledPics[j]] = [shuffledPics[j], shuffledPics[i]];
        }
        const selectedPics = shuffledPics.slice(0, 20);

        initialCards = selectedPics.map((pic, idx) => ({
          id: idx,
          word: pic.title,
          type: types[idx],
          revealed: false,
          marked: false,
          mode: 'picture',
          svgIcon: pic.svg,
          keywords: [...pic.keywords, ...pic.categories, ...pic.hints],
        }));
      } else {
        const words = pick25Words();
        initialCards = words.map((word, idx) => ({
          id: idx,
          word,
          type: types[idx],
          revealed: false,
          marked: false,
          mode: 'word',
        }));
      }

      setGameMode(selectedMode);
      setDifficulty(selectedDiff);
      setPlayerTeam(selectedTeam);
      setCards(initialCards);
      setWinner(null);
      setCurrentHint(null);
      setHintHistory([]);
      setGuessesLeft(0);
      setCombo(0);
      setStats({
        turnsTaken: 1,
        correctGuesses: 0,
        wrongGuesses: 0,
        startTime: Date.now(),
        maxCombo: 0,
      });

      setIsShuffling(false);
      setPhase('playing');
      setTurn('spymaster_thinking');
      setStatusMessage('Argon 스파이마스터 AI가 전술 키카드를 분석 중입니다...');
    }, 500);
  }, [pick25Words]);

  // 스파이마스터 AI 힌트 생성 트리거 (이미 사용된 힌트 제외)
  const triggerSpymasterHint = useCallback((currentCards: CardItem[], existingHistory: Hint[]) => {
    setTurn('spymaster_thinking');
    setStatusMessage('팀장 AI가 최적의 시맨틱 힌트를 도출하고 있습니다...');

    setTimeout(() => {
      const usedWords = existingHistory.map(h => h.word);
      const hint = generateSpymasterHint(currentCards, playerTeam, difficulty, usedWords);
      const hintWithTurn = { ...hint, turnNumber: existingHistory.length + 1 };
      setCurrentHint(hintWithTurn);
      setHintHistory(prev => [...prev, hintWithTurn]);
      const availableGuesses = hint.count + 1;
      setGuessesLeft(availableGuesses);
      setTurn('player_turn');
      setStatusMessage(`암호 힌트가 도착했습니다. 목표 카드(${hint.count}장)를 추리하여 지목하십시오.`);

      sound.playHintBeep();
      const teamLabel = playerTeam === 'red' ? '레드' : '블루';
      speech.speakHint(teamLabel, hint.word, hint.count);
    }, 300);
  }, [playerTeam, difficulty]);

  // 게임 시작 시 첫 번째 힌트 자동 생성
  const hasTriggeredFirstHint = useRef(false);
  useEffect(() => {
    if (phase === 'playing' && turn === 'spymaster_thinking' && !hasTriggeredFirstHint.current && cards.length > 0) {
      hasTriggeredFirstHint.current = true;
      triggerSpymasterHint(cards, []);
    }
  }, [phase, turn, cards, triggerSpymasterHint]);

  // 상대팀(AI) 턴 시뮬레이션
  const handleOpponentTurn = useCallback((updatedCards: CardItem[], currentHistory: Hint[]) => {
    setTurn('opponent_turn');
    setCombo(0);
    speech.cancelSpeech();
    setStatusMessage('상대 팀(AI)이 작전을 수행 중입니다...');

    const oppTeam = playerTeam === 'red' ? 'blue' : 'red';
    const oppCards = updatedCards.filter(c => c.type === oppTeam && !c.revealed);

    setTimeout(() => {
      if (oppCards.length === 0) {
        setWinner(oppTeam);
        setPhase('gameover');
        sound.playAssassin();
        recordGameOutcome(false, stats.correctGuesses);
        return;
      }

      let revealCount = 1;
      if (difficulty === 'hard' && Math.random() < 0.6 && oppCards.length >= 2) {
        revealCount = 2;
      } else if (difficulty === 'easy' && Math.random() < 0.4) {
        revealCount = 0;
      }

      let nextCards = [...updatedCards];
      if (revealCount > 0) {
        const toReveal = oppCards.slice(0, revealCount);
        const revealIds = new Set(toReveal.map(c => c.id));
        nextCards = nextCards.map(c =>
          revealIds.has(c.id) ? { ...c, revealed: true, marked: false, revealedBy: 'opponent' } : c
        );
        sound.playOpponentHit();
        setStatusMessage(`상대 팀이 요원 [${toReveal.map(c => c.word).join(', ')}]을(를) 확보했습니다!`);
      } else {
        setStatusMessage('상대 팀이 이번 턴에 요원을 확보하지 못했습니다.');
      }

      setCards(nextCards);

      const remainingOpp = nextCards.filter(c => c.type === oppTeam && !c.revealed).length;
      if (remainingOpp === 0) {
        setWinner(oppTeam);
        setPhase('gameover');
        sound.playAssassin();
        setStatusMessage('상대 팀이 모든 요원을 먼저 확보하여 작전에서 패배했습니다.');
        recordGameOutcome(false, stats.correctGuesses);
        return;
      }

      setTimeout(() => {
        setStats(prev => ({ ...prev, turnsTaken: prev.turnsTaken + 1 }));
        triggerSpymasterHint(nextCards, currentHistory);
      }, 1200);
    }, 1400);
  }, [playerTeam, difficulty, triggerSpymasterHint, recordGameOutcome, stats.correctGuesses]);

  // 카드 선택 (지목) 처리
  const selectCard = useCallback((cardId: number) => {
    if (phase !== 'playing' || turn !== 'player_turn' || guessesLeft <= 0) return;

    const targetCard = cards.find(c => c.id === cardId);
    if (!targetCard || targetCard.revealed) return;

    sound.playCardFlip();

    const updatedCards = cards.map(c =>
      c.id === cardId ? { ...c, revealed: true, marked: false, revealedBy: 'player' as const } : c
    );
    setCards(updatedCards);

    // 1. 암살자(Assassin) -> 즉시 패배
    if (targetCard.type === 'assassin') {
      sound.playAssassin();
      setCombo(0);
      setWinner('assassin_loss');
      setPhase('gameover');
      setStatusMessage(`암살자 [${targetCard.word}] 카드를 건드렸습니다! 작전 실패 (게임 오버)`);
      speech.speakText('암살자 카드를 건드렸습니다. 작전 실패입니다.');
      setStats(prev => ({ ...prev, wrongGuesses: prev.wrongGuesses + 1, endTime: Date.now() }));
      recordGameOutcome(false, stats.correctGuesses);
      return;
    }

    // 2. 우리 팀 카드 적중!
    if (targetCard.type === playerTeam) {
      sound.playCorrect();
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      const nextCorrect = stats.correctGuesses + 1;
      setStats(prev => ({
        ...prev,
        correctGuesses: nextCorrect,
        maxCombo: Math.max(prev.maxCombo || 0, nextCombo),
      }));

      const remainingTeam = updatedCards.filter(c => c.type === playerTeam && !c.revealed).length;
      if (remainingTeam === 0) {
        setWinner(playerTeam);
        setPhase('gameover');
        sound.playVictory();
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
        });
        setStatusMessage('축하합니다! 모든 아군 요원을 구출하여 작전에 승리했습니다!');
        speech.speakText('축하합니다! 모든 요원을 구출하여 승리했습니다.');
        setStats(prev => ({ ...prev, endTime: Date.now() }));
        recordGameOutcome(true, nextCorrect);
        return;
      }

      const nextGuesses = guessesLeft - 1;
      setGuessesLeft(nextGuesses);

      if (nextGuesses <= 0) {
        setStatusMessage('정답! 이번 턴 지목 기회를 모두 사용했습니다. 상대 턴으로 넘어갑니다.');
        handleOpponentTurn(updatedCards, hintHistory);
      } else {
        setStatusMessage(
          `정답! "${targetCard.word}" 아군 요원 접선 성공! ${nextCombo >= 2 ? `(🔥 ${nextCombo}연속 적중!)` : ''} [남은 지목: ${nextGuesses}회]`
        );
      }
      return;
    }

    // 3. 상대 팀 카드 선택 -> 턴 종료
    if (targetCard.type === opponentTeam) {
      sound.playOpponentHit();
      setCombo(0);
      setStats(prev => ({ ...prev, wrongGuesses: prev.wrongGuesses + 1 }));
      setStatusMessage(`오답! 상대 팀 요원 "${targetCard.word}"입니다. 턴이 강제 종료됩니다.`);
      speech.speakText(`상대 팀 요원 ${targetCard.word}입니다. 턴이 종료됩니다.`);

      const remainingOpp = updatedCards.filter(c => c.type === opponentTeam && !c.revealed).length;
      if (remainingOpp === 0) {
        setWinner(opponentTeam);
        setPhase('gameover');
        sound.playAssassin();
        recordGameOutcome(false, stats.correctGuesses);
        return;
      }

      handleOpponentTurn(updatedCards, hintHistory);
      return;
    }

    // 4. 중립 민간인(Neutral) 선택 -> 턴 종료
    if (targetCard.type === 'neutral') {
      sound.playNeutral();
      setCombo(0);
      setStats(prev => ({ ...prev, wrongGuesses: prev.wrongGuesses + 1 }));
      setStatusMessage(`민간인 "${targetCard.word}"입니다. 턴이 종료됩니다.`);
      speech.speakText('민간인입니다. 턴이 종료됩니다.');
      handleOpponentTurn(updatedCards, hintHistory);
    }
  }, [phase, turn, guessesLeft, cards, playerTeam, opponentTeam, combo, stats.correctGuesses, hintHistory, handleOpponentTurn, recordGameOutcome]);

  // 단어명 또는 키워드로 카드 선택 (텍스트 입력 및 음성 인식용)
  const selectCardByWord = useCallback((wordInput: string) => {
    const cleaned = wordInput.trim().replace(/\s+/g, '');
    if (!cleaned) return false;

    const matched = cards.find(c => !c.revealed && c.word.replace(/\s+/g, '') === cleaned);
    if (matched) {
      selectCard(matched.id);
      return true;
    }

    const keywordMatched = cards.find(c => {
      if (c.revealed) return false;
      if (c.keywords && c.keywords.some(kw => kw.replace(/\s+/g, '') === cleaned || cleaned.includes(kw))) {
        return true;
      }
      return false;
    });

    if (keywordMatched) {
      selectCard(keywordMatched.id);
      return true;
    }

    const partialMatch = cards.find(c => !c.revealed && (cleaned.includes(c.word.replace(/\s+/g, '')) || c.word.replace(/\s+/g, '').includes(cleaned)));
    if (partialMatch) {
      selectCard(partialMatch.id);
      return true;
    }

    return false;
  }, [cards, selectCard]);

  // 턴 넘기기(Pass)
  const passTurn = useCallback(() => {
    if (phase !== 'playing' || turn !== 'player_turn') return;
    sound.playHover();
    setStatusMessage('턴을 넘겼습니다. 상대 팀의 턴입니다.');
    handleOpponentTurn(cards, hintHistory);
  }, [phase, turn, cards, hintHistory, handleOpponentTurn]);

  // 음성 인식 토글
  const toggleVoiceInput = useCallback(() => {
    if (isListening) {
      speech.stopListening();
      setIsListening(false);
      return;
    }

    setVoiceError(null);
    speech.startListening(
      (recognizedText) => {
        setIsListening(false);
        const success = selectCardByWord(recognizedText);
        if (!success) {
          setStatusMessage(`음성 인식: "${recognizedText}" (보드에서 해당 미공개 카드를 찾을 수 없습니다)`);
        }
      },
      (listening) => setIsListening(listening),
      (err) => {
        setVoiceError(err);
        setIsListening(false);
      }
    );
  }, [isListening, selectCardByWord]);

  // 새 게임 준비
  const resetToSetup = useCallback(() => {
    hasTriggeredFirstHint.current = false;
    speech.cancelSpeech();
    setPhase('setup');
    setWinner(null);
  }, []);

  return {
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
  };
}
