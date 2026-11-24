export const APP_VERSION = 'v1.4.0';
export const APP_BUILD_DATE = '2026-11-25 01:35 KST';
export const APP_CHANGELOG = '이전 힌트 기록 상단 배치 & 팀장 작전 지령 삭제 & 암호 힌트 최상단 배치';

export const forceCacheReload = () => {
  if (typeof window !== 'undefined') {
    // 모든 캐시 및 스토리지 비우기
    try {
      localStorage.clear();
      sessionStorage.clear();
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
    } catch {
      // ignore
    }
    // 강제 새로고침
    window.location.reload();
  }
};
