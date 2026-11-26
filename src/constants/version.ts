export const APP_VERSION = 'v2.3.0 SPYMASTER SYNC';
export const APP_BUILD_DATE = '2026-11-26 21:35 KST';
export const APP_CHANGELOG = '인간 팀장 직접 지령 입력 대기, 공석 자동 AI 채우기, AI 요원 안정적 추리·지목 루프 탑재';

const CAREER_STORAGE_KEY = 'codenames_argon_career_v2';

export interface AgentCareerStats {
  gamesPlayed: number;
  wins: number;
  currentStreak: number;
  bestStreak: number;
  totalCorrect: number;
}

export const loadCareerStats = (): AgentCareerStats => {
  try {
    const raw = localStorage.getItem(CAREER_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    gamesPlayed: 0,
    wins: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalCorrect: 0,
  };
};

export const saveCareerStats = (stats: AgentCareerStats) => {
  try {
    localStorage.setItem(CAREER_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
};

export const getAgentRankTitle = (wins: number): string => {
  if (wins >= 20) return 'ARGON COMMANDER';
  if (wins >= 10) return 'MASTER SPY';
  if (wins >= 5) return 'SPECIAL AGENT';
  if (wins >= 2) return 'FIELD AGENT';
  return 'ROOKIE AGENT';
};

export const forceCacheReload = () => {
  if (typeof window !== 'undefined') {
    try {
      const careerBackup = localStorage.getItem(CAREER_STORAGE_KEY);
      localStorage.clear();
      sessionStorage.clear();
      if (careerBackup) {
        localStorage.setItem(CAREER_STORAGE_KEY, careerBackup);
      }
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
    } catch {
      // ignore
    }
    const url = new URL(window.location.href);
    url.searchParams.set('v', Date.now().toString());
    window.location.replace(url.toString());
  }
};
