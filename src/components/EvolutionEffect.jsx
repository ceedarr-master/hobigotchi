import React, { useEffect, useState } from 'react';

const EvolutionEffect = ({ stage, theme = 'blue' }) => {
  const [particles, setParticles] = useState([]);
  const [twinkles, setTwinkles] = useState([]);

  // [수정] 성인 테마('final')일 때 사용할 도형 리스트 확장
  // 일반 테마는 기존 shapes 사용
  const basicShapes = ['ellipse', 'rectangle', 'star4', 'star5'];
  
  // 성인 테마용 도형 리스트 (파일명 규칙: final_도형_번호.svg 또는 final_도형.svg)
  const finalShapes = [
    'star_1', 'star_2', 'star_3', 'star_4', 
    'ellipse', 'diamond', 'rectangle'
  ];

  useEffect(() => {
    // 1. 팡! 터지는 이펙트 (Confetti)
    if (stage === 'confetti') {
      const isFinal = theme === 'final';
      const count = isFinal ? 50 : 35; // 성인은 더 많이 터지게
      
      const newParticles = Array.from({ length: count }).map((_, i) => {
        // [파일명 결정 로직]
        let shapeName = '';
        if (isFinal) {
          // 성인 테마: final_star_1.svg, final_ellipse.svg 등
          const shape = finalShapes[Math.floor(Math.random() * finalShapes.length)];
          shapeName = shape; // 나중에 렌더링 할 때 theme + '_' + shapeName 조합
        } else {
          // 일반 테마: blue_star4.svg 등
          shapeName = basicShapes[Math.floor(Math.random() * basicShapes.length)];
        }

        const size = Math.random() * 20 + 15; // 15px ~ 35px
        const angle = Math.random() * Math.PI * 2;
        const startDist = Math.random() * 30 + 130; 
        const endDist = startDist + (Math.random() * 120 + 180);
        const duration = Math.random() * 0.6 + 1; // 초 단위 숫자

        return {
          id: i,
          shape: shapeName,
          size,
          // 위치 계산
          startX: Math.cos(angle) * startDist,
          startY: Math.sin(angle) * startDist,
          endX: Math.cos(angle) * endDist,
          endY: Math.sin(angle) * endDist,
          rotEnd: Math.random() * 360 - 180,
          duration: `${duration}s`,
          delay: Math.random() * 0.3
        };
      });
      setParticles(newParticles);
    }
    
    // 2. 지속적인 별빛 효과 (Twinkle) - 성인 단계일 때만
    if (theme === 'final' && (stage === 'confetti' || stage === 'completed')) {
        const newTwinkles = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // 0% ~ 100%
            top: Math.random() * 100,
            size: Math.random() * 15 + 10, // 10px ~ 25px
            delay: Math.random() * 2, // 0 ~ 2초 지연
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
          className="absolute opacity-0 animate-particle-enhanced"
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