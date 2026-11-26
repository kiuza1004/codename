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
const RECENT_PICS_KEY = 'codenames_recent_pictures';

export interface UseCodenamesOptions {
  isHumanSpymaster?: boolean;
}

export function useCodenames(options: UseCodenamesOptions = {}) {
  const [isHumanSpymaster, setIsHumanSpymaster] = useState<boolean>(options.isHumanSpymaster || false);

  useEffect(() => {
    if (typeof options.isHumanSpymaster === 'boolean') {
      setIsHumanSpymaster(options.isHumanSpymaster);
    }
  }, [options.isHumanSpymaster]);

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
  const [targetingCardId, setTargetingCardId] = useState<number | null>(null);
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

  // 최근 사용된 그림 카드를 피해서 100장 중 20장 무작위 추출
  const pick20Pictures = useCallback(() => {
    let recentPicIds: string[] = [];
    try {
      const stored = sessionStorage.getItem(RECENT_PICS_KEY);
      if (stored) recentPicIds = JSON.parse(stored);
    } catch {
      recentPicIds = [];
    }

    const freshPics = PICTURE_CARDS.filter(p => !recentPicIds.includes(p.id));
    let pool = [...freshPics];

    if (pool.length < 20) {
      pool = [...PICTURE_CARDS];
      recentPicIds = [];
    }

    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const selected = pool.slice(0, 20);

    try {
      const updated = Array.from(new Set([...selected.map(p => p.id), ...recentPicIds])).slice(0, 60);
      sessionStorage.setItem(RECENT_PICS_KEY, JSON.stringify(updated));
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
        const selectedPics = pick20Pictures();

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
      setTargetingCardId(null);
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
  }, [pick25Words, pick20Pictures]);

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
      setStatusMessage(`목표 카드(${hint.count}장)를 지목하십시오.`);

      sound.playHintBeep();
      const teamLabel = playerTeam === 'red' ? '레드' : '블루';
      speech.speakHint(teamLabel, hint.word, hint.count);
    }, 300);
  }, [playerTeam, difficulty]);

  // 게임 시작 시 첫 번째 힌트 처리 (인간 팀장일 경우 직접 입력 대기, AI 팀장일 경우 자동 연산)
  const hasTriggeredFirstHint = useRef(false);
  useEffect(() => {
    if (phase === 'playing' && turn === 'spymaster_thinking' && !hasTriggeredFirstHint.current && cards.length > 0) {
      hasTriggeredFirstHint.current = true;
      if (isHumanSpymaster) {
        setStatusMessage('팀장 작전 지령실: 암호 힌트와 목표 카드 수를 입력하고 [지령 전송]을 누르십시오.');
      } else {
        triggerSpymasterHint(cards, []);
      }
    }
  }, [phase, turn, cards, triggerSpymasterHint, isHumanSpymaster]);

  // 상대팀(AI) 턴 시뮬레이션: 상대 팀장 힌트 제시 및 상대 요원의 답 맞추기 과정 순차 연출 (1~2초 숙지 및 조준 과정)
  const handleOpponentTurn = useCallback((updatedCards: CardItem[], currentHistory: Hint[]) => {
    setTurn('opponent_turn');
    setCombo(0);
    setTargetingCardId(null);
    speech.cancelSpeech();

    const oppTeam: TeamColor = playerTeam === 'red' ? 'blue' : 'red';
    const oppTeamLabel = oppTeam === 'red' ? '레드' : '블루';
    const oppCards = updatedCards.filter(c => c.type === oppTeam && !c.revealed);

    if (oppCards.length === 0) {
      setWinner(oppTeam);
      setPhase('gameover');
      sound.playAssassin();
      recordGameOutcome(false, stats.correctGuesses);
      return;
    }

    // 1단계: 상대 팀장 AI 힌트 연산 및 브리핑
    setStatusMessage(`상대(${oppTeamLabel}) 팀장 AI가 전술 키카드를 분석 중입니다...`);

    setTimeout(() => {
      const usedWords = currentHistory.map(h => h.word);
      const oppHint = generateSpymasterHint(updatedCards, oppTeam, difficulty, usedWords);
      const oppHintWithTurn = { ...oppHint, turnNumber: currentHistory.length + 1 };
      
      setCurrentHint(oppHintWithTurn);
      const nextHistory = [...currentHistory, oppHintWithTurn];
      setHintHistory(nextHistory);
      
      sound.playHintBeep();
      speech.speakHint(oppTeamLabel, oppHint.word, oppHint.count);
      setStatusMessage(`상대(${oppTeamLabel}) 팀장 힌트: "${oppHint.word}" (${oppHint.count}장)`);

      // 2단계: 사용자가 힌트 단어와 숫자를 충분히 볼 수 있도록 2.2초 대기 후 요원 추리 시작
      setTimeout(() => {
        // 상대가 맞출 카드 목록 결정 (유도 타깃 또는 상대 카드 중)
        let targetWordsToPick = oppHint.targetWords && oppHint.targetWords.length > 0
          ? oppHint.targetWords.filter(w => updatedCards.some(c => c.word === w && !c.revealed))
          : [];

        if (targetWordsToPick.length === 0) {
          targetWordsToPick = oppCards.map(c => c.word);
        }

        // 난이도별 지목 수량
        let pickCount = Math.min(oppHint.count, targetWordsToPick.length);
        if (difficulty === 'easy' && Math.random() < 0.3) pickCount = Math.max(1, pickCount - 1);
        if (difficulty === 'hard' && Math.random() < 0.4 && oppCards.length >= pickCount + 1) pickCount += 1;

        const wordsToReveal = targetWordsToPick.slice(0, pickCount);

        if (wordsToReveal.length === 0) {
          setStatusMessage(`상대 요원이 이번 턴에 확실한 카드를 찾지 못해 턴을 넘겼습니다.`);
          setTimeout(() => {
            setStats(prev => ({ ...prev, turnsTaken: prev.turnsTaken + 1 }));
            triggerSpymasterHint(updatedCards, nextHistory);
          }, 2000);
          return;
        }

        setStatusMessage(`상대 요원이 "${oppHint.word}" 힌트를 수신하고 목표 카드를 탐색 중입니다...`);

        // 카드를 1장씩 순차적으로 조준(Targeting 1.5초) -> 지목(Reveal) -> 다음(1.6초) 과정 연출
        let currentBoardCards = [...updatedCards];
        let pickIndex = 0;

        const stepTargetCard = () => {
          if (pickIndex >= wordsToReveal.length) {
            // 모든 지목 완료 -> 아군 턴으로 복귀
            setTargetingCardId(null);
            const remaining = currentBoardCards.filter(c => c.type === oppTeam && !c.revealed).length;
            if (remaining === 0) {
              setWinner(oppTeam);
              setPhase('gameover');
              sound.playAssassin();
              setStatusMessage(`상대 팀이 모든 요원을 먼저 확보하여 작전에서 패배했습니다.`);
              recordGameOutcome(false, stats.correctGuesses);
              return;
            }

            if (isHumanSpymaster) {
              setStatusMessage(`상대 팀 작전 종료. 팀장님, 아군 요원에게 내릴 암호 지령을 입력하십시오.`);
              setTimeout(() => {
                setStats(prev => ({ ...prev, turnsTaken: prev.turnsTaken + 1 }));
                setTurn('spymaster_thinking');
              }, 1500);
            } else {
              setStatusMessage(`상대 팀의 작전이 완료되었습니다. 아군 팀장 AI가 다음 지령을 연산 중입니다...`);
              setTimeout(() => {
                setStats(prev => ({ ...prev, turnsTaken: prev.turnsTaken + 1 }));
                triggerSpymasterHint(currentBoardCards, nextHistory);
              }, 2000);
            }
            return;
          }

          const targetWord = wordsToReveal[pickIndex];
          const cardToReveal = currentBoardCards.find(c => c.word === targetWord && !c.revealed);

          if (!cardToReveal) {
            pickIndex++;
            setTimeout(stepTargetCard, 800);
            return;
          }

          // [과정 1]: AI 요원이 후보 카드를 조준(Targeting)하여 1.5초간 보드에 강조 표시
          setTargetingCardId(cardToReveal.id);
          setStatusMessage(`상대 요원이 [${cardToReveal.word}] 카드를 목표로 검토 중입니다... (${pickIndex + 1}/${wordsToReveal.length})`);

          // [과정 2]: 1.5초 고민 후 카드 확정 지목 및 뒤집기
          setTimeout(() => {
            setTargetingCardId(null);
            currentBoardCards = currentBoardCards.map(c =>
              c.id === cardToReveal.id
                ? { ...c, revealed: true, marked: false, revealedBy: 'opponent' as const }
                : c
            );
            setCards(currentBoardCards);
            sound.playCardFlip();
            sound.playOpponentHit();
            setStatusMessage(`상대 요원이 [${cardToReveal.word}] 요원을 확보했습니다! (${pickIndex + 1}/${wordsToReveal.length})`);

            pickIndex++;
            // [과정 3]: 다음 카드 탐색 전 1.6초 여유
            setTimeout(stepTargetCard, 1600);
          }, 1500);
        };

        // 힌트 숙지 후 첫 번째 카드 조준 시작
        setTimeout(stepTargetCard, 1400);

      }, 2200);
    }, 1800);
  }, [playerTeam, difficulty, triggerSpymasterHint, recordGameOutcome, stats.correctGuesses, isHumanSpymaster]);

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

  // 멀티플레이 보드 상태 외부 동기화 주입
  const syncBoardState = useCallback((newCards: CardItem[], newMode: GameMode, newTurn: TurnPhase, newHint: Hint | null) => {
    setCards(newCards);
    setGameMode(newMode);
    setTurn(newTurn);
    setPhase('playing');
    if (newHint) {
      setCurrentHint(newHint);
      setHintHistory(prev => [...prev.filter(h => h.word !== newHint.word), newHint]);
      setGuessesLeft(newHint.count + 1);
    }
  }, []);

  // 외부(원격 플레이어/팀장)에서 힌트 제출 시 적용
  const applySpymasterHint = useCallback((hint: Hint) => {
    setCurrentHint(hint);
    setHintHistory(prev => [...prev, hint]);
    setGuessesLeft(hint.count + 1);
    setTurn('player_turn');
    setStatusMessage(`목표 카드(${hint.count}장)를 지목하십시오.`);
    sound.playHintBeep();
    speech.speakHint(playerTeam === 'red' ? '레드' : '블루', hint.word, hint.count);
  }, [playerTeam]);

  // 팀장을 위한 AI 추천 힌트 도출 헬퍼
  const getAiSuggestedHint = useCallback((): Hint | null => {
    if (cards.length === 0) return null;
    const usedWords = hintHistory.map(h => h.word);
    return generateSpymasterHint(cards, playerTeam, difficulty, usedWords);
  }, [cards, playerTeam, difficulty, hintHistory]);

  // 새 게임 준비
  const resetToSetup = useCallback(() => {
    hasTriggeredFirstHint.current = false;
    speech.cancelSpeech();
    setTargetingCardId(null);
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
    isHumanSpymaster,
    setIsHumanSpymaster,
  };
}
