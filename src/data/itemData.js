const ICON_BASE = "/assets/icons";

export const ITEMS = [
    // --- FOOD: SNACK (간식) ---
    {
      id: 'f_snickers', type: 'food', group: 'snack', icon: `${ICON_BASE}/cupcake.svg`,
      ko: '스니커즈', en: 'Snickers', jp: 'スニーカー',
      r: 2, g: 0, b: 0, y: 0, hp: 10, clean: -2, love: 2, unlock: 1
    },
    {
      id: 'f_fries', type: 'food', group: 'snack', icon: `${ICON_BASE}/cupcake.svg`,
      ko: '감자튀김', en: 'French fries', jp: 'フライドポテト',
      r: 0, g: 4, b: -2, y: 0, hp: 20, clean: -5, love: 0, unlock: 3
    },
    {
      id: 'f_banana', type: 'food', group: 'snack', icon: `${ICON_BASE}/cupcake.svg`,
      ko: '바나나', en: 'Banana', jp: 'バナナ',
      r: 0, g: 2, b: 0, y: 0, hp: 15, clean: 0, love: 2, unlock: 1
    },
    {
      id: 'f_apple', type: 'food', group: 'snack', icon: `${ICON_BASE}/cupcake.svg`,
      ko: '사과', en: 'Apple', jp: 'りんご',
      r: 0, g: 5, b: 0, y: 0, hp: 10, clean: 2, love: 5, unlock: 2
    },
    {
      id: 'f_strawberry', type: 'food', group: 'snack', icon: `${ICON_BASE}/cupcake.svg`,
      ko: '딸기', en: 'Strawberry', jp: 'イチゴ',
      r: 0, g: 8, b: 0, y: 2, hp: 10, clean: 0, love: 10, unlock: 2
    },
  
    // --- FOOD: DESSERT (디저트) ---
    {
      id: 'f_coffee', type: 'food', group: 'dessert', icon: `${ICON_BASE}/cookie.svg`,
      ko: '아이스아메리카노', en: 'Iced Americano', jp: 'アイスアメリカーノ',
      r: 5, g: 2, b: 10, y: 5, hp: 5, clean: 5, love: 0, unlock: 2
    },
    {
      id: 'f_mintchoco', type: 'food', group: 'dessert', icon: `${ICON_BASE}/cookie.svg`,
      ko: '민트초코아이스크림', en: 'Mint Chocolate Ice Cream', jp: 'ミントチョコアイスクリーム',
      r: 0, g: 7, b: 0, y: 2, hp: 5, clean: -2, love: 5, unlock: 1
    },
    {
      id: 'f_cake', type: 'food', group: 'dessert', icon: `${ICON_BASE}/cookie.svg`,
      ko: '케이크', en: 'Cake', jp: 'ケーキ',
      r: 0, g: 11, b: 0, y: 5, hp: 10, clean: -5, love: 5, unlock: 3
    },
    {
      id: 'f_dubai', type: 'food', group: 'dessert', icon: `${ICON_BASE}/cookie.svg`,
      ko: '두쫀쿠', en: 'Dubai chewy cookie', jp: 'ドゥシュク',
      r: 0, g: 10, b: 0, y: 12, hp: 5, clean: -5, love: 10, unlock: 3
    },
  
    // --- FOOD: MEAL (식사) ---
    {
      id: 'f_hongeo', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '홍어삼합', en: 'Hong-eo Samhap', jp: '紅魚三合',
      r: 10, g: -5, b: 2, y: 10, hp: 20, clean: -15, love: 5, unlock: 3
    },
    {
      id: 'f_chicken', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '호석이네대여섯마리치킨', en: "Ho-seok's five or six chickens", jp: 'ホビの4台6匹のチキン',
      r: 8, g: 10, b: 0, y: 5, hp: 20, clean: -10, love: 10, unlock: 3
    },
    {
      id: 'f_steak', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '스테이크+비빔면', en: 'Steak + Bibimyeon', jp: 'ステーキ＋ビビーム面',
      r: 8, g: 8, b: 0, y: 5, hp: 25, clean: -10, love: -5, unlock: 2
    },
    {
      id: 'f_burger', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '인앤아웃 햄버거', en: 'In-N-Out Hamburger', jp: 'イン＆アウトハンバーガー',
      r: 5, g: 2, b: 0, y: 8, hp: 15, clean: -5, love: 8, unlock: 2
    },
    {
      id: 'f_noodle', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '닭칼국수', en: 'Chicken noodle soup', jp: 'チキンナイフ麺',
      r: 5, g: 8, b: 0, y: 0, hp: 20, clean: -5, love: 8, unlock: 1
    },
    {
      id: 'f_kimchi', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '김치찌개', en: 'kimchi soup', jp: 'キムチチゲ',
      r: 5, g: 3, b: 0, y: 0, hp: 20, clean: -8, love: -10, unlock: 3
    },
    {
      id: 'f_toast', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '호석이토스트', en: "Hoseok's Toast", jp: '湖石トースト',
      r: 2, g: 7, b: 2, y: 5, hp: 15, clean: -5, love: -5, unlock: 1
    },
    {
      id: 'f_spaghetti', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '스파게티', en: 'spaghetti', jp: 'スパゲッティ',
      r: 2, g: 5, b: 2, y: 5, hp: 15, clean: -5, love: 8, unlock: 2
    },
    {
      id: 'f_mango', type: 'food', group: 'meal', icon: `${ICON_BASE}/food.svg`,
      ko: '망고밥', en: 'mango sticky rice', jp: 'マンゴバブ',
      r: 0, g: 6, b: 1, y: 8, hp: 10, clean: -2, love: 3, unlock: 3
    },
  
    // --- ACTIVITY: COMMUNICATION (소통) ---
    {
      id: 'a_live', type: 'activity', group: 'communication', icon: `${ICON_BASE}/chat-dots.svg`,
      ko: '라방 켜기', en: 'weverse live', jp: 'ラバンオン',
      r: 5, g: 15, b: 0, y: 5, hp: -10, clean: 0, love: 15, unlock: 2
    },
    {
      id: 'a_kakao', type: 'activity', group: 'communication', icon: `${ICON_BASE}/chat-dots.svg`,
      ko: '멤버들 카톡 답장하기', en: "text back member's text", jp: 'メンバーのKatokに返信する',
      r: 3, g: 10, b: 5, y: 5, hp: -5, clean: 0, love: 15, unlock: 1
    },
    {
      id: 'a_reply', type: 'activity', group: 'communication', icon: `${ICON_BASE}/chat-dots.svg`,
      ko: '위버스 댓글달기', en: 'Leave a comment on Weverse', jp: 'ウィーバースコメント',
      r: 1, g: 12, b: 6, y: 8, hp: -5, clean: 0, love: 20, unlock: 1
    },
        {
      id: 'a_instagram', type: 'activity', group: 'communication', icon: `${ICON_BASE}/chat-dots.svg`,
      ko: '인스스 올리기', en: 'Upload Instagram Story ', jp: 'ウィーバースコメント',
      r: 5, g: 10, b: 5, y: 10, hp: -5, clean: 0, love: 8, unlock: 2
    },
  
    // --- ACTIVITY: SELF-DEVELOPMENT (자기계발) ---
    {
      id: 'a_clean', type: 'activity', group: 'self-development', icon: `${ICON_BASE}/book-open.svg`,
      ko: '작업실 청소하기', en: 'Cleaning the studio', jp: '作業室の清掃',
      r: 10, g: 0, b: 3, y: 0, hp: -15, clean: -20, love: -15, unlock: 2
    },
    {
      id: 'a_monitor', type: 'activity', group: 'self-development', icon: `${ICON_BASE}/book-open.svg`,
      ko: '모니터링', en: 'Monitoring', jp: 'モニタリング',
      r: 5, g: 0, b: 9, y: 5, hp: -10, clean: -2, love: -2, unlock: 1
    },
    {
      id: 'a_english', type: 'activity', group: 'self-development', icon: `${ICON_BASE}/book-open.svg`,
      ko: '영어공부', en: 'English study', jp: '英語勉強',
      r: 2, g: 1, b: 15, y: 5, hp: -30, clean: -5, love: -35, unlock: 1
    },
    {
      id: 'a_idea', type: 'activity', group: 'self-development', icon: `${ICON_BASE}/book-open.svg`,
      ko: '영감떠올리기', en: 'Inspiration', jp: 'インスピレーションを思い出す',
      r: 0, g: 8, b: 8, y: 8, hp: -5, clean: -1, love: 15, unlock: 3
    },
  
    // --- ACTIVITY: HOBBY (취미) ---
    {
      id: 'a_shop', type: 'activity', group: 'hobby', icon: `${ICON_BASE}/puzzle.svg`,
      ko: '쇼핑', en: 'shopping', jp: 'ショッピング',
      r: 9, g: 5, b: 7, y: 12, hp: -15, clean: -5, love: 10, unlock: 2
    },
    {
      id: 'a_figure', type: 'activity', group: 'hobby', icon: `${ICON_BASE}/puzzle.svg`,
      ko: '피규어 수집하기', en: 'Collecting figures', jp: 'フィギュアを集める',
      r: 5, g: 6, b: 2, y: 12, hp: -10, clean: -5, love: 5, unlock: 2
    },
    {
      id: 'a_exhibit', type: 'activity', group: 'hobby', icon: `${ICON_BASE}/puzzle.svg`,
      ko: '전시회 관람', en: 'Visiting the exhibition', jp: '展示会観覧',
      r: 3, g: 7, b: 5, y: 8, hp: -10, clean: -3, love: 5, unlock: 3
    },
    {
      id: 'a_selfie', type: 'activity', group: 'hobby', icon: `${ICON_BASE}/puzzle.svg`,
      ko: '셀카찍기', en: 'Taking a selfie', jp: '自分撮り',
      r: 2, g: 8, b: 5, y: 10, hp: -5, clean: 0, love: 8, unlock: 1
    },
    {
      id: 'a_daze', type: 'activity', group: 'hobby', icon: `${ICON_BASE}/puzzle.svg`,
      ko: '멍때리기', en: 'dazing off', jp: '叩く',
      r: 0, g: 5, b: 8, y: 0, hp: 10, clean: 0, love: -2, unlock: 3
    },
  
    // --- ACTIVITY: TRAINING (트레이닝) ---
    {
      id: 'a_dance', type: 'activity', group: 'training', icon: `${ICON_BASE}/workout.svg`,
      ko: '안무연습', en: 'choreography practice', jp: '振付練習',
      r: 12, g: 4, b: 8, y: 8, hp: -30, clean: -30, love: 10, unlock: 1
    },
    {
      id: 'a_vocal', type: 'activity', group: 'training', icon: `${ICON_BASE}/workout.svg`,
      ko: '보컬/랩연습', en: 'vocal/rap practice', jp: '声楽練習',
      r: 10, g: 4, b: 8, y: 8, hp: -20, clean: -30, love: 10, unlock: 1
    },
    {
      id: 'a_tennis', type: 'activity', group: 'training', icon: `${ICON_BASE}/workout.svg`,
      ko: '테니스', en: 'tennis', jp: 'テニス',
      r: 10, g: 2, b: 4, y: 5, hp: -35, clean: -20, love: 4, unlock: 2
    },
    {
      id: 'a_abs', type: 'activity', group: 'training', icon: `${ICON_BASE}/workout.svg`,
      ko: '복근운동', en: 'Abdominal exercises', jp: '腹筋運動',
      r: 10, g: 0, b: 2, y: 2, hp: -25, clean: -20, love: 2, unlock: 3
    },
    {
      id: 'a_soccer', type: 'activity', group: 'training', icon: `${ICON_BASE}/workout.svg`,
      ko: '축구게임', en: 'soccer game', jp: 'サッカーゲーム',
      r: 3, g: 1, b: 5, y: 3, hp: -5, clean: 0, love: -15, unlock: 2
    },
  
    // --- BASIC ACTIONS (기본) ---
    {
      id: 'basic_wash', type: 'basic', group: 'basic', icon: `${ICON_BASE}/bath.svg`,
      ko: '씻기', en: 'wash', jp: '洗う',
      r: 0, g: 2, b: 0, y: 0, hp: -15, clean: 50, love: 0, unlock: 1
    },
    {
      id: 'basic_sleep', type: 'basic', group: 'basic', icon: `${ICON_BASE}/moon.svg`,
      ko: '재우기', en: 'rest', jp: '寝る',
      r: 0, g: 0, b: 0, y: 0, hp: 60, clean: -5, love: 0, unlock: 1
    }
];