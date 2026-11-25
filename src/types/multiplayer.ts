import { CardItem, Hint, TeamColor, GameMode } from './game';

export type PlayerRole = 
  | 'red_spymaster' 
  | 'red_operative' 
  | 'blue_spymaster' 
  | 'blue_operative' 
  | 'spectator';

export interface RoomPlayer {
  id: string;
  name: string;
  role: PlayerRole;
  isHost: boolean;
  isMuted: boolean;
  isSpeaking: boolean;
  isAi?: boolean;
}

export type P2PMessageType =
  | 'ROOM_JOIN'
  | 'ROOM_LEAVE'
  | 'PLAYER_UPDATE'
  | 'ROLE_SELECT'
  | 'AI_FILL_TOGGLE'
  | 'START_GAME'
  | 'SYNC_BOARD'
  | 'SUBMIT_HINT'
  | 'PICK_CARD'
  | 'PASS_TURN'
  | 'VOICE_SPEAKING'
  | 'RESTART_GAME';

export interface P2PMessage {
  type: P2PMessageType;
  senderId: string;
  senderName: string;
  payload: any;
  timestamp: number;
}

export interface ActionLogItem {
  id: string;
  turnNumber: number;
  team: TeamColor;
  actorName: string;
  actorRole: PlayerRole;
  type: 'hint' | 'pick' | 'pass';
  hint?: Hint;
  cardWord?: string;
  cardType?: string;
  isCorrect?: boolean;
  timestamp: number;
}

export interface GameArchiveRecord {
  id: string;
  title: string;
  date: string;
  timestamp: number;
  mode: GameMode;
  winner: TeamColor | 'assassin';
  playerTeam?: TeamColor;
  isMultiplayer: boolean;
  players: { name: string; role: PlayerRole; isAi?: boolean }[];
  cards: CardItem[];
  hintHistory: Hint[];
  actionLogs: ActionLogItem[];
  totalTurns: number;
}
