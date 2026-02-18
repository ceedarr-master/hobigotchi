// src/data/evolutionData.js

/* [캐릭터 정보 데이터베이스]
  캐릭터 ID별 이름과 다국어 대사
*/
export const CHARACTER_INFO = {
  // --- 0. 알 ---
  'egg': {
    dialogue: { ko: "오잉??", en: "...??", jp: "...??" }
  },

  // --- 1. 어린이 (Children) ---
  'child_blueberry': {
    name: { ko: "블루베리홉", en: "Blueberry Hobi", jp: "ブルーベリーホビ" },
    dialogue: { ko: "히히", en: "Hehehe", jp: "ヒヒ" }
  },
  'child_chestnut': {
    name: { ko: "고딩홉", en: "High Schooler", jp: "高校生ホビ" },
    dialogue: { ko: "빠이팅~!!!❤️‍🔥", en: "Let's go~!!!❤️‍🔥", jp: "ファイティン〜!!!❤️‍🔥" }
  },
  'child_debut': {
    name: { ko: "21세기소년", en: "Rookie Hobi", jp: "21世紀少年" },
    dialogue: { ko: "데뷔했서요", en: "I finally debuted!", jp: "デビューしたよ！" }
  },
  'child_goodboy': {
    name: { ko: "감성소년", en: "Sentimental Hobi", jp: "感性少年" },
    dialogue: { ko: "헤헤", en: "Hi", jp: "ヘヘ" }
  },
  'child_joseon': {
    name: { ko: "홉련님", en: "Young Master", jp: "若様ホビ" },
    dialogue: { ko: "검을 천~ 따 지~ 하늘 현~ 누룽 홉~", en: "ㄱ ㄴ ㄷ ㄹ", jp: "ㄱ ㄴ ㄷ ㄹ" }
  },
  


  // --- 2. 청소년 (Teens) ---
  'teen_660660': {
    name: { ko: "뽀뽀조앙이", en: "Kissy Hobi", jp: "チューチューホビ" },
    dialogue: { ko: "660660", en: "660660", jp: "660660" }
  },
  'teen_acorn': {
    name: { ko: "다람쥐홉", en: "Chipmunk Hope", jp: "リスホビ" },
    dialogue: { ko: "그렇게 됐어요.", en: "And that's that.", jp: "そうなりました。" }
  },
  'teen_blueberry': {
    name: { ko: "사춘기홉", en: "Adolescence Hobi", jp: "思春期ホビ" },
    dialogue: { ko: "홉이에용~", en: "I am your hope!", jp: "ホビだよ〜" }
  },
  'teen_cherry': {
    name: { ko: "체리홉", en: "Cherry Hobi", jp: "チェリーホビ" },
    dialogue: { ko: "안돼용 ㅠㅠ 너무 빨개요 😴", en: "noo ㅠㅠ too red 😴", jp: "だめㅠㅠ 赤すぎます😴" }
  },
  'teen_chick': {
    name: { ko: "병아리홉", en: "Chick Hobi", jp: "ひよこホビ" },
    dialogue: { ko: "잘꾸야 이젱👋😵", en: "Sleepy... bye👋😵", jp: "もう寝るよ👋😵" }
  },
  'teen_cottoncandy': {
    name: { ko: "죠스바홉", en: "Cotton Candy Hobi", jp: "わたあめホビ" },
    dialogue: { ko: "디저트를 너무 많이 먹었어요", en: "Sugar rush...", jp: "デザート食べ過ぎた..." }
  },
  'teen_internetboy': {
    name: { ko: "인터넷보이 홉", en: "Internet Boy Hope", jp: "写真映えホビ" }, // JP: Photogenic Hobi
    dialogue: { ko: "이게 내 볼하트다", en: "Check out my cheek-heart.", jp: "これが僕の「写真映え」ポーズ。" }
  },
  'teen_run': {
    name: { ko: "런홉", en: "Run Hobi", jp: "Runホビ" },
    dialogue: { ko: "런 런 런~", en: "Run run run~", jp: "ランランラン〜" }
  },
  'teen_tear': {
    name: { ko: "쭐쭐이 홉", en: "Sniffle Hobi", jp: "泣きべそホビ" },
    dialogue: { ko: "아 우는 건 내 인생 바이브랑 안 맞는데~", en: "Crying isn't my vibe tho", jp: "泣くのは僕のバイブスじゃないのに~" }
  },
  'teen_teengirl': {
    name: { ko: "여고딩홉", en: "Schoolgirl Hobi", jp: "女子高生ホビ" },
    dialogue: { ko: "요월 시켜줘여", en: "Order me froyo!", jp: "アイス頼んでよ" }
  },
  
  
  
  


  // --- 3. 대학생 (College) ---
  'college_bambi': {
    name: { ko: "밤비홉", en: "Bambi Hobi", jp: "バンビホビ" },
    dialogue: { ko: "이뻐 보이구 싶어성 😍🥰", en: "Wanna look cute😍🥰", jp: "可愛く見せたいの😍🥰" }
  },
  'college_butter': {
    name: { ko: "바부버터 홉", en: "Butter Hobi", jp: "バブ・バター・ホビ" },
    dialogue: { ko: "욕심이 생겨요. 웃기고 싶은.", en: "I'm getting greedy..for laugh", jp: "笑いへの欲が出ちゃいますね。" }
  },
  'college_emo': {
    name: { ko: "emo홉", en: "emo hope", jp: "エモホップ" },
    dialogue: { ko: "춤추는 아기 flow", en: "Dancing Baby Flow", jp: "ダンシング・ベイビー・フロー" }
  },
  'college_explorer': {
    name: { ko: "꼬질홉", en: "Dusty Hobi", jp: "薄汚れホビ" },
    dialogue: { ko: "헤헤 @-@", en: "hehe @-@", jp: "へへ @-@" }
  },
  'college_satto': {
    name: { ko: "암행어사홉", en: "Royal Inspector Hope", jp: "暗行御史ホビ" },
    dialogue: { ko: "사또?!!! 사또?!!", en: "Satto?!!! Where are you?!!", jp: "使道(サト)？!!どこですか？!!" }
  },
  'college_street': {
    name: { ko: "닭칼먹음이홉", en: "CNS Hobi", jp: "ストリート・ボーイ" },
    dialogue: { ko: "처음 배운 춤 이름이에요. 치킨누들수프.", en: "First dance move I leaned was CNS.", jp: "初めて習ったダンスです。\nチキン・ヌードル・スープ。" }
  },
  'college_swan': {
    name: { ko: "흑조 홉", en: "Swan Hobi", jp: "ブラックスワン・ホビ" },
    dialogue: { ko: "가장 깊은 곳에서 나는 날 봤어", en: "I saw myself in the deepest depths.", jp: "一番深い場所で、僕は自分を見た。" }
  },
  'college_thorn': {
    name: { ko: "가시 홉", en: "Dry Hope", jp: "トゲトゲ・ホビ" },
    dialogue: { ko: "살이 좀 빠졌나.. 뭐, 상관없지만", en: "Did I lose weight? Whatever.", jp: "痩せたかな…まあ、いいけど。" }
  },


  // --- 4. 성인 (Adults) ---
  'adult_apple': {
    name: { ko: "사과챙김이", en: "Apple eater Hope", jp: "りんごのホップ" },
    dialogue: { ko: "엄마가 아침 사과가 몸에 좋대요", en: "Mom says morning apples are healthy", jp: "お母さんは朝のリンゴが体に良いです。" }
  },
  'adult_baseball': {
    name: { ko: "승리요정", en: "Victory Fairy", jp: "勝利の妖精" },
    dialogue: { ko: "?? 내가 기아를 응원하는데???", en: "I'm rooting for Kia???", jp: "Kiaを応援してるよ?" }
  },
  'adult_brooklyn': {
    name: { ko: "근본뉴런", en: "Neuron Hope", jp: "根本のホップ" },
    dialogue: { ko: "근본.", en: "My root.", jp: "根本。" }
  },
  'adult_cafe': {
    name: { ko: "카페사장", en: "Cafe owner", jp: "カフェ社長" },
    dialogue: { ko: "그 커피 원두는 이디오피아가 아니고\n이모토? 워다이? 그건디요", en: "They are from Imoto?\nOr maybe Wodai?", jp: "イモト出身？\nそれともウォダイ？" }
  },
  'adult_crown': {
    name: { ko: "멋쟁이신사홉", en: "Fashion King", jp: "ピエロホップ" },
    dialogue: { ko: "사실 조금 당황스럽긴 했습니다.\n그치만 진형의 정성이니깐..", en: "Actually, I was a little embarrassed.\nBut it was the Jin's sincerity.", jp: "実はちょっと恥ずかしいです。\nでもJinの真心だから…" }
  },
  'adult_cry': {
    name: { ko: "울보홉", en: "Crybaby Hope", jp: "泣き虫ホップ" },
    dialogue: { ko: "너무 감사합니다.. 제가 잘할게요", en: "Thank you so much.. I will do my best", jp: "本当にありがとうございます..." }
  },
  'adult_dad': {
    name: { ko: "대디홉", en: "Daddy Hope", jp: "パパホップ" },
    dialogue: { ko: "아빠 안잔다", en: "Kids, go to bed.", jp: "パパは寝てないぞ" }
  },
  'adult_diva': {
    name: { ko: "디바홉", en: "Diva Hope", jp: "ディーバ・ホープ" },
    dialogue: { ko: "모두 날 봐", en: "All eyes on me.", jp: "みんな、私に注目して。" }
  },
  'adult_flower': {
    name: { ko: "꽃홉", en: "Flower Hope", jp: "お花ホップ" },
    dialogue: { ko: "누가 꽃이야???", en: "Which one is the flower?", jp: "どっちが花かな？" }
  },
  'adult_fragile': { 
    name: { ko: "개예민홉", en: "Sensitive Boss", jp: "超敏感ホップ" },
    dialogue: { ko: "인트로 쫌만 더 신경써서 맞춰주세요", en: "Focus on the intro details.", jp: "イントロ、もっと合わせてください。" }
  },
  'adult_groom': {
    name: { ko: "남편", en: "Hubby", jp: "旦那様ホップ" },
    dialogue: { ko: "나랑 결혼해줄래?", en: "Will you marry me?", jp: "私と…結婚してくれる？" }
  },
  'adult_hat': {
    name: { ko: "모자장수홉", en: "Hatter Hope", jp: "帽子長寿ホップ" },
    dialogue: { ko: "돈이 있으면 모자를 사", en: "Got money? Buy a hat.", jp: "お金ある？帽子買いなよ。" }
  },
  'adult_iampet': {
    name: { ko: "애완다람쥐홉", en: "Your pet squirrel", jp: "ペットリス" },
    dialogue: { ko: "관심 받고 싶어요", en: "I crave your attention", jp: "もっと構ってください。" }
  },
  'adult_lvprince': {
    name: { ko: "엠버서더홉", en: "Ambassador Hope", jp: "アンバサダーホップ" },
    dialogue: { ko: "미안해 엄마", en: "Sorry, Mom", jp: "ごめんね, ママ" }
  },
  'adult_lvprincess': {
    name: { ko: "파리공주님", en: "Princess of Paris", jp: "パリの王女" },
    dialogue: { ko: "You can feel it, right?", en: "You can feel it, right?", jp: "You can feel it, right?" }
  },
  'adult_maid': {
    name: { ko: "메이드홉", en: "Maid Hope", jp: "メイドのホップ" },
    dialogue: { ko: "집안일을 너무 많이 하다가 그만", en: "Too many chores...", jp: "家事が多すぎて..." }
  },
  'adult_mum': {
    name: { ko: "마미홉", en: "Mommy Hope", jp: "マミー・ホープ" },
    dialogue: { ko: "무슨 일이니 마이 도터", en: "What's wrong, my daughter?", jp: "どうしたの？私のムスメ。" }
  },
  'adult_revolve': {
    name: { ko: "아기홉", en: "Regressed baby", jp: "回帰した赤ちゃん" },
    dialogue: { ko: "앗! 실수로 회귀했어요!!", en: "Oops! I time-traveled!", jp: "あっ！回帰しました！" }
  },
  'adult_rockstar': {
    name: { ko: "락스타 홉", en: "Rockstar Hope", jp: "ロックスター・ホープ" },
    dialogue: { ko: "I am so pumped!", en: "I am so pumped!", jp: "I am so pumped!" }
  },
  'adult_soldier': {
    name: { ko: "특급전사홉", en: "Elite Soldier", jp: "特級戦士ホップ" },
    dialogue: { ko: "충성!", en: "Salute!", jp: "忠誠！" }
  },
  'adult_soldierprincess': {
    name: { ko: "특급전사공주님", en: "Elite Soldier princess", jp: "特級戦士プリンセス" },
    dialogue: { ko: "특급전사인데? 공주에요", en: "Elite soldier? well, Princess.", jp: "特級戦士？姫です。" }
  },
  'adult_stage': {
    name: { ko: "무대의황제홉", en: "Legendary Stage King", jp: "ステージの皇帝ホープ" },
    dialogue: { ko: "ARMY! MAKE SOME F- NOISE!", en: "ARMY! MAKE SOME F- NOISE!", jp: "ARMY! MAKE SOME F- NOISE!" }
  },
  'adult_strawberry': {
    name: { ko: "딸기홉", en: "Strawberry Hope", jp: "イチゴ・ホープ" },
    dialogue: { ko: "딸기? 날 안보고?", en: "Strawberries? Not me?", jp: "イチゴ？僕を見ないで？" }
  },
  'adult_tired': {
    name: { ko: "지친민간인", en: "Exhausted Hope", jp: "お疲れホップ" },
    dialogue: { ko: "다 나가", en: "Get out", jp: "みんな出てって。" }
  },
  'adult_trainer': {
    name: { ko: "복근왕(이 될 남자)", en: "Future Abs King", jp: "腹筋王になる男" },
    dialogue: { ko: "개인의 복근 루틴", en: "I have my own abs routine", jp: "僕の腹筋ルーティン。" }
  },
  'adult_wet': {
    name: { ko: "흠뻑젖은홉", en: "Hobipalooza Hope", jp: "ホビパルーザ" },
    dialogue: { ko: "Too hot.", en: "Burn it up!", jp: "燃やし尽くす！" }
  },
};

export const CHILD_BASE_STATS = {
  'child_debut':    { r: 4, b: 4, g: 4, y: 4 },
  'child_chestnut': { r: 15, b: 0, g: 0, y: 0 },
  'child_joseon':   { r: 0, b: 15, g: 0, y: 0 },
  'child_goodboy':  { r: 0, b: 0, g: 15, y: 0 },
  'child_blueberry':{ r: 0, b: 0, g: 0, y: 15 },
};

// --- [Helper Functions] ---

const getStatRank = (s) => {
  const stats = { r: s.r, b: s.b, g: s.g, y: s.y };
  return Object.keys(stats).sort((a, b) => stats[b] - stats[a]);
};

const get1st = (s) => getStatRank(s)[0];
const get2nd = (s) => getStatRank(s)[1];
const get4th = (s) => getStatRank(s)[3];

const getStatGap = (s) => {
  const values = [s.r, s.b, s.g, s.y];
  return Math.max(...values) - Math.min(...values);
};

// 특정 행동들'만' 수행했는지 확인하는 헬퍼
const isOnlySpecificActions = (history, targetActionIds, exceptions = []) => {
  const actions = history.actions || {};
  // 수행 횟수가 0보다 큰 행동들의 키(ID)만 추출
  const performedKeys = Object.keys(actions).filter(k => actions[k] > 0);

  if (performedKeys.length === 0) return false;

  // 모든 수행 행동이 '목표 행동(target)'이거나 '예외 행동(exceptions)'에 포함되어야 함
  return performedKeys.every(k => targetActionIds.includes(k) || exceptions.includes(k));
};


/* --- [EVOLUTION RULES] --- */
export const EVOLUTION_RULES = {
  // [1 - 사용자 지정 특수조건], [2 - 기존 특수 조건], [3 - 스탯 조합], [4 - 스탯 조합 - 2순위 조합]

  // 1. Child -> Teen
  to_teen: [
    // [P1] 구체적인 행동 조건 (우선순위 높음)
    { id: 'teen_660660', priority: 1, condition: (s, h) => (h.actions['a_selfie'] || 0) >= 4 },
    { id: 'teen_cottoncandy', priority: 1, condition: (s, h) => ((h.items['f_coffee'] || 0) + (h.items['f_tart'] || 0) + (h.items['f_mintchoco'] || 0) + (h.items['f_cake'] || 0) + (h.items['f_dubai'] || 0)) >= 5 }, // [특수조건]디저트 5회

    // [수정] 인터넷보이: 10턴 중 과반수(5회) 이상 SNS 활동 시
    { id: 'teen_internetboy', priority: 1, condition: (s, h) => (h.actions['a_live']||0) + (h.actions['a_reply']||0) + (h.actions['a_instagram']||0) >= 5 },//인터넷광
    { id: 'teen_chick', priority: 1, condition: (s) => s.hp < 30 },

    // [P2] 스탯 조건
    { id: 'teen_teengirl', priority: 2, condition: (s) => get1st(s) === 'g' && get2nd(s) === 'y' }, // G 1위 + Y 2위
    { id: 'teen_acorn', priority: 2, condition: (s) => s.g >= 80 },
    { id: 'teen_blueberry', priority: 2, condition: (s, h) => get1st(s) === 'y' && (h.actions['a_live']||0) + (h.actions['a_kakao']||0) + (h.actions['a_instagram']||0) + (h.actions['a_reply']||0) < 5 },

    // [P3] 넓은 범위 조건 (마지막 방어선)
    { id: 'teen_tear', priority: 3, condition: (s) => get1st(s) === 'g' && s.g >= 70 }, // 감성 풍부 (울보 기질)
    { id: 'teen_cherry', priority: 3, condition: (s) => get1st(s) === 'y' },
    { id: 'teen_run', priority: 3, condition: (s, h) => s.hp >= 85 || ((h.actions['a_dance'] || 0) + (h.actions['a_vocal'] || 0)) >= 5 } // 체력이 70 이상(에너제틱) 이거나, 연습(training)을 5회 이상 함 (달려라 홉!)
  ],

// 2. Teen -> College
  to_college: [
    // [P1] 특수 행동/상태
    { id: 'college_street', priority: 1, condition: (s, h) => s.y >= 10 && ((h.items['f_chicken'] || 0) + (h.items['f_noodle'] || 0)) >= 4 }, // [특수조건]닭칼국수/치킨 4회
    { id: 'college_swan', priority: 1, condition: (s, h) => get1st(s) === 'b' && ((h.items['f_chicken'] || 0) + (h.items['f_noodle'] || 0)) === 0 },//b 1위
    // [수정] 가시홉: 체력 60 이하 & 지성 1위 (예민하고 똑똑함)
    { id: 'college_thorn', priority: 1, condition: (s) => s.hp <= 60 && get1st(s) === 'b' },

    // [P2] 스탯 조합
    { id: 'college_bambi', priority: 2, condition: (s) => get1st(s) === 'b' && get2nd(s) === 'y' },
    // [수정] 꼬질홉: 청결도 30 미만 (적당히 더러움)
    { id: 'college_explorer', priority: 2, condition: (s) => s.clean < 30 },

    // [P3, P4] 나머지
    { id: 'college_emo', priority: 3, condition: (s) => get1st(s) === 'b' && getStatGap(s) > 20 },// B 압도적 (차이 20 이상)
    { id: 'college_satto', priority: 3, condition: (s) => get1st(s) === 'b' },// B 1위
    { id: 'college_butter', priority: 4, condition: (s) => get1st(s) === 'y' && get4th(s) === 'b' },// 1위 R, 위 B
  ],

// 3. College -> Adult
  to_adult: [
    // --- [Priority 1: 구체적 행동/수집] (Soldier보다 위에 있어야 함) ---
    // 1. 딸기/사과/커피 등 아이템 수집
    { id: 'adult_strawberry', priority: 1, condition: (s, h) => (h.items['f_strawberry'] || 0) >= 8 }, // 딸기 8회
    { id: 'adult_apple', priority: 1, condition: (s, h) => (h.items['f_apple'] || 0) >= 7 }, // 사과 7개
    { id: 'adult_cafe', priority: 1, condition: (s, h) => get4th(s) === 'b' && (h.items['f_coffee'] || 0) >= 8 }, // 지성 4위 + 아메리카노 8회
    // 2. 행동 반복 (운동, 청소, 쇼핑 등)
    { id: 'adult_trainer', priority: 1, condition: (s, h) => (h.actions['a_abs'] || 0) >= 6 }, // 복근왕 (이제 Soldier한테 안 먹힘)
    { id: 'adult_maid', priority: 1, condition: (s, h) => (h.actions['a_clean'] || 0) >= 8 }, // 청소 8회
    { id: 'adult_hat', priority: 1, condition: (s, h) => (h.actions['a_shop'] || 0) >= 6 }, // 모자(쇼핑) 6회
    { id: 'adult_mum', priority: 1,  condition: (s, h) => get1st(s) === 'b' && (h.actions['a_shop'] || 0) >= 3 && (h.actions['a_english'] || 0) >= 3 },// B 1위 + 쇼핑3 + 영어3
    { id: 'adult_crown', priority: 1, condition: (s, h) => (h.actions['a_kakao'] || 0) >= 10 }, // 멤버 카톡(talk) 15회
    { id: 'adult_diva', priority: 1, condition: (s, h) => get1st(s) === 'y' && (h.actions['a_instagram'] || 0) >= 6 },// Y 1위 + sns 6회
    { id: 'adult_rockstar', priority: 1, condition: (s, h) => ((h.actions['a_monitor']||0) + (h.actions['a_dance']||0) + (h.actions['a_vocal']||0) + (h.actions['a_idea']||0)) >= 12 },

    // 상태 이상 (우선순위 높음)
    { id: 'adult_tired', priority: 1, condition: (s) => s.hp < 10 },
    { id: 'adult_soldierprincess', priority: 1, condition: (s) => s.minHp >= 30 && get1st(s) === 'g' },// 특급전사공주 (hp기록 필요)

    // --- [Priority 2: 구체적 스탯 조합] (승격됨!) ---
    { id: 'adult_baseball', priority: 4, condition: (s) => get1st(s) === 'r' && get2nd(s) === 'g' },// 1위 R, 2위 G
    { id: 'adult_wet', priority: 4, condition: (s) => get1st(s) === 'r' && get2nd(s) === 'y' },// 1위 R, 2위 Y
    { id: 'adult_fragile', priority: 4, condition: (s) => get1st(s) === 'b' && get2nd(s) === 'r' },// 1위 B, 2위 R
    { id: 'adult_flower', priority: 3, condition: (s) => get1st(s) === 'g' && get2nd(s) === 'y' },// 1위 G, 2위 Y
    { id: 'adult_lvprincess', priority: 3, condition: (s) => get1st(s) === 'y' && getStatGap(s) > 20 },// Y 압도적
    { id: 'adult_dad', priority: 4, condition: (s) => get1st(s) === 'b' && get2nd(s) === 'y' },// 1위 B, 2위 Y

    { id: 'adult_revolve', priority: 2, condition: () => Math.random() < 0.005 },// [랜덤] 회귀 (0.5% 확률) - 우선순위 높음

// --- [Priority 3: 스탯 격차 (Gap)] ---
    // 구체적인 조합(P2)에 실패했지만, 특정 스탯이 압도적일 때
    { id: 'adult_brooklyn', priority: 3, condition: (s) => get1st(s) === 'r' && getStatGap(s) > 20 },// R 압도적
    { id: 'adult_lvprince', priority: 4, condition: (s) => get1st(s) === 'y' && get2nd(s) === 'r' },// 1위 Y, 2위 R
    { id: 'adult_stage', priority: 1, condition: (s) => getStatGap(s) <= 15 && s.hp <= 60 && s.love >= 100 },// 균등스탯 + 체력60이하 + 감성MAX
    { id: 'adult_groom', priority: 1, condition: (s) => getStatGap(s) <= 10 && s.hp >= 90 && s.clean >= 90 && s.love >= 90 },// 남편 홉
    
    // --- [Priority 4: 범용/Fallback] ---
// [중요] 특급전사를 여기로 내려서 "건강하지만 특징 없는" 경우를 받아줍니다.
    { id: 'adult_soldier', priority: 1, condition: (s) => s.minHp >= 50 }, // 최후의 보루 (특급전사)

    { id: 'adult_cry', priority: 4, condition: (s) => get1st(s) === 'g' && getStatGap(s) > 60 },// G 압도적
    { id: 'adult_iampet', priority: 4, condition: (s) => s.love >= 200 },// 감성 MAX
  ]
};

export const determineNextEvolution = (currentStage, stats, history) => {
  let rules = [];
  if (currentStage === 'child') rules = EVOLUTION_RULES.to_teen;
  else if (currentStage === 'teen') rules = EVOLUTION_RULES.to_college; 
  else if (currentStage === 'college') rules = EVOLUTION_RULES.to_adult;
  else return stats.characterId;

  const matchedRule = rules
    .sort((a, b) => a.priority - b.priority)
    .find(rule => rule.condition(stats, history));

  if (matchedRule) return matchedRule.id;
  
  // 기본값 (Fallback)
  const getRandomFallback = (options) => {
    return options[Math.floor(Math.random() * options.length)];
  };

  if (currentStage === 'child') {
    return getRandomFallback(['teen_run', 'teen_blueberry']); 
  }
  if (currentStage === 'teen') {
    return getRandomFallback(['college_butter', 'college_bambi']);
  }
  if (currentStage === 'college') {
    return getRandomFallback(['adult_cafe', 'adult_dad']);
  }
  
  return stats.characterId;
};