import { GameArchiveRecord } from '../types/multiplayer';

const ARCHIVE_STORAGE_KEY = 'codenames_game_archives_v1';
const MAX_ARCHIVES = 30; // 최대 30개 작전 보존

export const archiveManager = {
  // 모든 저장된 아카이브 목록 불러오기 (최신순)
  getArchives(): GameArchiveRecord[] {
    try {
      const data = localStorage.getItem(ARCHIVE_STORAGE_KEY);
      if (!data) return [];
      const parsed: GameArchiveRecord[] = JSON.parse(data);
      return Array.isArray(parsed) ? parsed.sort((a, b) => b.timestamp - a.timestamp) : [];
    } catch (e) {
      console.error('Failed to load game archives:', e);
      return [];
    }
  },

  // 특정 아카이브 가져오기
  getArchiveById(id: string): GameArchiveRecord | null {
    const list = this.getArchives();
    return list.find(a => a.id === id) || null;
  },

  // 게임 종료 시 아카이브 저장
  saveArchive(record: Omit<GameArchiveRecord, 'id' | 'timestamp'> & { id?: string; timestamp?: number }): GameArchiveRecord {
    try {
      const currentList = this.getArchives();
      const newRecord: GameArchiveRecord = {
        ...record,
        id: record.id || `archive_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: record.timestamp || Date.now(),
      };

      // 중복 방지 및 최대 개수 관리
      const filtered = currentList.filter(item => item.id !== newRecord.id);
      const updated = [newRecord, ...filtered].slice(0, MAX_ARCHIVES);

      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(updated));
      return newRecord;
    } catch (e) {
      console.error('Failed to save game archive:', e);
      throw e;
    }
  },

  // 특정 아카이브 삭제
  deleteArchive(id: string): boolean {
    try {
      const list = this.getArchives();
      const filtered = list.filter(item => item.id !== id);
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (e) {
      console.error('Failed to delete game archive:', e);
      return false;
    }
  },

  // 전체 아카이브 초기화
  clearAllArchives(): void {
    localStorage.removeItem(ARCHIVE_STORAGE_KEY);
  },

  // JSON 파일로 내보내기 다운로드
  exportAsJson(record: GameArchiveRecord): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `codenames_replay_${record.date.replace(/[: ]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
};
