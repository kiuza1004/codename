// 코드네임 픽처스(Codenames Pictures) 스타일 독창적 초현실주의 그림 카드 데이터베이스
// 저작권에 안전한 독자적 벡터 라인 아트워크 및 다중 연상 키워드 탑재 (총 100종 완비)

export interface PictureCardItem {
  id: string;
  title: string;
  keywords: string[];
  categories: string[];
  hints: string[];
  svg: string;
}

export const PICTURE_CARDS: PictureCardItem[] = [
  {
    id: "pic_1",
    title: "로켓 고래",
    keywords: ["로켓", "고래", "바다", "우주", "비행", "헤엄", "분수"],
    categories: ["우주", "동물", "탈것", "해양"],
    hints: ["우주비행", "바다생물", "분사", "거대", "모험"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 60 C 20 40, 50 35, 75 45 C 85 48, 92 40, 95 35 C 92 50, 85 55, 75 60 C 50 70, 25 75, 20 60 Z" />
      <path d="M15 62 L 5 55 L 8 68 Z" />
      <path d="M70 35 L 75 20 L 80 38" />
      <circle cx="45" cy="50" r="4" fill="currentColor" />
      <path d="M85 58 Q 90 65 95 62" />
      <path d="M25 45 Q 35 30 40 40" />
      <line x1="8" y1="62" x2="2" y2="62" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_2",
    title: "시계 사과",
    keywords: ["시계", "사과", "시간", "과일", "초침", "빨강", "먹거리"],
    categories: ["음식", "도구", "시간", "자연"],
    hints: ["시간", "과일", "카운트다운", "달콤함", "바늘"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M50 25 C 30 25, 20 45, 20 65 C 20 85, 40 90, 50 90 C 60 90, 80 85, 80 65 C 80 45, 70 25, 50 25 Z" />
      <path d="M50 25 Q 52 12 60 10" />
      <path d="M54 18 Q 65 18 68 24" />
      <circle cx="50" cy="60" r="22" stroke-dasharray="3 3" />
      <line x1="50" y1="60" x2="50" y2="45" />
      <line x1="50" y1="60" x2="62" y2="60" />
      <circle cx="50" cy="60" r="2" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_3",
    title: "열쇠 칼",
    keywords: ["열쇠", "칼", "검", "자물쇠", "무기", "비밀", "기사"],
    categories: ["무기", "도구", "보안", "중세"],
    hints: ["해제", "날카로움", "보물", "전투", "금속"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="72" r="14" />
      <circle cx="28" cy="72" r="6" />
      <line x1="38" y1="62" x2="85" y2="15" />
      <line x1="85" y1="15" x2="80" y2="10" />
      <line x1="85" y1="15" x2="90" y2="20" />
      <path d="M60 40 L 68 48 L 64 52" />
      <path d="M72 28 L 80 36 L 76 40" />
      <line x1="32" y1="52" x2="48" y2="68" stroke-width="4" />
    </svg>`
  },
  {
    id: "pic_4",
    title: "우산 버섯",
    keywords: ["우산", "버섯", "비", "식물", "균류", "숲", "그늘"],
    categories: ["자연", "식물", "날씨", "도구"],
    hints: ["비막이", "숲속", "포자", "습기", "가을"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 55 C 15 25, 85 25, 85 55 C 85 55, 50 50, 15 55 Z" />
      <circle cx="35" cy="40" r="3" fill="currentColor" />
      <circle cx="65" cy="38" r="4" fill="currentColor" />
      <circle cx="50" cy="32" r="3" fill="currentColor" />
      <line x1="50" y1="52" x2="50" y2="82" />
      <path d="M50 82 C 50 88, 42 88, 42 82" />
      <line x1="50" y1="25" x2="50" y2="18" />
    </svg>`
  },
  {
    id: "pic_5",
    title: "달 치즈",
    keywords: ["달", "치즈", "우주", "음식", "밤", "크레이터", "노랑"],
    categories: ["우주", "음식", "밤", "천문"],
    hints: ["야행", "발효", "구멍", "초승달", "맛있는우주"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M70 20 C 40 20, 25 45, 25 70 C 25 78, 27 84, 30 90 C 18 80, 15 60, 18 45 C 22 28, 42 15, 70 20 Z" />
      <circle cx="35" cy="50" r="4" stroke-dasharray="2 2" />
      <circle cx="42" cy="35" r="3" stroke-dasharray="2 2" />
      <circle cx="32" cy="68" r="5" stroke-dasharray="2 2" />
      <polygon points="55,40 85,30 80,75 50,65" />
      <circle cx="65" cy="50" r="4" fill="currentColor" />
      <circle cx="75" cy="62" r="3" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_6",
    title: "해골 커피",
    keywords: ["해골", "커피", "카페", "독", "음료", "머그잔", "위험"],
    categories: ["음식", "음료", "위험", "공포"],
    hints: ["카페인", "치명적", "모닝커피", "각성", "해골"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="25" y="40" width="45" height="45" rx="8" />
      <path d="M70 50 C 82 50, 82 70, 70 70" />
      <circle cx="40" cy="58" r="4" fill="currentColor" />
      <circle cx="55" cy="58" r="4" fill="currentColor" />
      <path d="M44 72 L 44 76 M 48 72 L 48 76 M 52 72 L 52 76" />
      <path d="M35 32 Q 40 20 35 15 M 48 32 Q 53 20 48 15 M 60 32 Q 65 20 60 15" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_7",
    title: "피아노 기차",
    keywords: ["피아노", "기차", "악기", "음악", "철도", "탈것", "건반"],
    categories: ["음악", "교통", "예술", "탈것"],
    hints: ["멜로디", "선로", "건반소리", "여행", "클래식"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="35" width="60" height="35" rx="4" />
      <line x1="20" y1="52" x2="80" y2="52" />
      <line x1="30" y1="52" x2="30" y2="70" />
      <line x1="40" y1="52" x2="40" y2="70" />
      <line x1="50" y1="52" x2="50" y2="70" />
      <line x1="60" y1="52" x2="60" y2="70" />
      <line x1="70" y1="52" x2="70" y2="70" />
      <rect x="25" y="52" width="4" height="10" fill="currentColor" />
      <rect x="35" y="52" width="4" height="10" fill="currentColor" />
      <rect x="55" y="52" width="4" height="10" fill="currentColor" />
      <rect x="65" y="52" width="4" height="10" fill="currentColor" />
      <circle cx="32" cy="76" r="6" />
      <circle cx="68" cy="76" r="6" />
      <path d="M68 35 L 68 22 L 76 22 L 76 35" />
    </svg>`
  },
  {
    id: "pic_8",
    title: "왕관 거미",
    keywords: ["왕관", "거미", "왕", "곤충", "거미줄", "권력", "다리"],
    categories: ["동물", "인물", "권력", "위험"],
    hints: ["여덟다리", "지배자", "독", "보석", "거미줄"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="62" rx="14" ry="18" />
      <circle cx="50" cy="40" r="9" />
      <path d="M42 32 L 40 22 L 46 27 L 50 20 L 54 27 L 60 22 L 58 32 Z" fill="currentColor" />
      <path d="M38 55 Q 15 45 10 60" />
      <path d="M36 62 Q 15 62 12 75" />
      <path d="M38 70 Q 18 80 15 90" />
      <path d="M62 55 Q 85 45 90 60" />
      <path d="M64 62 Q 85 62 88 75" />
      <path d="M62 70 Q 82 80 85 90" />
    </svg>`
  },
  {
    id: "pic_9",
    title: "나비 비행기",
    keywords: ["나비", "비행기", "날개", "하늘", "곤충", "비행", "여행"],
    categories: ["교통", "자연", "하늘", "생물"],
    hints: ["활공", "화려한날개", "공중", "자연비행", "여행"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="50" rx="4" ry="28" />
      <circle cx="50" cy="20" r="4" fill="currentColor" />
      <path d="M46 35 C 20 15, 10 40, 46 55" />
      <path d="M46 55 C 15 60, 20 85, 48 70" />
      <path d="M54 35 C 80 15, 90 40, 54 55" />
      <path d="M54 55 C 85 60, 80 85, 52 70" />
      <line x1="50" y1="78" x2="50" y2="88" />
      <line x1="42" y1="86" x2="58" y2="86" />
    </svg>`
  },
  {
    id: "pic_10",
    title: "유령 책",
    keywords: ["유령", "책", "도서관", "귀신", "독서", "마법", "공포"],
    categories: ["문화", "판타지", "공포", "지식"],
    hints: ["심령", "지식", "폐가", "페이지", "미스터리"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 75 Q 50 65 50 78 Q 50 65 80 75 L 80 35 Q 50 25 50 38 Q 50 25 20 35 Z" />
      <line x1="50" y1="38" x2="50" y2="78" />
      <path d="M40 30 C 40 10, 60 10, 60 30 C 65 35, 60 40, 50 42 C 40 40, 35 35, 40 30 Z" stroke-dasharray="2 2" />
      <circle cx="46" cy="22" r="2" fill="currentColor" />
      <circle cx="54" cy="22" r="2" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_11",
    title: "전구 태양",
    keywords: ["전구", "태양", "빛", "발명", "전기", "낮", "에너지"],
    categories: ["과학", "우주", "자연", "기술"],
    hints: ["밝음", "아이디어", "광채", "열기", "에디슨"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="45" r="20" />
      <path d="M40 62 L 60 62 L 56 75 L 44 75 Z" />
      <line x1="44" y1="78" x2="56" y2="78" />
      <line x1="50" y1="12" x2="50" y2="20" />
      <line x1="50" y1="70" x2="50" y2="78" />
      <line x1="18" y1="45" x2="26" y2="45" />
      <line x1="74" y1="45" x2="82" y2="45" />
      <line x1="28" y1="23" x2="34" y2="29" />
      <line x1="66" y1="61" x2="72" y2="67" />
      <line x1="72" y1="23" x2="66" y2="29" />
      <line x1="34" y1="61" x2="28" y2="67" />
    </svg>`
  },
  {
    id: "pic_12",
    title: "총 장미",
    keywords: ["총", "장미", "무기", "꽃", "사랑", "전쟁", "가시"],
    categories: ["무기", "식물", "군사", "사랑"],
    hints: ["평화", "위험한사랑", "방아쇠", "붉은꽃", "사격"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 50 L 55 50 L 55 42 L 20 42 Z" />
      <path d="M30 50 L 25 72 L 35 72 L 40 50" />
      <path d="M42 54 Q 45 60 48 54" />
      <circle cx="70" cy="46" r="14" />
      <path d="M65 42 Q 72 38 75 45 Q 70 52 65 46" />
      <path d="M56 46 Q 62 42 66 46" />
      <path d="M72 32 Q 76 25 82 30" />
    </svg>`
  },
  {
    id: "pic_13",
    title: "카메라 눈",
    keywords: ["카메라", "눈", "렌즈", "시선", "사진", "감시", "기계"],
    categories: ["전자기기", "도구", "신체", "스파이"],
    hints: ["관찰", "셔터", "동공", "감시카메라", "시력"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="32" width="60" height="44" rx="6" />
      <path d="M38 32 L 42 22 L 58 22 L 62 32 Z" />
      <path d="M28 54 Q 50 32 72 54 Q 50 76 28 54 Z" />
      <circle cx="50" cy="54" r="8" fill="currentColor" />
      <circle cx="70" cy="38" r="2.5" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_14",
    title: "성 로봇",
    keywords: ["성", "로봇", "탑", "기계", "중세", "미래", "요새"],
    categories: ["건축", "기술", "역사", "미래"],
    hints: ["철벽", "사이보그", "성벽", "방어", "요새"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="30" y="30" width="40" height="45" rx="4" />
      <path d="M30 30 L 30 20 L 36 20 L 36 25 L 44 25 L 44 20 L 56 20 L 56 25 L 64 25 L 64 20 L 70 20 L 70 30" />
      <rect x="38" y="40" width="8" height="8" fill="currentColor" />
      <rect x="54" y="40" width="8" height="8" fill="currentColor" />
      <path d="M42 60 L 58 60 L 58 75 L 42 75 Z" />
      <line x1="20" y1="52" x2="30" y2="52" />
      <line x1="70" y1="52" x2="80" y2="52" />
      <circle cx="18" cy="52" r="3" />
      <circle cx="82" cy="52" r="3" />
    </svg>`
  },
  {
    id: "pic_15",
    title: "다이아몬드 얼음",
    keywords: ["다이아몬드", "얼음", "보석", "추위", "빙산", "결정", "단단함"],
    categories: ["보석", "자연", "광물", "겨울"],
    hints: ["반짝임", "투명", "냉기", "귀중품", "빙결"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="30,35 70,35 88,52 50,88 12,52" />
      <line x1="12" y1="52" x2="88" y2="52" />
      <line x1="30" y1="35" x2="50" y2="88" />
      <line x1="70" y1="35" x2="50" y2="88" />
      <line x1="30" y1="35" x2="42" y2="52" />
      <line x1="70" y1="35" x2="58" y2="52" />
      <path d="M50 15 L 50 25 M 45 20 L 55 20" />
    </svg>`
  },
  {
    id: "pic_16",
    title: "화산 샴페인",
    keywords: ["화산", "샴페인", "폭발", "술", "음료", "마그마", "축하"],
    categories: ["자연", "음료", "축제", "재해"],
    hints: ["분출", "거품", "파티", "용암", "탄산"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M42 45 L 30 85 L 70 85 L 58 45 Z" />
      <ellipse cx="50" cy="45" rx="8" ry="3" />
      <path d="M46 45 L 46 25 L 54 25 L 54 45" />
      <circle cx="50" cy="18" r="3" fill="currentColor" />
      <circle cx="42" cy="12" r="2" fill="currentColor" />
      <circle cx="58" cy="10" r="2.5" fill="currentColor" />
      <circle cx="50" cy="6" r="1.5" fill="currentColor" />
      <path d="M38 65 Q 42 75 40 85 M 62 65 Q 58 75 60 85" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_17",
    title: "나침반 거미줄",
    keywords: ["나침반", "거미줄", "방향", "항해", "함정", "탐험", "자석"],
    categories: ["도구", "자연", "탐험", "지리"],
    hints: ["동서남북", "미로", "길찾기", "거미", "좌표"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="50" r="35" />
      <circle cx="50" cy="50" r="22" stroke-dasharray="3 3" />
      <circle cx="50" cy="50" r="10" stroke-dasharray="2 2" />
      <line x1="50" y1="15" x2="50" y2="85" />
      <line x1="15" y1="50" x2="85" y2="50" />
      <polygon points="50,22 55,48 50,44 45,48" fill="currentColor" />
      <polygon points="50,78 55,52 50,56 45,52" />
    </svg>`
  },
  {
    id: "pic_18",
    title: "선인장 손",
    keywords: ["선인장", "손", "사막", "식물", "가시", "인사", "장갑"],
    categories: ["식물", "신체", "자연", "사막"],
    hints: ["따끔함", "사막식물", "손바닥", "건조", "녹색"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M42 85 L 42 32 C 42 24, 58 24, 58 32 L 58 85" />
      <path d="M42 55 L 26 55 C 20 55, 20 40, 26 40 L 26 35" />
      <path d="M58 48 L 74 48 C 80 48, 80 32, 74 32 L 74 25" />
      <line x1="42" y1="85" x2="58" y2="85" stroke-width="4" />
      <line x1="48" y1="36" x2="48" y2="38" stroke-width="3" />
      <line x1="52" y1="58" x2="52" y2="60" stroke-width="3" />
      <line x1="24" y1="46" x2="24" y2="48" stroke-width="3" />
      <line x1="76" y1="38" x2="76" y2="40" stroke-width="3" />
    </svg>`
  },
  {
    id: "pic_19",
    title: "기린 탑",
    keywords: ["기린", "탑", "목", "동물", "건축", "전망대", "키"],
    categories: ["동물", "건축", "아프리카", "시설"],
    hints: ["높음", "얼룩무늬", "초원", "에펠탑", "관측"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M35 90 L 45 35 L 55 35 L 65 90" />
      <line x1="38" y1="72" x2="62" y2="72" />
      <line x1="42" y1="52" x2="58" y2="52" />
      <circle cx="50" cy="24" r="10" />
      <line x1="46" y1="14" x2="44" y2="8" />
      <line x1="54" y1="14" x2="56" y2="8" />
      <circle cx="44" cy="8" r="1.5" fill="currentColor" />
      <circle cx="56" cy="8" r="1.5" fill="currentColor" />
      <rect x="47" y="60" width="6" height="6" fill="currentColor" />
      <rect x="47" y="40" width="6" height="6" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_20",
    title: "번개 배터리",
    keywords: ["번개", "배터리", "전기", "충전", "에너지", "날씨", "동력"],
    categories: ["전자기기", "자연", "기술", "날씨"],
    hints: ["충전", "고전압", "건전지", "천둥", "파워"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="30" y="28" width="40" height="58" rx="6" />
      <path d="M42 28 L 42 20 L 58 20 L 58 28" />
      <polygon points="54,38 40,54 49,54 44,74 62,52 52,52" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_21",
    title: "수갑 반지",
    keywords: ["수갑", "반지", "경찰", "결혼", "구속", "보석", "약속"],
    categories: ["도구", "장신구", "치안", "패션"],
    hints: ["체포", "결혼반지", "속박", "금속", "사랑의구속"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="35" cy="55" r="18" />
      <circle cx="65" cy="55" r="18" />
      <circle cx="35" cy="55" r="12" stroke-dasharray="2 2" />
      <circle cx="65" cy="55" r="12" stroke-dasharray="2 2" />
      <line x1="45" y1="40" x2="55" y2="40" stroke-width="4" />
      <polygon points="50,22 55,30 45,30" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_22",
    title: "공룡 자동차",
    keywords: ["공룡", "자동차", "바퀴", "탈것", "티라노", "고대", "엔진"],
    categories: ["동물", "교통", "고대", "기계"],
    hints: ["쥐라기", "질주", "화석연료", "거대파충류", "드라이브"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 62 C 20 45, 35 35, 55 35 L 75 35 L 85 50 L 85 65 L 18 65" />
      <path d="M75 35 Q 85 20 90 28" />
      <circle cx="32" cy="70" r="8" />
      <circle cx="70" cy="70" r="8" />
      <path d="M18 55 Q 10 40 12 60" />
      <polygon points="35,35 40,26 45,35" fill="currentColor" />
      <polygon points="48,35 53,26 58,35" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_23",
    title: "안경 망원경",
    keywords: ["안경", "망원경", "렌즈", "시력", "별", "관찰", "우주"],
    categories: ["도구", "과학", "시력", "우주"],
    hints: ["시야확보", "천체관측", "확대", "안경테", "먼곳"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="35" cy="50" r="15" />
      <circle cx="75" cy="50" r="15" />
      <line x1="50" y1="50" x2="60" y2="50" />
      <line x1="20" y1="50" x2="10" y2="40" />
      <path d="M35 35 L 35 22 L 75 22 L 75 35" stroke-dasharray="3 3" />
      <circle cx="35" cy="50" r="6" stroke-dasharray="2 2" />
      <circle cx="75" cy="50" r="6" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_24",
    title: "폭탄 볼링공",
    keywords: ["폭탄", "볼링공", "게임", "폭발", "스포츠", "도화선", "스트라이크"],
    categories: ["무기", "스포츠", "게임", "위험"],
    hints: ["카운트다운", "핀쓰러뜨리기", "화약", "굴리기", "폭발"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="55" r="28" />
      <circle cx="42" cy="48" r="3.5" fill="currentColor" />
      <circle cx="55" cy="46" r="3.5" fill="currentColor" />
      <circle cx="48" cy="58" r="3.5" fill="currentColor" />
      <path d="M50 27 Q 52 14 62 16 Q 70 18 68 8" />
      <polygon points="68,8 72,4 74,10" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_25",
    title: "피자 지구",
    keywords: ["피자", "지구", "행성", "음식", "치즈", "대륙", "세계"],
    categories: ["음식", "우주", "지리", "행성"],
    hints: ["토핑", "푸른별", "조각", "세계평화", "이탈리아"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="50" r="32" />
      <line x1="50" y1="18" x2="50" y2="82" stroke-dasharray="3 3" />
      <line x1="18" y1="50" x2="82" y2="50" stroke-dasharray="3 3" />
      <circle cx="38" cy="38" r="5" fill="currentColor" />
      <circle cx="62" cy="36" r="4" fill="currentColor" />
      <circle cx="40" cy="64" r="4.5" fill="currentColor" />
      <circle cx="65" cy="62" r="5" fill="currentColor" />
      <path d="M30 25 Q 38 18 50 18 Q 62 18 70 25" stroke-width="4" />
    </svg>`
  },
  {
    id: "pic_26",
    title: "마법모자 토끼",
    keywords: ["마법", "모자", "토끼", "마술", "공연", "동물", "신비"],
    categories: ["엔터", "동물", "마법", "패션"],
    hints: ["트릭", "모자속토끼", "신사모", "마술사", "서프라이즈"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="75" rx="36" ry="8" />
      <path d="M28 75 L 34 38 L 66 38 L 72 75" />
      <path d="M42 38 Q 38 15 42 10 Q 48 10 46 38" fill="currentColor" />
      <path d="M54 38 Q 52 12 58 10 Q 64 12 58 38" fill="currentColor" />
      <circle cx="50" cy="36" r="8" />
      <circle cx="47" cy="35" r="1.5" fill="white" />
      <circle cx="53" cy="35" r="1.5" fill="white" />
    </svg>`
  },
  {
    id: "pic_27",
    title: "편지 비둘기",
    keywords: ["편지", "비둘기", "소식", "새", "봉투", "평화", "통신"],
    categories: ["동물", "통신", "문서", "조류"],
    hints: ["전령새", "우편", "사랑의편지", "날개", "소식전달"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30 50 C 30 35, 60 30, 80 40 C 70 50, 55 65, 35 65 Z" />
      <circle cx="75" cy="42" r="2" fill="currentColor" />
      <polygon points="80,40 90,42 82,46" fill="currentColor" />
      <path d="M45 45 Q 60 20 68 35" />
      <rect x="25" y="60" width="30" height="20" rx="2" />
      <polyline points="25,60 40,72 55,60" />
    </svg>`
  },
  {
    id: "pic_28",
    title: "잠수함 오리",
    keywords: ["잠수함", "오리", "수중", "바다", "장난감", "노랑", "목욕"],
    categories: ["교통", "동물", "탈것", "놀이"],
    hints: ["러버덕", "수중탐사", "프로펠러", "목욕놀이", "심해"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M25 65 C 20 50, 45 42, 60 42 C 75 42, 85 55, 80 70 C 65 75, 35 75, 25 65 Z" />
      <circle cx="68" cy="35" r="12" />
      <circle cx="72" cy="33" r="2" fill="currentColor" />
      <path d="M78 35 Q 92 38 82 44 Z" fill="currentColor" />
      <path d="M48 42 L 48 25 L 56 25 L 56 42" />
      <circle cx="40" cy="58" r="4" stroke-dasharray="2 2" />
      <circle cx="56" cy="58" r="4" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_29",
    title: "책 나무",
    keywords: ["책", "나무", "지식", "자연", "도서관", "뿌리", "숲"],
    categories: ["문화", "식물", "교육", "자연"],
    hints: ["지혜의나무", "독서", "학문", "푸른잎", "종이"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30 78 Q 50 68 50 82 Q 50 68 70 78 L 70 55 Q 50 45 50 58 Q 50 45 30 55 Z" />
      <line x1="50" y1="58" x2="50" y2="82" />
      <path d="M50 50 L 50 32" stroke-width="4" />
      <circle cx="50" cy="24" r="16" stroke-dasharray="4 2" />
      <path d="M42 22 Q 50 14 58 22" />
    </svg>`
  },
  {
    id: "pic_30",
    title: "전화기 바나나",
    keywords: ["전화기", "바나나", "통화", "과일", "연락", "수화기", "노랑"],
    categories: ["전자기기", "음식", "통신", "과일"],
    hints: ["여보세요", "달콤한통화", "노란과일", "벨소리", "무선"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 68 C 18 40, 45 20, 78 26 C 70 34, 52 38, 42 55 C 36 65, 30 74, 22 68 Z" fill="currentColor" fill-opacity="0.1" />
      <circle cx="26" cy="65" r="7" />
      <circle cx="74" cy="28" r="7" />
      <path d="M30 60 Q 48 48 68 32" stroke-dasharray="3 3" />
      <circle cx="48" cy="74" r="3" />
      <circle cx="58" cy="74" r="3" />
      <circle cx="68" cy="74" r="3" />
    </svg>`
  },
  {
    id: "pic_31",
    title: "기타 도끼",
    keywords: ["기타", "도끼", "악기", "음악", "무기", "록", "나무"],
    categories: ["음악", "무기", "예술", "도구"],
    hints: ["일렉기타", "밴드", "날카로운연주", "현악기", "콘서트"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <line x1="25" y1="75" x2="78" y2="22" stroke-width="3.5" />
      <path d="M20 55 C 12 65, 18 85, 38 82 C 45 78, 48 65, 35 55 Z" />
      <circle cx="30" cy="68" r="5" />
      <path d="M72 15 L 86 28 L 78 34 L 66 22 Z" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_32",
    title: "구름 양",
    keywords: ["구름", "양", "하늘", "동물", "날씨", "솜털", "목장"],
    categories: ["자연", "동물", "날씨", "하늘"],
    hints: ["푹신함", "양털", "뭉게구름", "초원", "수면"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30 62 C 20 62, 18 48, 28 44 C 30 32, 48 30, 54 38 C 64 32, 78 40, 74 52 C 82 56, 78 66, 68 66 L 30 66 Z" />
      <circle cx="24" cy="52" r="8" fill="currentColor" />
      <circle cx="22" cy="50" r="1.5" fill="white" />
      <line x1="36" y1="66" x2="36" y2="80" />
      <line x1="46" y1="66" x2="46" y2="80" />
      <line x1="60" y1="66" x2="60" y2="80" />
      <line x1="68" y1="66" x2="68" y2="80" />
    </svg>`
  },
  {
    id: "pic_33",
    title: "거북이 탱크",
    keywords: ["거북이", "탱크", "등껍질", "군사", "동물", "대포", "방어"],
    categories: ["동물", "군사", "탈것", "무기"],
    hints: ["장갑차", "단단한갑옷", "포신", "느림보", "방어력"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 62 C 22 36, 72 36, 72 62 Z" />
      <line x1="58" y1="42" x2="88" y2="34" stroke-width="4" />
      <circle cx="82" cy="55" r="7" />
      <rect x="20" y="62" width="56" height="14" rx="7" />
      <circle cx="30" cy="69" r="3.5" fill="currentColor" />
      <circle cx="48" cy="69" r="3.5" fill="currentColor" />
      <circle cx="66" cy="69" r="3.5" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_34",
    title: "아이스크림 횃불",
    keywords: ["아이스크림", "횃불", "불", "디저트", "성화", "음식", "여름"],
    categories: ["음식", "불", "스포츠", "여름"],
    hints: ["올림픽성화", "차가운불꽃", "콘", "바닐라", "열기"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="36,52 64,52 50,88" />
      <line x1="40" y1="62" x2="60" y2="62" />
      <line x1="44" y1="72" x2="56" y2="72" />
      <path d="M34 52 C 30 36, 50 32, 50 14 C 62 28, 70 38, 66 52 Z" />
      <path d="M44 48 C 44 38, 50 35, 50 26 C 56 35, 58 40, 56 48" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_35",
    title: "문어 샹들리에",
    keywords: ["문어", "샹들리에", "조명", "바다", "해양", "동물", "빛"],
    categories: ["동물", "해양", "가구", "빛"],
    hints: ["여덟다리조명", "천장등", "심해", "촛대", "화려함"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <line x1="50" y1="10" x2="50" y2="26" />
      <ellipse cx="50" cy="40" rx="14" ry="14" />
      <circle cx="45" cy="40" r="2" fill="currentColor" />
      <circle cx="55" cy="40" r="2" fill="currentColor" />
      <path d="M38 50 Q 20 65 18 52" />
      <path d="M44 52 Q 30 75 28 62" />
      <path d="M56 52 Q 70 75 72 62" />
      <path d="M62 50 Q 80 65 82 52" />
      <circle cx="18" cy="48" r="3" fill="currentColor" />
      <circle cx="28" cy="58" r="3" fill="currentColor" />
      <circle cx="72" cy="58" r="3" fill="currentColor" />
      <circle cx="82" cy="48" r="3" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_36",
    title: "펭귄 턱시도",
    keywords: ["펭귄", "턱시도", "정장", "남극", "동물", "조류", "겨울"],
    categories: ["동물", "패션", "겨울", "조류"],
    hints: ["신사", "나비넥타이", "얼음왕국", "흑백", "예복"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="56" rx="20" ry="28" />
      <circle cx="50" cy="24" r="12" />
      <polygon points="50,24 58,27 50,30" fill="currentColor" />
      <polygon points="43,38 50,42 43,46" fill="currentColor" />
      <polygon points="57,38 50,42 57,46" fill="currentColor" />
      <line x1="50" y1="44" x2="50" y2="75" stroke-dasharray="3 3" />
    </svg>`
  },
  {
    id: "pic_37",
    title: "가위 게",
    keywords: ["가위", "게", "집게", "바다", "도구", "해양", "절단"],
    categories: ["동물", "해양", "도구", "바다"],
    hints: ["꽃게", "집게발", "문구", "옆으로걸음", "갑각류"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="62" rx="22" ry="14" />
      <circle cx="42" cy="48" r="2.5" fill="currentColor" />
      <circle cx="58" cy="48" r="2.5" fill="currentColor" />
      <line x1="34" y1="52" x2="20" y2="24" />
      <line x1="22" y1="42" x2="36" y2="24" />
      <line x1="66" y1="52" x2="80" y2="24" />
      <line x1="78" y1="42" x2="64" y2="24" />
    </svg>`
  },
  {
    id: "pic_38",
    title: "마이크 아이스크림",
    keywords: ["마이크", "아이스크림", "노래", "음식", "음악", "공연", "디저트"],
    categories: ["음악", "음식", "엔터", "디저트"],
    hints: ["가수", "달콤한목소리", "노래방", "콘서트", "바닐라콘"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="34" r="16" />
      <line x1="34" y1="34" x2="66" y2="34" stroke-dasharray="3 2" />
      <polygon points="38,48 62,48 50,84" />
      <path d="M50 84 Q 50 94 65 92" />
    </svg>`
  },
  {
    id: "pic_39",
    title: "돛단배 백조",
    keywords: ["돛단배", "백조", "배", "조류", "바다", "호수", "항해"],
    categories: ["동물", "교통", "바다", "조류"],
    hints: ["우아한항해", "하얀새", "요트", "물위", "호수"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 68 C 25 80, 70 80, 80 65 L 30 65 C 22 50, 25 30, 35 26 C 40 25, 42 30, 38 34" />
      <polygon points="48,62 48,24 76,58" />
      <path d="M15 84 Q 50 78 85 84" stroke-dasharray="3 3" />
    </svg>`
  },
  {
    id: "pic_40",
    title: "모래시계 사막",
    keywords: ["모래시계", "사막", "시간", "모래", "피라미드", "자연", "역사"],
    categories: ["시간", "자연", "도구", "사막"],
    hints: ["세월", "오아시스", "이집트", "타이머", "모래언덕"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <line x1="26" y1="18" x2="74" y2="18" stroke-width="3.5" />
      <line x1="26" y1="82" x2="74" y2="82" stroke-width="3.5" />
      <polygon points="30,18 70,18 50,50" />
      <polygon points="50,50 70,82 30,82" />
      <polygon points="36,82 50,64 64,82" fill="currentColor" />
      <line x1="50" y1="50" x2="50" y2="64" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_41",
    title: "바이올린 잎사귀",
    keywords: ["바이올린", "잎사귀", "나뭇잎", "악기", "음악", "자연", "식물"],
    categories: ["음악", "식물", "자연", "예술"],
    hints: ["자연의선율", "클래식", "현악기", "숲속음악회", "초록"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M50 20 C 30 35, 28 70, 50 85 C 72 70, 70 35, 50 20 Z" />
      <line x1="50" y1="12" x2="50" y2="90" />
      <path d="M40 48 Q 50 42 60 48" />
      <path d="M38 62 Q 50 56 62 62" />
      <line x1="22" y1="68" x2="78" y2="38" stroke-width="2" />
    </svg>`
  },
  {
    id: "pic_42",
    title: "주사위 선물상자",
    keywords: ["주사위", "선물", "상자", "게임", "리본", "행운", "파티"],
    categories: ["게임", "축제", "도구", "놀이"],
    hints: ["랜덤박스", "보드게임", "생일선물", "확률", "서프라이즈"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="25" y="32" width="50" height="50" rx="6" />
      <path d="M50 32 C 35 16, 25 28, 50 32 C 75 28, 65 16, 50 32" />
      <circle cx="38" cy="45" r="3" fill="currentColor" />
      <circle cx="62" cy="45" r="3" fill="currentColor" />
      <circle cx="50" cy="57" r="3" fill="currentColor" />
      <circle cx="38" cy="70" r="3" fill="currentColor" />
      <circle cx="62" cy="70" r="3" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_43",
    title: "투구 풍뎅이",
    keywords: ["투구", "풍뎅이", "곤충", "갑옷", "기사", "뿔", "방어"],
    categories: ["동물", "곤충", "중세", "군사"],
    hints: ["장수풍뎅이", "철갑", "뿔달린전사", "곤충왕", "단단함"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="60" rx="22" ry="24" />
      <line x1="50" y1="44" x2="50" y2="84" />
      <path d="M30 48 L 70 48" />
      <path d="M50 36 L 50 14 L 40 20 M 50 14 L 60 20" stroke-width="3" />
    </svg>`
  },
  {
    id: "pic_44",
    title: "등대 촛불",
    keywords: ["등대", "촛불", "바다", "불", "빛", "항해", "탑"],
    categories: ["바다", "건축", "빛", "불"],
    hints: ["밤바다", "길잡이", "양초", "불빛", "항구"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M36 85 L 42 36 L 58 36 L 64 85 Z" />
      <line x1="40" y1="52" x2="60" y2="52" />
      <line x1="38" y1="68" x2="62" y2="68" />
      <path d="M50 32 C 42 24, 48 14, 50 10 C 52 14, 58 24, 50 32 Z" fill="currentColor" />
      <line x1="30" y1="22" x2="16" y2="18" stroke-dasharray="2 2" />
      <line x1="70" y1="22" x2="84" y2="18" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_45",
    title: "선풍기 꽃",
    keywords: ["선풍기", "꽃", "바람", "식물", "여름", "전자기기", "시원함"],
    categories: ["식물", "전자기기", "자연", "여름"],
    hints: ["꽃바람", "프로펠러", "향기", "냉방", "회전"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="42" r="24" />
      <circle cx="50" cy="42" r="5" fill="currentColor" />
      <ellipse cx="50" cy="26" rx="5" ry="9" />
      <ellipse cx="50" cy="58" rx="5" ry="9" />
      <ellipse cx="34" cy="42" rx="9" ry="5" />
      <ellipse cx="66" cy="42" rx="9" ry="5" />
      <line x1="50" y1="66" x2="50" y2="86" />
      <path d="M36 86 L 64 86" stroke-width="3" />
    </svg>`
  },
  {
    id: "pic_46",
    title: "사자 태양",
    keywords: ["사자", "태양", "맹수", "우주", "갈기", "동물", "불"],
    categories: ["동물", "우주", "자연", "권력"],
    hints: ["밀림의왕", "이글거리는갈기", "초원", "해", "용맹"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="50" r="18" />
      <circle cx="44" cy="46" r="2" fill="currentColor" />
      <circle cx="56" cy="46" r="2" fill="currentColor" />
      <polygon points="47,53 53,53 50,57" fill="currentColor" />
      <path d="M50 18 L 54 28 L 64 20 L 62 32 L 74 28 L 68 38 L 80 42 L 70 50 L 80 58 L 68 62 L 74 72 L 62 68 L 64 80 L 54 72 L 50 82 L 46 72 L 36 80 L 38 68 L 26 72 L 32 62 L 20 58 L 30 50 L 20 42 L 32 38 L 26 28 L 38 32 L 36 20 L 46 28 Z" />
    </svg>`
  },
  {
    id: "pic_47",
    title: "뱀 줄자",
    keywords: ["뱀", "줄자", "도구", "동물", "측정", "길이", "파충류"],
    categories: ["동물", "도구", "패션", "위험"],
    hints: ["눈금", "비늘", "재단사", "구불구불", "센티미터"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 75 C 20 50, 45 50, 45 65 C 45 80, 70 80, 70 50 C 70 30, 55 25, 45 30" stroke-width="8" />
      <path d="M20 75 C 20 50, 45 50, 45 65 C 45 80, 70 80, 70 50 C 70 30, 55 25, 45 30" stroke-dasharray="3 4" />
      <circle cx="42" cy="30" r="6" fill="currentColor" />
      <path d="M36 30 L 26 26 M 36 30 L 26 34" />
    </svg>`
  },
  {
    id: "pic_48",
    title: "고슴도치 솔방울",
    keywords: ["고슴도치", "솔방울", "가시", "동물", "숲", "식물", "자연"],
    categories: ["동물", "식물", "자연", "숲"],
    hints: ["뾰족함", "소나무", "가을숲", "방어본능", "도토리"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 65 C 20 35, 65 30, 78 55 L 88 62 L 75 68 L 20 68 Z" />
      <circle cx="76" cy="56" r="2" fill="currentColor" />
      <circle cx="88" cy="62" r="2.5" fill="currentColor" />
      <path d="M28 45 L 24 35 M 38 40 L 36 28 M 50 38 L 50 26 M 60 42 L 64 30" />
    </svg>`
  },
  {
    id: "pic_49",
    title: "헬리콥터 잠자리",
    keywords: ["헬리콥터", "잠자리", "곤충", "비행", "하늘", "프로펠러", "날개"],
    categories: ["교통", "곤충", "하늘", "자연"],
    hints: ["호버링", "가을하늘", "회전날개", "잠자리눈", "항공"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="42" cy="52" rx="18" ry="10" />
      <line x1="60" y1="52" x2="88" y2="52" stroke-width="3" />
      <line x1="16" y1="30" x2="72" y2="30" stroke-width="3" />
      <line x1="44" y1="30" x2="44" y2="42" />
      <circle cx="30" cy="50" r="4" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_50",
    title: "자물쇠 심장",
    keywords: ["자물쇠", "심장", "하트", "사랑", "보안", "비밀", "열쇠"],
    categories: ["신체", "보안", "사랑", "도구"],
    hints: ["잠긴마음", "비밀연애", "열쇠구멍", "순정", "철벽"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M50 84 C 50 84, 22 65, 22 46 C 22 34, 38 32, 50 44 C 62 32, 78 34, 78 46 C 78 65, 50 84, 50 84 Z" />
      <path d="M38 35 L 38 22 C 38 12, 62 12, 62 22 L 62 35" />
      <circle cx="50" cy="56" r="4" fill="currentColor" />
      <line x1="50" y1="60" x2="50" y2="68" stroke-width="3" />
    </svg>`
  },
  {
    id: "pic_51",
    title: "우주선 오징어",
    keywords: ["우주선", "오징어", "로켓", "바다", "우주", "해양", "외계"],
    categories: ["우주", "동물", "해양", "비행"],
    hints: ["심해탐사", "촉수", "외계생명체", "발사", "먹물"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="50,14 68,42 58,42 58,62 42,62 42,42 32,42" />
      <circle cx="50" cy="48" r="5" />
      <path d="M44 62 Q 36 78 40 88 M 50 62 Q 50 78 50 90 M 56 62 Q 64 78 60 88" />
    </svg>`
  },
  {
    id: "pic_52",
    title: "왕관 파인애플",
    keywords: ["왕관", "파인애플", "과일", "열대", "음식", "왕", "노랑"],
    categories: ["음식", "과일", "권력", "자연"],
    hints: ["열대과일왕", "비타민", "하와이", "황금빛", "달콤새콤"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="62" rx="20" ry="24" />
      <line x1="35" y1="50" x2="65" y2="74" />
      <line x1="65" y1="50" x2="35" y2="74" />
      <polygon points="34,38 30,20 44,28 50,16 56,28 70,20 66,38" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_53",
    title: "체스 성탑",
    keywords: ["체스", "성", "탑", "게임", "중세", "전략", "왕"],
    categories: ["게임", "건축", "중세", "전략"],
    hints: ["룩", "보드게임", "체크메이트", "요새", "기사"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30 84 L 70 84 L 64 72 L 60 36 L 40 36 L 36 72 Z" />
      <path d="M34 36 L 34 22 L 42 22 L 42 28 L 58 28 L 58 22 L 66 22 L 66 36 Z" />
    </svg>`
  },
  {
    id: "pic_54",
    title: "코끼리 주전자",
    keywords: ["코끼리", "주전자", "차", "동물", "코", "주방", "물"],
    categories: ["동물", "도구", "음료", "주방"],
    hints: ["긴코주둥이", "홍차", "티타임", "아프리카", "따르기"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="56" r="22" />
      <path d="M28 52 C 16 52, 16 32, 22 30" stroke-width="4" />
      <path d="M72 48 C 84 48, 84 66, 72 66" />
      <circle cx="40" cy="48" r="2.5" fill="currentColor" />
      <path d="M48 44 C 58 44, 60 66, 48 66" />
    </svg>`
  },
  {
    id: "pic_55",
    title: "박쥐 우산",
    keywords: ["박쥐", "우산", "밤", "비", "날개", "공포", "도구"],
    categories: ["동물", "날씨", "밤", "공포"],
    hints: ["뱀파이어", "검은날개", "동굴", "비오는밤", "고딕"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 52 C 25 26, 75 26, 86 52 C 74 44, 62 52, 50 44 C 38 52, 26 44, 14 52 Z" />
      <path d="M44 28 L 46 20 L 50 26 L 54 20 L 56 28" fill="currentColor" />
      <line x1="50" y1="44" x2="50" y2="82" />
      <path d="M50 82 C 50 88, 42 88, 42 82" />
    </svg>`
  },
  {
    id: "pic_56",
    title: "고양이 달",
    keywords: ["고양이", "달", "밤", "우주", "반려동물", "동물", "수염"],
    categories: ["동물", "우주", "밤", "마법"],
    hints: ["야옹", "초승달", "밤산책", "지붕위", "신비"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M65 20 C 32 20, 20 50, 35 76 C 48 90, 72 84, 78 72 C 56 76, 42 58, 46 38 C 48 28, 56 22, 65 20 Z" />
      <circle cx="58" cy="54" r="8" />
      <polygon points="52,48 50,40 56,46" fill="currentColor" />
      <polygon points="64,48 66,40 60,46" fill="currentColor" />
      <path d="M58 62 L 58 74 Q 66 78 70 70" />
    </svg>`
  },
  {
    id: "pic_57",
    title: "상어 서핑보드",
    keywords: ["상어", "서핑", "바다", "지느러미", "스포츠", "해양", "여름"],
    categories: ["동물", "해양", "스포츠", "여름"],
    hints: ["파도타기", "죠스", "해변", "포식자", "스릴"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 58 C 35 42, 70 42, 86 58 C 70 74, 35 74, 18 58 Z" />
      <path d="M48 45 L 58 24 L 62 46" fill="currentColor" />
      <path d="M26 56 L 30 60 L 34 56 L 38 60" />
    </svg>`
  },
  {
    id: "pic_58",
    title: "도넛 구명튜브",
    keywords: ["도넛", "튜브", "수영", "음식", "바다", "디저트", "여름"],
    categories: ["음식", "바다", "여름", "안전"],
    hints: ["달콤한구조", "물놀이", "설탕시럽", "수영장", "구멍"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="50" r="30" />
      <circle cx="50" cy="50" r="12" />
      <line x1="50" y1="20" x2="50" y2="38" stroke-width="4" />
      <line x1="50" y1="62" x2="50" y2="80" stroke-width="4" />
      <line x1="20" y1="50" x2="38" y2="50" stroke-width="4" />
      <line x1="62" y1="50" x2="80" y2="50" stroke-width="4" />
    </svg>`
  },
  {
    id: "pic_59",
    title: "부엉이 시계",
    keywords: ["부엉이", "시계", "시간", "새", "밤", "조류", "지혜"],
    categories: ["동물", "시간", "조류", "밤"],
    hints: ["올빼미", "자정", "똑딱똑딱", "야행성", "큰눈"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="58" rx="22" ry="26" />
      <circle cx="42" cy="36" r="7" />
      <circle cx="58" cy="36" r="7" />
      <circle cx="42" cy="36" r="2" fill="currentColor" />
      <circle cx="58" cy="36" r="2" fill="currentColor" />
      <circle cx="50" cy="62" r="12" />
      <line x1="50" y1="62" x2="50" y2="54" />
      <line x1="50" y1="62" x2="57" y2="62" />
    </svg>`
  },
  {
    id: "pic_60",
    title: "독수리 방패",
    keywords: ["독수리", "방패", "날개", "군사", "조류", "방어", "문장"],
    categories: ["동물", "군사", "조류", "권력"],
    hints: ["수호신", "엠블럼", "맹금류", "철벽방어", "기사단"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 26 L 72 26 L 72 54 C 72 72, 50 86, 50 86 C 50 86, 28 72, 28 54 Z" />
      <path d="M14 38 L 28 44 M 86 38 L 72 44" stroke-width="3" />
      <circle cx="50" cy="46" r="7" />
      <polygon points="50,48 56,52 50,55" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_61",
    title: "악어 지퍼",
    keywords: ["악어", "지퍼", "이빨", "패션", "동물", "옷", "파충류"],
    categories: ["동물", "패션", "도구", "위험"],
    hints: ["날카로운이빨", "잠그기", "늪지대", "가방", "재킷"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 35 L 46 55 L 46 85" />
      <path d="M82 35 L 54 55 L 54 85" />
      <rect x="44" y="48" width="12" height="14" rx="3" fill="currentColor" />
      <path d="M26 40 L 30 36 M 34 46 L 38 42 M 74 40 L 70 36 M 66 46 L 62 42" />
    </svg>`
  },
  {
    id: "pic_62",
    title: "홍학 음표",
    keywords: ["홍학", "음표", "음악", "새", "조류", "노래", "핑크"],
    categories: ["동물", "음악", "조류", "예술"],
    hints: ["플라밍고", "외다리춤", "악보", "리듬", "열대새"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="42" cy="64" rx="14" ry="10" fill="currentColor" />
      <path d="M54 62 L 54 22 C 66 22, 72 34, 64 42" stroke-width="3" />
      <line x1="42" y1="74" x2="42" y2="90" />
      <polyline points="42,80 52,82 46,88" />
    </svg>`
  },
  {
    id: "pic_63",
    title: "햄버거 자물쇠",
    keywords: ["햄버거", "자물쇠", "음식", "보안", "패스트푸드", "다이어트", "빵"],
    categories: ["음식", "보안", "도구", "요리"],
    hints: ["금식", "비밀레시피", "치즈버거", "칼로리봉인", "열쇠"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 52 C 24 34, 76 34, 76 52 Z" />
      <line x1="22" y1="60" x2="78" y2="60" stroke-width="4" />
      <path d="M26 68 L 74 68 C 74 78, 26 78, 26 68 Z" />
      <path d="M38 38 L 38 22 C 38 12, 62 12, 62 22 L 62 38" />
    </svg>`
  },
  {
    id: "pic_64",
    title: "눈사람 전구",
    keywords: ["눈사람", "전구", "겨울", "빛", "눈", "전기", "크리스마스"],
    categories: ["겨울", "과학", "날씨", "빛"],
    hints: ["겨울조명", "하얀눈", "꼬마전구", "당근코", "발광"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="34" r="12" />
      <circle cx="50" cy="58" r="16" />
      <rect x="42" y="74" width="16" height="10" rx="2" />
      <polygon points="50,34 60,36 50,38" fill="currentColor" />
      <circle cx="50" cy="52" r="2" fill="currentColor" />
      <circle cx="50" cy="62" r="2" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_65",
    title: "닻 곡괭이",
    keywords: ["닻", "곡괭이", "바다", "광산", "도구", "배", "금속"],
    categories: ["바다", "도구", "광물", "항해"],
    hints: ["정박", "채굴", "해적", "광부", "쇠사슬"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="20" r="6" />
      <line x1="50" y1="26" x2="50" y2="82" stroke-width="3" />
      <path d="M22 40 Q 50 26 78 40" stroke-width="4" />
      <path d="M26 64 C 26 84, 74 84, 74 64" />
    </svg>`
  },
  {
    id: "pic_66",
    title: "여우 가면",
    keywords: ["여우", "가면", "동물", "스파이", "변장", "공연", "비밀"],
    categories: ["동물", "예술", "스파이", "비밀"],
    hints: ["교활함", "무도회", "정체은폐", "페르소나", "숲속요원"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="24,22 38,36 62,36 76,22 72,56 50,80 28,56" />
      <ellipse cx="38" cy="50" rx="5" ry="3" fill="currentColor" />
      <ellipse cx="62" cy="50" rx="5" ry="3" fill="currentColor" />
      <circle cx="50" cy="76" r="3" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_67",
    title: "사슴 나뭇가지",
    keywords: ["사슴", "나무", "뿔", "숲", "동물", "식물", "자연"],
    categories: ["동물", "식물", "자연", "숲"],
    hints: ["루돌프", "거대한뿔", "삼림", "요정", "겨울숲"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="36,50 64,50 50,82" />
      <path d="M40 50 L 24 22 M 32 36 L 20 34 M 36 42 L 38 28" />
      <path d="M60 50 L 76 22 M 68 36 L 80 34 M 64 42 L 62 28" />
      <circle cx="50" cy="78" r="3" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_68",
    title: "고래 잠수함",
    keywords: ["고래", "잠수함", "바다", "해양", "군사", "탈것", "심해"],
    categories: ["동물", "해양", "교통", "군사"],
    hints: ["수중함대", "잠망경", "거대어류", "소나", "태평양"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 58 C 16 40, 65 40, 76 54 L 90 44 L 88 68 L 76 58 C 65 72, 16 72, 16 58 Z" />
      <path d="M46 42 L 46 24 L 56 24" stroke-width="3" />
      <circle cx="32" cy="55" r="4" />
      <circle cx="46" cy="55" r="4" />
      <circle cx="60" cy="55" r="4" />
    </svg>`
  },
  {
    id: "pic_69",
    title: "거울 포털",
    keywords: ["거울", "포털", "마법", "우주", "차원", "가구", "판타지"],
    categories: ["마법", "우주", "판타지", "가구"],
    hints: ["차원이동", "소용돌이", "이상한나라", "반사", "공간이동"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="50" cy="50" rx="26" ry="34" />
      <path d="M50 50 C 58 42, 64 56, 50 62 C 36 66, 32 42, 50 34 C 68 28, 74 58, 50 72" stroke-dasharray="3 2" />
    </svg>`
  },
  {
    id: "pic_70",
    title: "드래곤 성",
    keywords: ["드래곤", "용", "성", "판타지", "불", "중세", "날개"],
    categories: ["판타지", "건축", "중세", "불"],
    hints: ["화염브레스", "왕국", "요새수호", "전설의동물", "기사"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="34" y="46" width="32" height="38" />
      <path d="M34 46 L 34 38 L 42 38 L 42 46 L 58 46 L 58 38 L 66 38 L 66 46" />
      <path d="M34 56 C 14 36, 12 60, 34 68" />
      <path d="M66 56 C 86 36, 88 60, 66 68" />
      <path d="M50 38 Q 50 18 64 20 L 58 28" />
    </svg>`
  },
  {
    id: "pic_71",
    title: "컴퓨터 뇌",
    keywords: ["컴퓨터", "뇌", "인공지능", "과학", "신체", "기술", "지식"],
    categories: ["과학", "기술", "신체", "전자기기"],
    hints: ["AI", "슈퍼컴퓨터", "두뇌회전", "뉴런", "모니터"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="24" width="60" height="44" rx="4" />
      <line x1="50" y1="68" x2="50" y2="80" />
      <line x1="34" y1="80" x2="66" y2="80" />
      <path d="M36 46 C 32 36, 46 32, 50 40 C 54 32, 68 36, 64 46 C 70 54, 56 60, 50 54 C 44 60, 30 54, 36 46 Z" />
    </svg>`
  },
  {
    id: "pic_72",
    title: "로봇 강아지",
    keywords: ["로봇", "강아지", "기계", "동물", "미래", "반려동물", "기술"],
    categories: ["동물", "기술", "미래", "기계"],
    hints: ["사이보그견", "인공반려견", "안테나", "충성", "강철"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="48" width="38" height="24" rx="4" />
      <rect x="54" y="28" width="22" height="20" rx="4" />
      <circle cx="68" cy="36" r="2.5" fill="currentColor" />
      <line x1="65" y1="28" x2="65" y2="18" />
      <circle cx="65" cy="16" r="2" fill="currentColor" />
      <line x1="32" y1="72" x2="32" y2="86" />
      <line x1="58" y1="72" x2="58" y2="86" />
    </svg>`
  },
  {
    id: "pic_73",
    title: "앵무새 해적선",
    keywords: ["앵무새", "해적선", "바다", "배", "조류", "모험", "보물"],
    categories: ["동물", "바다", "탈것", "조류"],
    hints: ["카리브해", "선장", "돛", "해적", "항해"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 64 L 82 64 L 70 80 L 30 80 Z" />
      <line x1="50" y1="22" x2="50" y2="64" />
      <path d="M50 26 C 68 26, 74 44, 50 52 Z" />
      <circle cx="34" cy="48" r="8" />
      <polygon points="26,48 18,52 26,54" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_74",
    title: "달팽이 집",
    keywords: ["달팽이", "집", "건축", "동물", "자연", "지붕", "숲"],
    categories: ["동물", "건축", "자연", "숲"],
    hints: ["내집마련", "느림의미학", "굴뚝", "더듬이", "이동주택"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 74 L 84 74 C 88 64, 78 58, 72 68" />
      <line x1="80" y1="62" x2="86" y2="50" />
      <rect x="30" y="44" width="32" height="30" />
      <polygon points="26,44 46,24 66,44" />
      <rect x="42" y="56" width="8" height="8" />
    </svg>`
  },
  {
    id: "pic_75",
    title: "해바라기 위성",
    keywords: ["해바라기", "위성", "우주", "꽃", "태양", "통신", "과학"],
    categories: ["식물", "우주", "과학", "통신"],
    hints: ["태양광패널", "전파수신", "노란꽃", "궤도", "우주안테나"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="50" r="14" />
      <rect x="14" y="42" width="18" height="16" />
      <rect x="68" y="42" width="18" height="16" />
      <line x1="50" y1="36" x2="50" y2="20" />
      <circle cx="50" cy="18" r="3" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_76",
    title: "전갈 포크레인",
    keywords: ["전갈", "포크레인", "중장비", "사막", "기계", "동물", "독침"],
    categories: ["동물", "기계", "사막", "위험"],
    hints: ["굴착기", "사막의중장비", "집게", "공사장", "독꼬리"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="56" width="36" height="18" rx="4" />
      <path d="M58 56 L 74 34 L 52 20 L 44 30" stroke-width="3" />
      <path d="M28 62 L 14 54 L 18 46" />
      <circle cx="36" cy="78" r="4" />
      <circle cx="56" cy="78" r="4" />
    </svg>`
  },
  {
    id: "pic_77",
    title: "수박 폭탄",
    keywords: ["수박", "폭탄", "과일", "여름", "음식", "무기", "폭발"],
    categories: ["음식", "과일", "무기", "여름"],
    hints: ["줄무늬폭탄", "시원한폭발", "수박씨", "도화선", "여름과일"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="56" r="26" />
      <path d="M40 32 Q 34 56 40 80 M 50 30 L 50 82 M 60 32 Q 66 56 60 80" />
      <path d="M50 30 Q 54 16 66 14" />
      <circle cx="68" cy="14" r="3" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_78",
    title: "치아 다이아몬드",
    keywords: ["치아", "이빨", "다이아몬드", "보석", "치과", "신체", "건강"],
    categories: ["신체", "보석", "건강", "광물"],
    hints: ["건치", "반짝이는미소", "단단한어금니", "보석세공", "하양"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30 34 C 30 22, 46 24, 50 30 C 54 24, 70 22, 70 34 C 70 52, 64 78, 58 78 C 54 78, 52 60, 50 60 C 48 60, 46 78, 42 78 C 36 78, 30 52, 30 34 Z" />
      <polygon points="40,38 50,30 60,38 50,50" />
    </svg>`
  },
  {
    id: "pic_79",
    title: "구두 자동차",
    keywords: ["구두", "신발", "자동차", "패션", "바퀴", "탈것", "하이힐"],
    categories: ["패션", "교통", "탈것", "도구"],
    hints: ["신데렐라차", "굽달린차", "질주하는신발", "드라이브", "구두"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 34 L 38 34 L 54 56 L 82 58 C 86 64, 82 70, 74 70 L 22 70 Z" />
      <circle cx="34" cy="74" r="7" />
      <circle cx="68" cy="74" r="7" />
    </svg>`
  },
  {
    id: "pic_80",
    title: "풍차 선풍기",
    keywords: ["풍차", "선풍기", "바람", "건축", "날개", "에너지", "자연"],
    categories: ["건축", "전자기기", "자연", "에너지"],
    hints: ["네덜란드", "풍력발전", "시원한바람", "돌아가는날개", "초원"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="36,86 64,86 56,44 44,44" />
      <circle cx="50" cy="44" r="4" fill="currentColor" />
      <line x1="22" y1="18" x2="78" y2="70" stroke-width="3" />
      <line x1="78" y1="18" x2="22" y2="70" stroke-width="3" />
    </svg>`
  },
  {
    id: "pic_81",
    title: "바이킹 투구배",
    keywords: ["바이킹", "투구", "배", "바다", "전사", "뿔", "항해"],
    categories: ["역사", "바다", "군사", "탈것"],
    hints: ["북유럽전사", "뿔투구", "노젓기", "해상원정", "방패"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 62 C 20 82, 80 82, 80 62 Z" />
      <path d="M32 62 C 32 42, 68 42, 68 62" />
      <path d="M34 48 C 20 42, 18 24, 28 20" stroke-width="3" />
      <path d="M66 48 C 80 42, 82 24, 72 20" stroke-width="3" />
    </svg>`
  },
  {
    id: "pic_82",
    title: "마법지팡이 연필",
    keywords: ["마법", "지팡이", "연필", "별", "교육", "글씨", "도구"],
    categories: ["마법", "교육", "도구", "예술"],
    hints: ["창작의마법", "필기구", "요정지팡이", "작가", "별빛"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <line x1="24" y1="78" x2="64" y2="38" stroke-width="6" />
      <polygon points="70,18 74,28 84,28 76,34 80,44 70,38 60,44 64,34 56,28 66,28" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_83",
    title: "트로피 성배",
    keywords: ["트로피", "성배", "우승", "스포츠", "왕관", "보석", "승리"],
    categories: ["스포츠", "보석", "권력", "역사"],
    hints: ["챔피언", "황금잔", "우승컵", "영광", "전설의보물"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 24 L 68 24 L 64 52 C 62 64, 38 64, 36 52 Z" />
      <path d="M32 30 C 18 30, 18 48, 34 48" />
      <path d="M68 30 C 82 30, 82 48, 66 48" />
      <line x1="50" y1="62" x2="50" y2="80" stroke-width="3" />
      <rect x="34" y="80" width="32" height="6" />
    </svg>`
  },
  {
    id: "pic_84",
    title: "판다 대나무피리",
    keywords: ["판다", "대나무", "피리", "악기", "동물", "음악", "자연"],
    categories: ["동물", "음악", "식물", "자연"],
    hints: ["대나무숲", "흑백곰", "전통악기", "단소", "평화로운연주"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="46" cy="46" r="20" />
      <circle cx="30" cy="28" r="6" fill="currentColor" />
      <circle cx="62" cy="28" r="6" fill="currentColor" />
      <circle cx="38" cy="44" r="4" fill="currentColor" />
      <circle cx="54" cy="44" r="4" fill="currentColor" />
      <line x1="46" y1="56" x2="84" y2="76" stroke-width="5" />
    </svg>`
  },
  {
    id: "pic_85",
    title: "불사조 화염",
    keywords: ["불사조", "피닉스", "불", "새", "판타지", "날개", "태양"],
    categories: ["판타지", "조류", "불", "마법"],
    hints: ["부활", "불꽃날개", "전설의새", "열기", "비상"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M50 78 C 44 60, 44 36, 50 22 C 56 36, 56 60, 50 78 Z" fill="currentColor" />
      <path d="M46 48 C 20 26, 12 46, 36 62" />
      <path d="M54 48 C 80 26, 88 46, 64 62" />
      <path d="M46 76 L 38 90 M 50 78 L 50 94 M 54 76 L 62 90" />
    </svg>`
  },
  {
    id: "pic_86",
    title: "유니콘 아이스크림",
    keywords: ["유니콘", "아이스크림", "뿔", "말", "판타지", "음식", "디저트"],
    categories: ["판타지", "음식", "동물", "마법"],
    hints: ["무지개뿔", "전설의말", "달콤한환상", "아이스크림콘", "동화"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30 74 L 36 46 L 64 46 L 72 58 L 58 66 L 56 74" />
      <polygon points="48,46 60,46 54,14" fill="currentColor" />
      <circle cx="58" cy="52" r="2" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_87",
    title: "인어 하프",
    keywords: ["인어", "하프", "바다", "음악", "악기", "판타지", "해양"],
    categories: ["판타지", "음악", "해양", "바다"],
    hints: ["바다의노래", "인어공주", "현악기", "지느러미", "신화"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M30 22 L 30 76 L 72 76 C 72 46, 54 36, 30 22 Z" />
      <line x1="40" y1="32" x2="40" y2="76" />
      <line x1="50" y1="42" x2="50" y2="76" />
      <line x1="60" y1="52" x2="60" y2="76" />
      <path d="M72 76 L 86 68 L 82 84 Z" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_88",
    title: "낙하산 해파리",
    keywords: ["낙하산", "해파리", "바다", "하늘", "비행", "해양", "동물"],
    categories: ["동물", "해양", "하늘", "비행"],
    hints: ["둥둥떠다님", "촉수", "스카이다이빙", "바다생물", "투명"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 48 C 22 20, 78 20, 78 48 Z" />
      <line x1="28" y1="48" x2="46" y2="76" />
      <line x1="72" y1="48" x2="54" y2="76" />
      <path d="M42 48 Q 38 66 44 82 M 58 48 Q 62 66 56 82" stroke-dasharray="2 2" />
    </svg>`
  },
  {
    id: "pic_89",
    title: "트럼프 왕관",
    keywords: ["트럼프", "카드", "왕관", "게임", "마술", "왕", "스페이드"],
    categories: ["게임", "권력", "엔터", "마법"],
    hints: ["포커", "킹카드", "카지노", "조커", "카드마술"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="30" width="44" height="56" rx="4" />
      <polygon points="28,30 24,14 40,22 50,12 60,22 76,14 72,30" fill="currentColor" />
      <polygon points="50,46 60,58 50,70 40,58" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_90",
    title: "카멜레온 신호등",
    keywords: ["카멜레온", "신호등", "색깔", "교통", "동물", "도마뱀", "변신"],
    categories: ["동물", "교통", "자연", "스파이"],
    hints: ["보호색", "빨강노랑초록", "위장술", "파충류", "정지신호"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="34" y="20" width="32" height="62" rx="8" />
      <circle cx="50" cy="34" r="6" fill="currentColor" />
      <circle cx="50" cy="51" r="6" />
      <circle cx="50" cy="68" r="6" stroke-dasharray="2 2" />
      <path d="M66 68 C 82 68, 84 52, 74 52 C 68 52, 70 60, 76 60" />
    </svg>`
  },
  {
    id: "pic_91",
    title: "캥거루 권투장갑",
    keywords: ["캥거루", "권투", "복싱", "장갑", "동물", "스포츠", "호주"],
    categories: ["동물", "스포츠", "게임", "자연"],
    hints: ["복싱챔피언", "펀치", "주머니", "링위", "점프"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="48" cy="46" r="20" />
      <circle cx="66" cy="40" r="10" fill="currentColor" />
      <rect x="34" y="66" width="28" height="14" rx="2" />
      <path d="M40 26 L 34 12 L 46 22 M 54 26 L 60 12 L 48 22" />
    </svg>`
  },
  {
    id: "pic_92",
    title: "두더지 드릴",
    keywords: ["두더지", "드릴", "땅", "기계", "동물", "광산", "도구"],
    categories: ["동물", "기계", "도구", "광물"],
    hints: ["땅굴파기", "지하탐사", "회전드릴", "안전모", "터널"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="50,16 32,52 68,52" />
      <line x1="40" y1="36" x2="60" y2="36" />
      <line x1="35" y1="46" x2="65" y2="46" />
      <path d="M32 52 L 32 82 L 68 82 L 68 52" />
      <circle cx="42" cy="64" r="2.5" fill="currentColor" />
      <circle cx="58" cy="64" r="2.5" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_93",
    title: "공작새 부채",
    keywords: ["공작새", "부채", "깃털", "새", "바람", "조류", "패션"],
    categories: ["동물", "조류", "패션", "예술"],
    hints: ["화려한날개", "여름부채", "전통춤", "아름다움", "깃털무늬"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 64 C 16 26, 84 26, 84 64 L 50 82 Z" />
      <line x1="50" y1="82" x2="50" y2="28" />
      <line x1="50" y1="82" x2="28" y2="38" />
      <line x1="50" y1="82" x2="72" y2="38" />
      <circle cx="50" cy="40" r="3" fill="currentColor" />
      <circle cx="34" cy="46" r="3" fill="currentColor" />
      <circle cx="66" cy="46" r="3" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_94",
    title: "청진기 하트",
    keywords: ["청진기", "하트", "병원", "의사", "심장", "건강", "사랑"],
    categories: ["신체", "건강", "도구", "과학"],
    hints: ["심장박동", "진찰", "의학", "맥박", "생명"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <path d="M50 66 C 50 66, 26 48, 26 32 C 26 20, 42 20, 50 30 C 58 20, 74 20, 74 32 C 74 48, 50 66, 50 66 Z" />
      <path d="M50 66 L 50 82 C 50 90, 72 90, 72 76" />
      <circle cx="72" cy="72" r="6" fill="currentColor" />
    </svg>`
  },
  {
    id: "pic_95",
    title: "주사기 로켓",
    keywords: ["주사기", "로켓", "병원", "우주", "백신", "과학", "비행"],
    categories: ["건강", "우주", "과학", "도구"],
    hints: ["초고속치료", "의학발사", "주사바늘", "우주개발", "처방"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <line x1="50" y1="12" x2="50" y2="28" stroke-width="3" />
      <rect x="38" y="28" width="24" height="44" />
      <line x1="38" y1="42" x2="46" y2="42" />
      <line x1="38" y1="54" x2="46" y2="54" />
      <polygon points="38,58 26,72 38,72" fill="currentColor" />
      <polygon points="62,58 74,72 62,72" fill="currentColor" />
      <line x1="50" y1="72" x2="50" y2="88" stroke-width="4" />
    </svg>`
  },
  {
    id: "pic_96",
    title: "열기구 전구",
    keywords: ["열기구", "전구", "하늘", "비행", "빛", "여행", "발명"],
    categories: ["교통", "하늘", "빛", "과학"],
    hints: ["떠오르는아이디어", "하늘여행", "풍선비행", "발광", "모험"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="38" r="22" />
      <line x1="36" y1="56" x2="42" y2="74" />
      <line x1="64" y1="56" x2="58" y2="74" />
      <rect x="40" y="74" width="20" height="14" rx="2" />
      <path d="M44 40 L 50 30 L 56 40" />
    </svg>`
  },
  {
    id: "pic_97",
    title: "왕관 태양",
    keywords: ["왕관", "태양", "왕", "우주", "빛", "권력", "황금"],
    categories: ["권력", "우주", "자연", "빛"],
    hints: ["태양왕", "절대권력", "눈부신광채", "제왕", "낮"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="58" r="20" />
      <polygon points="32,42 28,22 42,32 50,18 58,32 72,22 68,42" fill="currentColor" />
      <line x1="20" y1="58" x2="12" y2="58" />
      <line x1="80" y1="58" x2="88" y2="58" />
      <line x1="50" y1="84" x2="50" y2="92" />
    </svg>`
  },
  {
    id: "pic_98",
    title: "거미 드론",
    keywords: ["거미", "드론", "기계", "스파이", "비행", "곤충", "카메라"],
    categories: ["동물", "기술", "스파이", "하늘"],
    hints: ["정찰드론", "여덟날개", "비밀감시", "로봇곤충", "첨단무기"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="50" r="12" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
      <line x1="40" y1="40" x2="22" y2="22" />
      <line x1="60" y1="40" x2="78" y2="22" />
      <line x1="40" y1="60" x2="22" y2="78" />
      <line x1="60" y1="60" x2="78" y2="78" />
      <circle cx="22" cy="22" r="8" stroke-dasharray="3 2" />
      <circle cx="78" cy="22" r="8" stroke-dasharray="3 2" />
      <circle cx="22" cy="78" r="8" stroke-dasharray="3 2" />
      <circle cx="78" cy="78" r="8" stroke-dasharray="3 2" />
    </svg>`
  },
  {
    id: "pic_99",
    title: "호랑이 번개",
    keywords: ["호랑이", "번개", "맹수", "전기", "동물", "날씨", "줄무늬"],
    categories: ["동물", "자연", "날씨", "에너지"],
    hints: ["번개같은질주", "백두산호랑이", "천둥포효", "줄무늬전류", "용맹"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="50" cy="52" r="24" />
      <circle cx="32" cy="30" r="6" />
      <circle cx="68" cy="30" r="6" />
      <polygon points="54,28 42,50 52,50 46,72 60,48 50,48" fill="currentColor" />
      <line x1="26" y1="48" x2="34" y2="48" />
      <line x1="66" y1="48" x2="74" y2="48" />
    </svg>`
  },
  {
    id: "pic_100",
    title: "보물상자 책",
    keywords: ["보물", "상자", "책", "지식", "보석", "도서관", "모험"],
    categories: ["지식", "보석", "문화", "비밀"],
    hints: ["지식의보물창고", "황금책", "독서", "열쇠", "지혜"],
    svg: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-current fill-none stroke-[2.5]" stroke-linecap="round" stroke-linejoin="round">
      <rect x="22" y="42" width="56" height="36" rx="4" />
      <path d="M22 42 C 22 24, 78 24, 78 42" />
      <line x1="22" y1="54" x2="78" y2="54" />
      <rect x="46" y="48" width="8" height="12" fill="currentColor" />
      <line x1="30" y1="66" x2="70" y2="66" stroke-dasharray="4 2" />
    </svg>`
  }
];

export const ALL_PICTURE_TITLES: string[] = PICTURE_CARDS.map(p => p.title);
