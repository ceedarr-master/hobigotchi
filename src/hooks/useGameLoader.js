// src/hooks/useGameLoader.js
import { useState, useEffect } from 'react';

const useGameLoader = (imageUrls) => {
  const [isLoaded, setIsLoaded] = useState(false); // 로딩 완료 여부
  const [progress, setProgress] = useState(0); // 진행률 (0~100)

  useEffect(() => {
    // 이미지가 없으면 바로 완료 처리
    if (!imageUrls || imageUrls.length === 0) {
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;
    const total = imageUrls.length;

    // 이미지 하나씩 미리 불러오기
    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;
      
      const onComplete = () => {
        loadedCount++;
        // 진행률 계산
        const percent = Math.round((loadedCount / total) * 100);
        setProgress(percent);
        
        // 전부 로드되면 완료 신호 보냄
        if (loadedCount === total) {
          // 너무 빨리 끝나면 깜빡거릴 수 있으니 아주 살짝 여유를 둠 (선택사항)
          setTimeout(() => setIsLoaded(true), 500);
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete; // 에러가 나도 멈추지 않음
    });
  }, [imageUrls]);

  // App.jsx에서 필요한 것만 리턴
  return { isLoaded, progress };
};

export default useGameLoader;