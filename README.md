# 🕵️ CODENAMES : SPYMASTER AI & MULTIPLAYER (코드네임 팀장 & 다인 멀티 웹앱 - v2.2.0)

> **보드게임 '코드네임(Codenames)' 1인 솔로 AI 훈련 & 다인 실시간 P2P 멀티플레이 웹앱**  
> 1인 플레이 시 고도화된 Spymaster AI가 팀장이 되어 힌트를 제공하며, 다인 플레이 시 WebRTC P2P 기반으로 각자의 화면에서 **팀장(스파이마스터)**, **현장 요원**, **관전자** 역할을 나누어 대전할 수 있습니다.  
> **동시 음성 통화(WebRTC Voice Chat)**와 **작전 정밀 복기실(Replay Archive)**을 탑재하여 언제든 지난 게임을 턴 바이 턴으로 복기할 수 있습니다. (운영비용 0원)

---

## 🌐 라이브 데모 & 배포
- **공식 서비스 URL**: [https://kiuza1004.github.io/codename/](https://kiuza1004.github.io/codename/)
- **GitHub 저장소**: [https://github.com/kiuza1004/codename](https://github.com/kiuza1004/codename)

> [!IMPORTANT]
> **PWA 및 브라우저 캐시 주의사항**:  
> 캐시가 꼬일 수 있으니 꼭 기존 앱을 완전히 삭제하고 설치하셔야 합니다.  
> 웹 브라우저에서는 우측 상단의 `[🔄 캐시갱신]` 버튼을 누르거나 `Ctrl + F5` (강력 새로고침)를 실행하십시오.

---

## ⚡ v2.1.0 ARGON 주요 업데이트 및 핵심 사양

### 1. 2가지 게임 모드 지원
- **낱말 모드 (Word Mode)**: 5×5 정식 규격 (25장 그리드). 실제 공식 보드게임 한글 단어 200여 종 및 시맨틱 카테고리 태그 탑재.
- **그림 모드 (Picture Mode)**: 5×4 정식 룰 규격 (20장 그리드). 저작권 없는 100종의 초현실주의 이중 메타포 벡터 SVG 카드 풀에서 최근 60장 출제 방지 순환 알고리즘으로 20장 추출.

### 2. 엄격한 3단 수직 HUD 레이아웃
1. **[1번 구역] 암호 힌트 배너 (`SecretHintBanner`)**:
   - 답 추리에 방해되지 않도록 기본 상태는 **블라인드(가림)** 처리.
   - `[👁️ 암호힌트 확인하기]` 클릭 시에만 안전하게 열람 가능. 언제든 재가림 가능.
   - AI 확신도(Confidence %), 안전도 등급(SECURE / CAUTION / HAZARD), `💡 초성 코칭 팁`, 음성 브리핑(TTS) 제공.
2. **[2번 구역] 팀장 힌트 본부 (`SpymasterPanel`)**:
   - 카드 바로 위에 밀착 배치.
   - 내부 순서: **상단: [이전 힌트 기록 로그]** ➔ **하단: [팀장 힌트 본부]**.
   - 카드 지목 시 즉시 확인할 수 있도록 현재 팀장 힌트 단어와 수량을 상시 노출하며, 불필요한 군더더기 안내 문구 및 작전 지령 텍스트 라인은 완전 제거.
3. **[3번 구역] 5열 전술 카드 그리드 (`CardGrid`)**:
   - 팀장 힌트 바로 아래 5열 그리드 배치.
   - 카드 확대 보기(Zoom) 기능 및 그림 카드 전용 고해상도 세부 판독 모달 탑재.
   - 추리 후보 핀 마킹(`★ 후보`) 기능으로 후보 카드들을 사전 표시하고 원클릭 일괄 지목 지원.

### 3. 지능형 ARGON Spymaster AI 엔진
- **의미망 클러스터링**: 아군 타깃 카드들을 묶는 최적의 단일 단어 힌트 생성.
- **암살자 페널티 & 페일세이프**: 암살자 카드와 조금이라도 연관된 단어는 100% 원천 차단.
- **보드 단어 반칙 필터**: 현재 테이블에 노출된 카드 단어 자체는 힌트로 사용 불가(공식 룰 엄수).
- **중복 출제 방지**: 최근 사용된 단어 및 힌트를 기억하여 단조로움 방지.

### 4. 반응형 UI & 화면 최적화
- **시작 모달 (`SetupModal`)**: 모바일 및 PC 화면에서 세로 스크롤 없이 한 화면에 컴팩트하게 피팅 (STEP 1: 모드 선택 ➔ STEP 2: 난이도 ➔ STEP 3: 팀 선택).
- **2단 헤더 (`Header`)**: 로고/버전/컨트롤 버튼 라인과 스코어보드 라인을 분리하여 모바일에서도 텍스트 잘림 현상 방지 (`whitespace-nowrap`).
- **하단 액션 컨트롤 (`ActionControls`)**: 미공개 단어 자동완성 칩, 마킹 후보 즉시 지목 바, 실시간 음성인식(STT) 마이크.
- **요원 커리어 전적 시스템**: 로컬스토리지를 통한 전적(승/패/연승/적중률) 및 계급(`ROOKIE` ~ `ARGON COMMANDER`) 영구 보존.

---

## 🛠️ 기술 스택 및 비용 정보
- **프론트엔드**: React 18, TypeScript, Tailwind CSS, Lucide React, Canvas-Confetti
- **빌드 도구**: Vite 5 (`vite-plugin-pwa` 완벽 호환 구조)
- **음성 인식 (STT)**: Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`)
- **음성 합성 (TTS)**: Web Speech API (`speechSynthesis`)
- **오디오 합성 엔진**: Web Audio API (합성 오실레이터 기반의 무지연 사운드 효과)
- **비용**: 100% 브라우저 로컬 엔진 기반으로 **외부 API 호출 비용 0원**입니다.

---

## 🚀 로컬 실행 방법

### 방법 1. 윈도우 원클릭 실행 (가장 추천)
프로젝트 루트의 **`start.bat`** 파일을 더블 클릭하면 브라우저가 열리며 즉시 실행됩니다.

### 방법 2. 터미널 명령어로 실행
```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 구동 (포트 3000)
npm run dev

# 3. 프로덕션 빌드 검증
npm run build
```

---

## 📂 프로젝트 구조

```plaintext
codename/
├── src/
│   ├── components/
│   │   ├── ActionControls.tsx     # 하단 조작 패널 (자동완성 칩, 마킹 지목, 음성 마이크, 턴 종료)
│   │   ├── CardGrid.tsx           # [3번 구역] 5열 카드 그리드, 줌 확대, 후보 핀 마킹, 그림 판독기
│   │   ├── GameOverModal.tsx      # 작전 종료 리포트 (등급 판정 S+ ~ C, 원본 키카드 25/20장 복기)
│   │   ├── Header.tsx             # 2단 반응형 헤더 (버전 v2.1.0 ARGON, 캐시갱신, 스코어보드)
│   │   ├── PictureCardModal.tsx   # 그림 카드 고해상도 세부 판독 모달
│   │   ├── SecretHintBanner.tsx   # [1번 구역] 암호 힌트 배너 (블라인드 가림/확인, 음성듣기, 초성 팁)
│   │   ├── SetupModal.tsx         # 시작 모달 (무스크롤 컴팩트 피팅, 모드/난이도/팀 선택)
│   │   └── SpymasterPanel.tsx     # [2번 구역] 팀장 힌트 본부 (상단: 이전 기록 / 하단: 팀장 힌트)
│   ├── constants/
│   │   └── version.ts             # 버전 정보, 캐시 갱신 함수, 요원 커리어/계급 로직
│   ├── data/
│   │   ├── pictures.ts            # 저작권 안전 100종 초현실주의 벡터 SVG 그림 데이터셋
│   │   └── words.ts               # 실제 보드게임 공식 단어 200여 종 및 시맨틱 메타데이터
│   ├── hooks/
│   │   └── useCodenames.ts        # 핵심 게임 상태 머신 (낱말 25장 / 그림 20장 추출, 콤보, 턴 처리)
│   ├── types/
│   │   └── game.ts                # 타입 정의 (CardItem, Hint, GameMode, GameStats 등)
│   ├── utils/
│   │   ├── audio.ts               # Web Audio API 8종 전술 효과음 신디사이저
│   │   ├── speech.ts              # Web Speech API STT/TTS 음성 엔진
│   │   └── spymasterAi.ts         # ARGON 지능형 Spymaster AI 힌트 연산 엔진
│   ├── App.tsx                    # 최상위 레이아웃 구성
│   ├── index.css                  # Tailwind CSS 및 3D 플립 애니메이션 스타일
│   └── main.tsx                   # React 진입점
├── index.html                     # 캐시 방지 메타태그 및 viewport 설정
├── package.json                   # 프로젝트 패키지 설정
├── start.bat                      # 원클릭 로컬 구동 스크립트
└── README.md                      # 프로젝트 소개 및 매뉴얼
```
