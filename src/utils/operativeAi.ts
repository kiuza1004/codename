import { CardItem, Difficulty } from '../types/game';
import { CODENAME_WORDS, WordMetadata } from '../data/words';
import { PICTURE_CARDS } from '../data/pictures';

// 단어 메타데이터 맵 구축
const wordMetaMap = new Map<string, WordMetadata>();
CODENAME_WORDS.forEach(w => wordMetaMap.set(w.word, w));
PICTURE_CARDS.forEach(p => {
  wordMetaMap.set(p.title, {
    word: p.title,
    categories: p.categories,
    hints: [...p.hints, ...p.keywords.filter(k => !p.title.includes(k))],
  });
});

export interface DeductionResult {
  card: CardItem;
  score: number;
  reason: string;
}

/**
 * 🕵️‍♂️ AI 요원(Operative) 인간형 시맨틱 추리 엔진
 * - 팀장이 제시한 힌트 단어(hintWord)를 기반으로 보드의 미공개 카드를 자율 추리
 * - 키카드(정답)를 미리 알지 못하며, 오직 의미적 연관도와 연상 관계만으로 추론
 * - 민간인/상대팀/암살자 카드도 힌트와 연관성이 높으면 실수로 지목할 수 있음 (실제 인간 플레이어 시뮬레이션)
 */
export function deduceBestCards(
  hintWord: string,
  unrevealedCards: CardItem[],
  difficulty: Difficulty = 'normal'
): DeductionResult[] {
  if (!hintWord || unrevealedCards.length === 0) return [];

  const cleanHint = hintWord.trim().replace(/\s+/g, '').toLowerCase();

  const scoredCards: DeductionResult[] = unrevealedCards.map(card => {
    const meta = wordMetaMap.get(card.word);
    const categories = meta ? meta.categories : [];
    const hints = meta ? meta.hints : [];
    const keywords = card.keywords || [];
    const allKeywords = Array.from(new Set([...categories, ...hints, ...keywords]));

    let score = 0;
    let matchReason = '';

    // 1. 단어명 직접 일치/포함 (완전 일치 또는 부분 포함)
    const cardCleanWord = card.word.replace(/\s+/g, '').toLowerCase();
    if (cardCleanWord === cleanHint) {
      score += 120;
      matchReason = `"${cleanHint}"와(과) 단어가 직접 일치합니다.`;
    } else if (cardCleanWord.includes(cleanHint) || cleanHint.includes(cardCleanWord)) {
      score += 75;
      matchReason = `"${cleanHint}" 단어명을 직접 포함하고 있습니다.`;
    }

    // 2. 카테고리(분류) 일치 검사
    for (const cat of categories) {
      const cleanCat = cat.replace(/\s+/g, '').toLowerCase();
      if (cleanCat === cleanHint) {
        score += 100;
        matchReason = `"${cleanHint}" 범주(카테고리)에 직접 속합니다.`;
        break;
      } else if (cleanCat.includes(cleanHint) || cleanHint.includes(cleanCat)) {
        score += 65;
        matchReason = `"${cleanHint}" 범주와 밀접한 연관이 있습니다.`;
        break;
      }
    }

    // 3. 연관어 및 힌트 키워드 일치 검사
    for (const kw of allKeywords) {
      const cleanKw = kw.replace(/\s+/g, '').toLowerCase();
      if (cleanKw === cleanHint) {
        score += 85;
        if (!matchReason) matchReason = `"${cleanHint}" 연상 키워드와 직접 연결됩니다.`;
        break;
      } else if (cleanKw.includes(cleanHint) || cleanHint.includes(cleanKw)) {
        score += 45;
        if (!matchReason) matchReason = `"${cleanHint}" 관련 의미를 내포하고 있습니다.`;
        break;
      }
    }

    // 4. 글자 공통 자모/음절 유사도 (초성 및 공통 글자)
    for (let i = 0; i < cleanHint.length; i++) {
      const char = cleanHint[i];
      if (cardCleanWord.includes(char)) {
        score += 8;
      }
    }

    // 5. 난이도별 인간형 실수/지터 (Jitter) 부여
    const jitterFactor = difficulty === 'hard' ? 2 : difficulty === 'normal' ? 8 : 15;
    score += (Math.random() * jitterFactor) - (jitterFactor / 2);

    if (!matchReason) {
      if (score > 20) {
        matchReason = `"${cleanHint}"와(과) 간접적인 연관성이 감지되었습니다.`;
      } else {
        matchReason = `"${cleanHint}"와(과) 연관성이 매우 희박합니다.`;
      }
    }

    return {
      card,
      score: Math.max(0, Math.round(score)),
      reason: matchReason,
    };
  });

  // 점수가 높은 순으로 정렬
  scoredCards.sort((a, b) => b.score - a.score);

  return scoredCards;
}
