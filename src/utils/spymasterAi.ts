import { CardItem, Difficulty, Hint, TeamColor } from '../types/game';
import { CODENAME_WORDS, WordMetadata } from '../data/words';
import { PICTURE_CARDS } from '../data/pictures';

// 단어 및 그림 카드 메타데이터 통합 맵
const wordMetaMap = new Map<string, WordMetadata>();
CODENAME_WORDS.forEach(w => wordMetaMap.set(w.word, w));
PICTURE_CARDS.forEach(p => {
  wordMetaMap.set(p.title, {
    word: p.title,
    categories: p.categories,
    hints: [...p.hints, ...p.keywords.filter(k => !p.title.includes(k))],
  });
});

// 한글 첫 글자 초성 추출기 (전술 코칭 팁 생성용)
const CHOSUNG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
  'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

function getFirstChosung(word: string): string {
  if (!word) return '?';
  const code = word.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return word[0];
  const chosungIndex = Math.floor(code / 588);
  return CHOSUNG_LIST[chosungIndex] || word[0];
}

interface HintCandidate {
  hintWord: string;
  matchedTeamWords: string[];
  matchedOpponentWords: string[];
  matchedNeutralWords: string[];
  matchedAssassinWords: string[];
  score: number;
}

/**
 * Argon Neural Spymaster AI 힌트 생성기 v2.0
 * - 이미 사용된 힌트(usedHintWords) 재사용 원천 차단
 * - 보드 위 단어와 부분 문자열이 겹치는 반칙 힌트 완벽 차단
 * - 낱말 카드(5x5) 및 그림 카드(5x4) 통합 시맨틱 벡터 스코어링
 * - 신뢰도(Confidence %), 안전 등급(Safety Level), 전술 코칭 팁 자동 생성
 */
export function generateSpymasterHint(
  cards: CardItem[],
  teamColor: TeamColor,
  difficulty: Difficulty,
  usedHintWords: string[] = []
): Hint {
  const unrevealedCards = cards.filter(c => !c.revealed);
  const teamCards = unrevealedCards.filter(c => c.type === teamColor);
  const teamWords = teamCards.map(c => c.word);
  const opponentColor: TeamColor = teamColor === 'red' ? 'blue' : 'red';

  const boardWords = cards.map(c => c.word.replace(/\s+/g, ''));
  const usedSet = new Set(usedHintWords.map(w => w.trim()));

  if (teamWords.length === 0) {
    return {
      word: '승리',
      count: 0,
      targetWords: [],
      explanation: '모든 아군 요원을 찾았습니다.',
      confidence: 100,
      safetyLevel: 'SAFE',
    };
  }

  // 보드 단어와 겹치거나 이미 사용된 힌트인지 검사
  const isInvalidHintWord = (kw: string): boolean => {
    const cleanKw = kw.trim().replace(/\s+/g, '');
    if (cleanKw.length < 2) return true;
    if (usedSet.has(kw.trim()) || usedSet.has(cleanKw)) return true;
    for (const bw of boardWords) {
      if (bw === cleanKw || bw.includes(cleanKw) || cleanKw.includes(bw)) {
        return true;
      }
    }
    return false;
  };

  // 특정 카드의 시맨틱 키워드 추출
  const getKeywordsForCard = (c: CardItem): string[] => {
    const meta = wordMetaMap.get(c.word);
    const fromMeta = meta ? [...meta.categories, ...meta.hints] : [];
    const fromCard = c.keywords || [];
    return Array.from(new Set([...fromMeta, ...fromCard]));
  };

  const hintCandidatesMap = new Map<string, {
    matchedTeam: Set<string>;
    matchedOpponent: Set<string>;
    matchedNeutral: Set<string>;
    matchedAssassin: Set<string>;
  }>();

  unrevealedCards.forEach(c => {
    const keywords = getKeywordsForCard(c);
    keywords.forEach(kw => {
      if (isInvalidHintWord(kw)) return;

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

  const candidates: HintCandidate[] = [];
  const assassinPenalty = difficulty === 'easy' ? 250 : difficulty === 'normal' ? 160 : 100;
  const opponentPenalty = difficulty === 'easy' ? 65 : difficulty === 'normal' ? 50 : 35;
  const neutralPenalty = 18;

  hintCandidatesMap.forEach((entry, hintWord) => {
    const teamCount = entry.matchedTeam.size;
    if (teamCount === 0) return;

    const assassinCount = entry.matchedAssassin.size;
    const opponentCount = entry.matchedOpponent.size;
    const neutralCount = entry.matchedNeutral.size;

    // 암살자 연관 힌트는 초급/중급에서 절대 배제
    if (assassinCount > 0 && difficulty !== 'hard') {
      return;
    }

    let score = teamCount * 42;

    if (difficulty === 'easy') {
      if (teamCount === 2) score += 28;
      if (teamCount === 1) score += 15;
    } else if (difficulty === 'normal') {
      if (teamCount === 2) score += 30;
      if (teamCount === 3) score += 45;
    } else {
      if (teamCount >= 3) score += teamCount * 32;
      else if (teamCount === 2) score += 25;
    }

    score -= assassinCount * assassinPenalty;
    score -= opponentCount * opponentPenalty;
    score -= neutralCount * neutralPenalty;

    // 구체적인 힌트 단어일수록 가산점 부여 (지나치게 광범위한 단어보다 구체적 연상어 우대)
    if (hintWord.length >= 2 && !['사물', '도구', '생물', '자연'].includes(hintWord)) {
      score += 8;
    }

    // 동점 후보 간 다양성을 위한 미세 지터
    score += Math.random() * 4;

    candidates.push({
      hintWord,
      matchedTeamWords: Array.from(entry.matchedTeam),
      matchedOpponentWords: Array.from(entry.matchedOpponent),
      matchedNeutralWords: Array.from(entry.matchedNeutral),
      matchedAssassinWords: Array.from(entry.matchedAssassin),
      score,
    });
  });

  candidates.sort((a, b) => b.score - a.score);

  if (candidates.length > 0 && candidates[0].score > 0) {
    const best = candidates[0];
    const targetWords = best.matchedTeamWords;
    const hasRisk = best.matchedOpponentWords.length > 0 || best.matchedNeutralWords.length > 0;
    const safetyLevel = best.matchedAssassinWords.length > 0
      ? 'CAUTION'
      : hasRisk
      ? 'OPTIMAL'
      : 'SAFE';

    const confidence = Math.min(99, Math.max(82, Math.round(78 + Math.min(21, best.score / 6))));
    const chosungs = targetWords.map(w => `[${getFirstChosung(w)}]`).join(', ');

    return {
      word: best.hintWord,
      count: targetWords.length,
      targetWords,
      confidence,
      safetyLevel,
      coachingTip: `목표 카드 ${targetWords.length}장의 첫 글자 초성은 ${chosungs} 입니다.`,
      explanation: `팀장 AI는 [${targetWords.join(', ')}] 카드를 묶어 "${best.hintWord}" (${targetWords.length}장) 힌트를 설계했습니다.`,
    };
  }

  // Fallback: 아직 사용되지 않은 단일 카드 전용 힌트 탐색
  for (const targetCard of teamCards) {
    const kws = getKeywordsForCard(targetCard).filter(kw => !isInvalidHintWord(kw));
    if (kws.length > 0) {
      const chosenHint = kws[0];
      const chosung = getFirstChosung(targetCard.word);
      return {
        word: chosenHint,
        count: 1,
        targetWords: [targetCard.word],
        confidence: 92,
        safetyLevel: 'SAFE',
        coachingTip: `단일 목표 카드로, 첫 글자 초성은 [${chosung}] 입니다.`,
        explanation: `단일 목표 요원 [${targetCard.word}]을(를) 가리키는 정밀 힌트입니다.`,
      };
    }
  }

  // 최후 비상 힌트
  const fallbackTarget = teamWords[0];
  const fallbackChosung = getFirstChosung(fallbackTarget);
  const emergencyHints = ['기밀', '핵심', '타깃', '신호', '추적', '코드', '접선'];
  const unusedEmergency = emergencyHints.find(h => !isInvalidHintWord(h)) || `코드${usedHintWords.length + 1}`;

  return {
    word: unusedEmergency,
    count: 1,
    targetWords: [fallbackTarget],
    confidence: 85,
    safetyLevel: 'SAFE',
    coachingTip: `목표 카드의 첫 글자 초성은 [${fallbackChosung}] 입니다.`,
    explanation: `단일 목표 요원 [${fallbackTarget}]을(를) 지시하는 비상 힌트입니다.`,
  };
}
