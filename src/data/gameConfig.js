const ICON_BASE = "/assets/icons";

export const INITIAL_STATS = {
    MAX_VAL: 50,     // 모든 스탯의 최대치를 50으로 설정
    hp: 70,          // 체력 (기본 70%)
    clean: 70,       // 청결 (기본 70%)
    love: 70,        // 감성/애정 (기본 70%)
    energy: 10,      // 에너지
    r: 0, g: 0, b: 0, y: 0, // 열정, 감성, 지성, 센스 (진화에 영향을 주는 숨겨진 점수)
    turn: 1,         // 현재 일차 (1일차부터 시작)
    maxTurn: 10,     // 다음 진화까지 필요한 턴 (테스트용 20, 실제 40 권장)
    stage: 'egg',    // 시작 단계 (알)
    characterId: 'egg' // 캐릭터 이미지 ID
};
