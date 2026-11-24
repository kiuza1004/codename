export type TeamColor = 'red' | 'blue';
export type CardType = 'red' | 'blue' | 'neutral' | 'assassin';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type GameMode = 'word' | 'picture';

export interface CardItem {
  id: number;
  word: string;
  type: CardType;
  revealed: boolean;
  marked?: boolean;
  mode?: GameMode;
  imageUrl?: string;
  svgIcon?: string;
  keywords?: string[];
}

export interface Hint {
  word: string;
  count: number;
  targetWords?: string[];
  explanation?: string;
  turnNumber?: number;
}

export type GamePhase = 'setup' | 'playing' | 'gameover';
export type TurnPhase = 'spymaster_thinking' | 'player_turn' | 'opponent_turn';

export interface GameStats {
  turnsTaken: number;
  correctGuesses: number;
  wrongGuesses: number;
  startTime: number;
  endTime?: number;
}
