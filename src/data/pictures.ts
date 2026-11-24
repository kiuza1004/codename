// 코드네임 픽처스(Codenames Pictures) 스타일 독창적 초현실주의 그림 카드 데이터베이스
// 저작권에 안전한 독자적 벡터 라인 아트워크 및 다중 연상 키워드 탑재 (총 40종)

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
  }
];

export const ALL_PICTURE_TITLES: string[] = PICTURE_CARDS.map(p => p.title);
