import React, { useEffect, useState } from 'react';

const EvolutionEffect = ({ stage, theme = 'blue' }) => {
  const [particles, setParticles] = useState([]);
  const [twinkles, setTwinkles] = useState([]);

  // [수정] 성인 테마('final')일 때 사용할 도형 리스트 확장
  // 일반 테마는 기존 shapes 사용
  const basicShapes = ['ellipse', 'rectangle', 'star', 'diamond'];
  
  // 성인 테마용 도형 리스트 (파일명 규칙: final_도형_번호.svg 또는 final_도형.svg)
  const finalShapes = [
    'star_1', 'star_2', 'star_3', 'star_4', 
    'ellipse_1', 'ellipse_2', 'ellipse_3', 'ellipse_4',
    'diamond_1', 'diamond_2', 'diamond_3', 'diamond_4',
    'rectangle_1', 'rectangle_2', 'rectangle_3', 'rectangle_4'
  ];

  useEffect(() => {
    // 1. 팡! 터지는 이펙트 (Confetti)
    if (stage === 'confetti') {
      const isFinal = theme === 'final';
      // [수정 포인트 2: 파티클 밀도]
      // 숫자가 높을수록 화려하지만, 저사양 기기에서 프레임 드랍이 생길 수 있습니다.
      const count = isFinal ? 50 : 35; // 성인은 더 많이 터지게
      
      const newParticles = Array.from({ length: count }).map((_, i) => {
        // [파일명 결정 로직]
        let shapeName = isFinal 
    ? finalShapes[Math.floor(Math.random() * finalShapes.length)]
    : basicShapes[Math.floor(Math.random() * basicShapes.length)];

  const size = Math.random() * 12 + 10; // 크기를 10~22px로 살짝 줄여 종이가루 느낌 강조
  const angle = Math.random() * Math.PI * 2;

  // 1. 시작 거리: 140px -> 10px로 축소 (캐릭터 중앙에서 터지게 함)
  const startDist = Math.random() * 200; 
  
  // 2. 최종 거리: 더 멀리 시원하게 날아가도록 설정
  const endDist = startDist + (Math.random() * 150 + 230);

  // 3. 속도: 1.2s -> 0.7s~0.9s로 단축 (타격감의 핵심)
  const duration = Math.random() * 1.7 + 2.3; 

  // 4. 딜레이: 0.3s 이내로 순차적으로 터지게
  const delay = Math.random() * 0.6;

  return {
    id: i,
    shape: shapeName,
    size,
    startX: Math.cos(angle) * startDist,
    startY: Math.sin(angle) * startDist,
    endX: Math.cos(angle) * endDist,
    endY: Math.sin(angle) * endDist,
    rotEnd: Math.random() * 720 - 360, // 회전을 더 많이 줘서 역동성 부여
    duration: `${duration}s`,
    delay: `${delay}s` // 딜레이 적용
  };
});
      setParticles(newParticles);
    }
    
    // 2. 지속적인 별빛 효과 (Twinkle) - 성인 단계일 때만
    if (theme === 'final' && (stage === 'confetti' || stage === 'completed')) {
      // [수정 포인트 5: 배경 반짝임 개수]  
      const newTwinkles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // 화면 전체 가로 분포
            top: Math.random() * 100,// 화면 전체 세로 분포
            size: Math.random() * 10 + 5, // 10px ~ 25px
            delay: Math.random() * 2, // 0 ~ 2초 지연
            // duration: 반짝이는 주기 (짧을수록 깜빡임이 빨라짐)
            duration: Math.random() * 1 + 1.5, // 1.5 ~ 2.5초 주기
            shape: finalShapes[Math.floor(Math.random() * finalShapes.length)]
        }));
        setTwinkles(newTwinkles);
    } else {
        setTwinkles([]);
    }

  }, [stage, theme]);

  // [파일명 생성 헬퍼 함수]
  const getParticleSrc = (shape) => {
    if (theme === 'final') {
      // 예: final_star_1.svg
      return `/assets/particles/${theme}_${shape}.svg`;
    }
    // 예: blue_star4.svg
    return `/assets/particles/${theme}_${shape}.svg`;
  };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
      {/* 화이트아웃 효과 */}
      {stage === 'flash' && <div className="absolute inset-0 bg-white animate-white-out" />}

      {/* 1. 팡! 터지는 파티클 */}
      {stage === 'confetti' && particles.map(p => (
        <img
          key={p.id}
          src={getParticleSrc(p.shape)}
          alt=""
          className="absolute opacity-100 animate-particle-enhanced"
          style={{
            width: `${p.size}px`,
            left: '50%',
            top: '50%',
            '--start-x': `${p.startX}px`,
            '--start-y': `${p.startY}px`,
            '--end-x': `${p.endX}px`,
            '--end-y': `${p.endY}px`,
            '--rot-end': `${p.rotEnd}deg`,
            '--duration': p.duration,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}

      {/* 2. 지속적인 별빛 효과 (배경에 깔림) */}
      {twinkles.length > 0 && twinkles.map(t => (
          <img 
            key={`twinkle-${t.id}`}
            src={`/assets/particles/final_${t.shape}.svg`} // 성인 테마 전용 파일명 규칙 사용
            alt=""
            className="absolute animate-twinkle opacity-60"
            style={{
                left: `${t.left}%`,
                top: `${t.top}%`,
                width: `${t.size}px`,
                animationDelay: `${t.delay}s`,
                animationDuration: `${t.duration}s`
            }}
          />
      ))}
    </div>
  );
};

export default EvolutionEffect;