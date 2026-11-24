import { CardItem, Difficulty, Hint, TeamColor } from '../types/game';
import { CODENAME_WORDS, WordMetadata } from '../data/words';

// 단어 메타데이터 맵 빠른 검색용
const wordMetaMap = new Map<string, WordMetadata>();
CODENAME_WORDS.forEach(w => wordMetaMap.set(w.word, w));

// 힌트 후보군 평가 점수
interface HintCandidate {
  hintWord: string;
  matchedTeamWords: string[];
  matchedOpponentWords: string[];
  matchedNeutralWords: string[];
  matchedAssassinWords: string[];
  score: number;
}

/**
 * 지능형 스파이마스터 AI 힌트 생성기
 * - 플레이어 팀의 남은 카드를 최대 2~3장 연결하는 힌트를 도출
 * - 암살자(Assassin) 및 상대팀(Opponent) 카드와 겹치지 않도록 엄격한 패널티 적용
 * - 현재 보드에 올라와 있는 25개 단어 자체는 힌트로 사용하지 않음 (공식 룰)
 */
export function generateSpymasterHint(
  cards: CardItem[],
  teamColor: TeamColor,
  difficulty: Difficulty
): Hint {
  // 1. 현재 테이블 상태 분류
  const unrevealedCards = cards.filter(c => !c.revealed);
  const teamWords = unrevealedCards.filter(c => c.type === teamColor).map(c => c.word);
  const opponentColor: TeamColor = teamColor === 'red' ? 'blue' : 'red';

  const boardWords = new Set(cards.map(c => c.word));

  // 팀 카드가 없으면 기본 완료 처리
  if (teamWords.length === 0) {
    return { word: "승리", count: 0, targetWords: [], explanation: "모든 아군 요원을 찾았습니다." };
  }

  // 2. 아군 단어들이 보유한 카테고리와 힌트 키워드 수집
  const hintCandidatesMap = new Map<string, {
    matchedTeam: Set<string>;
    matchedOpponent: Set<string>;
    matchedNeutral: Set<string>;
    matchedAssassin: Set<string>;
  }>();

  // 특정 단어와 힌트의 연관성 검사 함수
  const getKeywordsForWord = (word: string): string[] => {
    const meta = wordMetaMap.get(word);
    if (!meta) return [];
    return [...meta.categories, ...meta.hints];
  };

  // 모든 보드 위 단어들의 키워드 사전 인덱싱
  unrevealedCards.forEach(c => {
    const keywords = getKeywordsForWord(c.word);
    keywords.forEach(kw => {
      // 힌트 후보가 보드판에 있는 단어와 같거나 포함되면 금지 (코드네임 정식 규칙)
      if (boardWords.has(kw) || kw.length < 2) return;

      if (!hintCandidatesMap.has(kw)) {
        hintCandidatesMap.set(kw, {
          matchedTeam: new Set(),
          matchedOpponent: new Set(),
          matchedNeutral: new Set(),
          matchedAssassin: new Set(),
        });
      }

      const entry = hintCandidatesMap.get(kw)!;
      if (c.type === teamColor) {
        entry.matchedTeam.add(c.word);
      } else if (c.type === opponentColor) {
        entry.matchedOpponent.add(c.word);
      } else if (c.type === 'neutral') {
        entry.matchedNeutral.add(c.word);
      } else if (c.type === 'assassin') {
        entry.matchedAssassin.add(c.word);
      }
    });
  });

  // 3. 각 힌트 후보 채점 (난이도 반영)
  const candidates: HintCandidate[] = [];

  const assassinPenalty = difficulty === 'easy' ? 200 : difficulty === 'normal' ? 120 : 80;
  const opponentPenalty = difficulty === 'easy' ? 60 : difficulty === 'normal' ? 45 : 30;
  const neutralPenalty = 15;

  hintCandidatesMap.forEach((entry, hintWord) => {
    const teamCount = entry.matchedTeam.size;
    if (teamCount === 0) return;

    const assassinCount = entry.matchedAssassin.size;
    const opponentCount = entry.matchedOpponent.size;
    const neutralCount = entry.matchedNeutral.size;

    // 만약 암살자와 연관되어 있다면 절대 추천하지 않음 (쉬움/보통에서는 1개라도 걸리면 즉시 제외)
    if (assassinCount > 0 && difficulty !== 'hard') {
      return;
    }

    // 기본 점수: 아군 일치 단어 수 기반
    let score = teamCount * 40;

    // 난이도별 타깃 카드 수 가중치
    if (difficulty === 'easy') {
      // 초급: 2개 연결을 가장 안정적으로 선호
      if (teamCount === 2) score += 25;
      if (teamCount > 2) score += 10;
    } else if (difficulty === 'normal') {
      // 중급: 2~3개 연결 선호
      if (teamCount >= 2) score += teamCount * 15;
    } else {
      // 고급: 3개 이상의 다중 연결 적극 선호
      if (teamCount >= 3) score += teamCount * 30;
    }

    // 페널티 적용
    score -= (assassinCount * assassinPenalty);
    score -= (opponentCount * opponentPenalty);
    score -= (neutralCount * neutralPenalty);

    candidates.push({
      hintWord,
      matchedTeamWords: Array.from(entry.matchedTeam),
      matchedOpponentWords: Array.from(entry.matchedOpponent),
      matchedNeutralWords: Array.from(entry.matchedNeutral),
      matchedAssassinWords: Array.from(entry.matchedAssassin),
      score,
    });
  });

  // 4. 점수순 정렬
  candidates.sort((a, b) => b.score - a.score);

  // 5. 최적의 후보 선정
  if (candidates.length > 0 && candidates[0].score > 0) {
    const best = candidates[0];
    const targetWords = best.matchedTeamWords;
    return {
      word: best.hintWord,
      count: targetWords.length,
      targetWords: targetWords,
      explanation: `팀장 AI는 [${targetWords.join(', ')}]을(를) 목표로 "${best.hintWord}" 힌트를 지시했습니다.`
    };
  }

  // 매칭 후보가 마땅치 않을 때 비상 힌트 (남은 팀 단어 1개와 직결되는 단어)
  const singleFallback = teamWords[0];
  const meta = wordMetaMap.get(singleFallback);
  const safeHint = meta && meta.hints.length > 0 ? meta.hints[0] : "작전";

  return {
    word: safeHint,
    count: 1,
    targetWords: [singleFallback],
    explanation: `단일 목표 요원 [${singleFallback}]을(를) 가리키는 힌트입니다.`
  };
}
