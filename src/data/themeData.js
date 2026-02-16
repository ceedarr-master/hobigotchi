// 1. 시스템 버튼 테마 (흰색 배경 + 검정 테두리)
export const SYS_THEME = {
  bg: 'bg-white',
  bgPressed: 'bg-white',
  border: 'border-hobi-black',
  shadow: 'shadow-[0_8px_0_0_#1b1f4b]',
  icon: null
};

// 2. 진화 단계별 테마 정의 (나이 무관, 순서 중심)
export const EVOLUTION_THEMES = {
  // 1단계: 알 -> 어린이 (BLUE)
  evolution_1: {
    id: 'evolution_1',
    color: 'bg-hobi-blue-d',      // 버튼/헤더 색상
    logo: 'logo_blue',            // 로고 파일명
    bg_process: 'ev_blue_processing.svg', // 진행 중 배경
    bg_done: 'ev_blue_completed.svg',     // 완료 배경
    effect: 'blue'                // 이펙트 테마
  },
  
  // 2단계: 어린이 -> 청소년 (PURPLE)
  evolution_2: {
    id: 'evolution_2',
    color: 'bg-hobi-purple-d',
    logo: 'logo_purple',
    bg_process: 'ev_purple_processing.svg',
    bg_done: 'ev_purple_completed.svg',
    effect: 'purple'
  },
  
  // 3단계: 청소년 -> 대학생 (PINK)
  evolution_3: {
    id: 'evolution_3',
    color: 'bg-hobi-pink-d',
    logo: 'logo_pink',
    bg_process: 'ev_pink_processing.svg',
    bg_done: 'ev_pink_completed.svg',
    effect: 'pink'
  },

  evolution_4: {
    id: 'evolution_4',
    color: 'bg-hobi-white',
    logo: 'logo_final',
    bg_process: 'ev_final_processing.svg',
    bg_done: 'ev_final_completed.svg',
    effect: 'final'
  },  
  
  // 기본(평상시)
  main: {
    color: 'bg-hobi-green-d',
    logo: 'logo_main',
    bg: 'main.svg',
    effect: 'orange'
  }
};