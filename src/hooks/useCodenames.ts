import { useState, useEffect, useCallback, useRef } from 'react';
import { CardItem, CardType, Difficulty, GamePhase, GameStats, Hint, TeamColor, TurnPhase } from '../types/game';
import { ALL_CODENAME_WORDS } from '../data/words';
import { generateSpymasterHint } from '../utils/spymasterAi';
import { sound } from '../utils/audio';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';

const RECENT_WORDS_KEY = 'codenames_recent_words';

export function useCodenames() {
  const [phase, setPhase] = useState<GamePhase>('setup');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [playerTeam, setPlayerTeam] = useState<TeamColor>('red');
  const [cards, setCards] = useState<CardItem[]>([]);
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

  const [stats, setStats] = useState<GameStats>({
    turnsTaken: 0,
    correctGuesses: 0,
    wrongGuesses: 0,
    startTime: Date.now(),
  });

  // 사운드/TTS 설정 동기화
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    speech.ttsEnabled = ttsEnabled;
  }, [ttsEnabled]);

  // 남은 카드 개수 계산
  const opponentTeam: TeamColor = playerTeam === 'red' ? 'blue' : 'red';
  const playerRemaining = cards.filter(c => c.type === playerTeam && !c.revealed).length;
  const opponentRemaining = cards.filter(c => c.type === opponentTeam && !c.revealed).length;

  // 최근 사용된 단어들 피해서 25장 무작위 카드 추출
  const pick25Words = useCallback((): string[] => {
    let recentWords: string[] = [];
    try {
      const stored = sessionStorage.getItem(RECENT_WORDS_KEY);
      if (stored) recentWords = JSON.parse(stored);
    } catch {
      recentWords = [];
    }

    // 최근 단어가 아닌 단어 우선 선별
    const freshWords = ALL_CODENAME_WORDS.filter(w => !recentWords.includes(w));
    let pool = [...freshWords];

    // 만약 남은 단어가 25개 미만이면 전체 풀 사용
    if (pool.length < 25) {
      pool = [...ALL_CODENAME_WORDS];
      recentWords = [];
    }

    // Fisher-Yates 셔플
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const selected = pool.slice(0, 25);

    // 최근 단어 히스토리 업데이트 (최대 50개 유지)
    try {
      const updated = Array.from(new Set([...selected, ...recentWords])).slice(0, 75);
      sessionStorage.setItem(RECENT_WORDS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    return selected;
  }, []);

  // 카드 섞고 게임 시작
  const startGame = useCallback((selectedDiff: Difficulty, selectedTeam: TeamColor) => {
    setIsShuffling(true);
    sound.playCardFlip();
    speech.cancelSpeech();

    setTimeout(() => {
      const words = pick25Words();

      // 플레이어 팀이 항상 선공(9장)으로 시작하여 주도적인 플레이 연습을 지원
      const types: CardType[] = [];
      for (let i = 0; i < 9; i++) types.push(selectedTeam);
      const otherTeam: CardType = selectedTeam === 'red' ? 'blue' : 'red';
      for (let i = 0; i < 8; i++) types.push(otherTeam);
      for (let i = 0; i < 7; i++) types.push('neutral');
      types.push('assassin'); // 1장

      // 타입 배열 셔플
      for (let i = types.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [types[i], types[j]] = [types[j], types[i]];
      }

      const initialCards: CardItem[] = words.map((word, idx) => ({
        id: idx,
        word,
        type: types[idx],
        revealed: false,
      }));

      setDifficulty(selectedDiff);
      setPlayerTeam(selectedTeam);
      setCards(initialCards);
      setWinner(null);
      setCurrentHint(null);
      setHintHistory([]);
      setGuessesLeft(0);
      setStats({
        turnsTaken: 1,
        correctGuesses: 0,
        wrongGuesses: 0,
        startTime: Date.now(),
      });

      setIsShuffling(false);
      setPhase('playing');
      setTurn('spymaster_thinking');
      setStatusMessage('스파이마스터 AI가 전술 키카드를 분석 중입니다...');
    }, 700);
  }, [pick25Words]);

  // 스파이마스터 AI 힌트 생성 트리거
  const triggerSpymasterHint = useCallback((currentCards: CardItem[]) => {
    setTurn('spymaster_thinking');
    setStatusMessage('팀장 AI가 최적의 힌트를 도출하고 있습니다...');

    setTimeout(() => {
      const hint = generateSpymasterHint(currentCards, playerTeam, difficulty);
      const hintWithTurn = { ...hint, turnNumber: stats.turnsTaken };
      setCurrentHint(hintWithTurn);
      setHintHistory(prev => [...prev, hintWithTurn]);
      const availableGuesses = hint.count + 1; // 코드네임 공식 규칙: 힌트 개수 + 1회까지 추측 가능
      setGuessesLeft(availableGuesses);
      setTurn('player_turn');
      setStatusMessage(`팀장 힌트: "${hint.word}" (${hint.count}장). 목표 카드를 지목하십시오.`);

      sound.playHintBeep();
      const teamLabel = playerTeam === 'red' ? '레드' : '블루';
      speech.speakHint(teamLabel, hint.word, hint.count);
    }, 300);
  }, [playerTeam, difficulty, stats.turnsTaken]);

  // 게임 시작 시 첫 번째 힌트 자동 생성
  const hasTriggeredFirstHint = useRef(false);
  useEffect(() => {
    if (phase === 'playing' && turn === 'spymaster_thinking' && !hasTriggeredFirstHint.current && cards.length > 0) {
      hasTriggeredFirstHint.current = true;
      triggerSpymasterHint(cards);
    }
  }, [phase, turn, cards, triggerSpymasterHint]);

  // 상대팀(AI) 턴 시뮬레이션
  const handleOpponentTurn = useCallback((updatedCards: CardItem[]) => {
    setTurn('opponent_turn');
    speech.cancelSpeech();
    setStatusMessage('상대 팀(AI)이 작전을 수행 중입니다...');

    const oppTeam = playerTeam === 'red' ? 'blue' : 'red';
    const oppCards = updatedCards.filter(c => c.type === oppTeam && !c.revealed);

    setTimeout(() => {
      if (oppCards.length === 0) {
        // 상대 승리
        setWinner(oppTeam);
        setPhase('gameover');
        sound.playAssassin();
        return;
      }

      // 난이도에 따른 상대팀 획득 카드 수
      let revealCount = 1;
      if (difficulty === 'hard' && Math.random() < 0.6 && oppCards.length >= 2) {
        revealCount = 2;
      } else if (difficulty === 'easy' && Math.random() < 0.4) {
        revealCount = 0; // 초급에서는 상대팀이 가끔 아무것도 못 맞춤
      }

      let nextCards = [...updatedCards];
      if (revealCount > 0) {
        const toReveal = oppCards.slice(0, revealCount);
        const revealIds = new Set(toReveal.map(c => c.id));
        nextCards = nextCards.map(c => revealIds.has(c.id) ? { ...c, revealed: true } : c);
        sound.playOpponentHit();
        setStatusMessage(`상대 팀이 요원 [${toReveal.map(c => c.word).join(', ')}]을(를) 확보했습니다!`);
      } else {
        setStatusMessage('상대 팀이 이번 턴에 요원을 확보하지 못했습니다.');
      }

      setCards(nextCards);

      // 상대팀 승리 여부 재확인
      const remainingOpp = nextCards.filter(c => c.type === oppTeam && !c.revealed).length;
      if (remainingOpp === 0) {
        setWinner(oppTeam);
        setPhase('gameover');
        sound.playAssassin();
        setStatusMessage('상대 팀이 모든 요원을 먼저 확보하여 작전에서 패배했습니다.');
        return;
      }

      // 다시 플레이어 턴으로 전환
      setTimeout(() => {
        setStats(prev => ({ ...prev, turnsTaken: prev.turnsTaken + 1 }));
        triggerSpymasterHint(nextCards);
      }, 1200);
    }, 1400);
  }, [playerTeam, difficulty, triggerSpymasterHint]);

  // 카드 선택 (지목) 처리
  const selectCard = useCallback((cardId: number) => {
    if (phase !== 'playing' || turn !== 'player_turn' || guessesLeft <= 0) return;

    const targetCard = cards.find(c => c.id === cardId);
    if (!targetCard || targetCard.revealed) return;

    sound.playCardFlip();

    const updatedCards = cards.map(c => c.id === cardId ? { ...c, revealed: true } : c);
    setCards(updatedCards);

    // 1. 암살자(Assassin) 밟음 -> 즉시 패배
    if (targetCard.type === 'assassin') {
      sound.playAssassin();
      setWinner('assassin_loss');
      setPhase('gameover');
      setStatusMessage(`암살자 [${targetCard.word}] 카드를 건드렸습니다! 작전 실패 (게임 오버)`);
      speech.speakText("암살자 카드를 건드렸습니다. 작전 실패입니다.");
      setStats(prev => ({ ...prev, wrongGuesses: prev.wrongGuesses + 1, endTime: Date.now() }));
      return;
    }

    // 2. 우리 팀 카드 적중!
    if (targetCard.type === playerTeam) {
      sound.playCorrect();
      setStats(prev => ({ ...prev, correctGuesses: prev.correctGuesses + 1 }));

      const remainingTeam = updatedCards.filter(c => c.type === playerTeam && !c.revealed).length;
      if (remainingTeam === 0) {
        // 플레이어 승리!
        setWinner(playerTeam);
        setPhase('gameover');
        sound.playVictory();
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 }
        });
        setStatusMessage('축하합니다! 모든 아군 요원을 구출하여 작전에 승리했습니다!');
        speech.speakText("축하합니다! 모든 요원을 구출하여 승리했습니다.");
        setStats(prev => ({ ...prev, endTime: Date.now() }));
        return;
      }

      const nextGuesses = guessesLeft - 1;
      setGuessesLeft(nextGuesses);

      if (nextGuesses <= 0) {
        setStatusMessage(`정답! 지목 기회를 모두 소진했습니다. 상대 턴으로 넘어갑니다.`);
        handleOpponentTurn(updatedCards);
      } else {
        setStatusMessage(`정답입니다! "${targetCard.word}"는 아군 요원입니다. (남은 지목 기회: ${nextGuesses}회)`);
      }
      return;
    }

    // 3. 상대 팀 카드 선택 -> 턴 종료 & 상대 점수
    if (targetCard.type === opponentTeam) {
      sound.playOpponentHit();
      setStats(prev => ({ ...prev, wrongGuesses: prev.wrongGuesses + 1 }));
      setStatusMessage(`오답! 상대 팀 카드 "${targetCard.word}"를 밝혔습니다. 턴이 강제 종료됩니다.`);
      speech.speakText(`상대 팀 요원 ${targetCard.word}입니다. 턴이 종료됩니다.`);

      const remainingOpp = updatedCards.filter(c => c.type === opponentTeam && !c.revealed).length;
      if (remainingOpp === 0) {
        setWinner(opponentTeam);
        setPhase('gameover');
        sound.playAssassin();
        return;
      }

      handleOpponentTurn(updatedCards);
      return;
    }

    // 4. 중립 민간인(Neutral) 선택 -> 턴 종료
    if (targetCard.type === 'neutral') {
      sound.playNeutral();
      setStats(prev => ({ ...prev, wrongGuesses: prev.wrongGuesses + 1 }));
      setStatusMessage(`민간인 "${targetCard.word}"입니다. 턴이 종료됩니다.`);
      speech.speakText(`민간인입니다. 턴이 종료됩니다.`);
      handleOpponentTurn(updatedCards);
    }
  }, [phase, turn, guessesLeft, cards, playerTeam, opponentTeam, handleOpponentTurn]);

  // 단어명으로 카드 선택 (텍스트 입력 및 음성 인식용)
  const selectCardByWord = useCallback((wordInput: string) => {
    const cleaned = wordInput.trim().replace(/\s+/g, '');
    if (!cleaned) return false;

    const matched = cards.find(c => !c.revealed && c.word.replace(/\s+/g, '') === cleaned);
    if (matched) {
      selectCard(matched.id);
      return true;
    }

    // 부분 일치 탐색 (예: "사과야" -> "사과")
    const partialMatch = cards.find(c => !c.revealed && (cleaned.includes(c.word) || c.word.includes(cleaned)));
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
    handleOpponentTurn(cards);
  }, [phase, turn, cards, handleOpponentTurn]);

  // 음성 인식 시작 토글
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
  };
}
