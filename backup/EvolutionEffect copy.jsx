// src/components/EvolutionEffect.jsx
import React, { useEffect, useState } from 'react';

const EvolutionEffect = ({ stage, theme = 'blue' }) => {
  const [particles, setParticles] = useState([]);
  // 사용할 도형 모양 리스트 (파일명 뒤에 붙음: blue_star4.svg 등)
  const shapes = ['ellipse', 'rectangle', 'star4', 'star5'];

  useEffect(() => {
    if (stage === 'confetti') {
      // 35개의 파티클 생성
      const newParticles = Array.from({ length: 20 }).map((_, i) => {
        
        // [1] 크기 설정: 15px ~ 35px 사이 랜덤
        const size = Math.random() * 60 + 37;

        // [2] 발사 각도: 0도 ~ 360도(2π) 사이 랜덤 방향
        const angle = Math.random() * Math.PI * 2;
        
        // [3] 시작 거리 (중요): 중앙(0,0)이 아니라 캐릭터 밖에서 시작
        // 중앙에서 130px ~ 160px 떨어진 링 모양 지점에서 생성됨
        const startDist = Math.random() * 30 + 130; 

        // [4] 도착 거리: 시작점에서 180px ~ 300px 더 멀리 날아감
        const endDist = startDist + (Math.random() * 120 + 180);

        // [5] 속도 (Duration): 파티클이 생겨서 사라질 때까지 걸리는 시간
        // 현재: 0.8초 ~ 1.4초 사이 랜덤.
        // * 팁: 숫자를 줄이면(예: 0.5) 빨라지고, 늘리면(예: 2.0) 느려짐
        const duration = `${Math.random() * 0.6 + 1}s`;

        return {
          id: i,
          shape: shapes[Math.floor(Math.random() * shapes.length)], // 도형 랜덤 선택
          size,
          
          // --- [위치 계산 (삼각함수)] ---
          // 각도(angle)와 거리(Dist)를 X, Y 좌표로 변환
          
          // 시작 위치 (Start)
          startX: Math.cos(angle) * startDist,
          startY: Math.sin(angle) * startDist,
          
          // 중간 위치 (Mid): 시작점보다 40px 더 바깥 (여기서 크기가 제일 커짐)
          midX: Math.cos(angle) * (startDist + 30),
          midY: Math.sin(angle) * (startDist + 30),
          
          // 끝 위치 (End): 화면 밖으로 멀리 날아가는 지점
          endX: Math.cos(angle) * endDist,
          endY: Math.sin(angle) * endDist,
          
          // [6] 회전: 날아가는 동안 -360도 ~ +360도 랜덤하게 회전
          rotEnd: Math.random() * 180 - 360,
          
          duration, 
          
          // [7] 지연 시간: 0 ~ 0.5초 사이 랜덤하게 늦게 출발 (폭죽이 타닥타닥 터지는 느낌)
          delay: Math.random() * 0.2
        };
      });
      setParticles(newParticles);
    }
  }, [stage]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* 화이트아웃 효과 */}
      {stage === 'flash' && <div className="absolute inset-0 bg-white animate-white-out" />}

      {/* 파티클 렌더링 */}
      {stage === 'confetti' && particles.map(p => (
        <img
          key={p.id}
          // [파일명 규칙] 예: /assets/particles/blue_star.svg
          src={`/assets/particles/${theme}_${p.shape}.svg`}
          alt=""
          className="absolute opacity-0 animate-particle-enhanced"
          style={{
            width: `${p.size}px`,
            left: '50%', // 화면 중앙 정렬
            top: '50%',
            
            // index.css로 전달하는 애니메이션 변수들
            '--start-x': `${p.startX}px`,
            '--start-y': `${p.startY}px`,
            '--mid-x': `${p.midX}px`,
            '--mid-y': `${p.midY}px`,
            '--end-x': `${p.endX}px`,
            '--end-y': `${p.endY}px`,
            '--rot-end': `${p.rotEnd}deg`,
            '--duration': p.duration,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default EvolutionEffect;