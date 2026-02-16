// src/components/CharacterFrame.jsx
import React, { useState, useEffect } from 'react';

// [중요] 여기에 캐릭터 ID와 이미지 장수를 정확히 적어야 합니다.
// 만약 여기에 없는 캐릭터는 기본값 1장으로 처리됩니다.
const CHARACTER_CONFIG = {
  'egg': 1,
  'child_blueberry': 6,
  'child_chestnut': 6,
  'child_debut': 7,
  'child_goodboy': 5,
  'child_joseon': 6,

  'teen_660660': 7,
  'teen_acorn': 5,
  'teen_cherry': 7,
  'teen_chick': 4,
  'teen_cottoncandy': 7,
  'teen_internetboy': 6,
  'teen_run': 4,
  'teen_tear': 6,
  'teen_teengirl': 6,

  'college_bambi': 8,
  'college_butter': 6,
  'college_emo': 7,
  'college_explorer': 6,
  'college_satto': 9,
  'college_street': 6,
  'college_swan': 5,
  'college_thorn': 6,
  
  'adult_apple': 1,
  'adult_baseball': 1,
  'adult_brooklyn': 1,
  'adult_cafe': 1,
  'adult_crown': 1,
  'adult_dad': 1,
  'adult_diva': 1,
  'adult_flower': 1,
  'adult_fragile': 1,
  'adult_groom': 1,
  'adult_hat': 1,
  'adult_iampet': 1,
  'adult_lvprince': 1,
  'adult_lvprincess': 1,
  'adult_maid': 1,
  'adult_mum': 1,
  'adult_revolve': 1,
  'adult_rockstar': 1,
  'adult_soldier': 1,
  'adult_soldierprincess': 1,
  'adult_stage': 1,
  'adult_strawberry': 1,
  'adult_tired': 1,
  'adult_trainer': 1,
  'adult_wet': 1,
};

const CharacterFrame = ({ characterId, isEgg, isShaking, isEvolution, turn }) => {
  const [imgVar, setImgVar] = useState(1);
  const maxVariations = CHARACTER_CONFIG[characterId] || 1;

  useEffect(() => {
    if (!isEgg) {
      // 턴이 바뀔 때마다 랜덤 번호 변경
      const randomNum = Math.floor(Math.random() * maxVariations) + 1;
      setImgVar(randomNum);
    } else {
      setImgVar(1);
    }
  }, [turn, isEgg, characterId, maxVariations]);

  // [수정] 조건문 제거: 무조건 {이름}_{번호}.png 형식을 따릅니다.
  const imagePath = isEgg 
    ? "/assets/images/photos/egg_1.png" 
    : `/assets/images/photos/${characterId}_${imgVar}.png`;

  /* [디버깅] 개발자 도구(F12) > Console 창에서 이 로그를 확인해보세요.
     만약 404 에러가 뜬다면, 이 경로에 실제 파일이 있는지 확인해야 합니다. */
  console.log(`[CharacterFrame] Loading image: ${imagePath}`);

  const eggPath = "M98.333 3.5C112.325 3.5 125.278 9.46535 136.618 18.6416C147.951 27.812 157.963 40.4078 166.26 54.3389C182.793 82.0992 193.167 116.287 193.167 141.969C193.167 194.041 150.671 236.188 98.333 236.188C45.9949 236.187 3.5 194.041 3.5 141.969C3.5 116.287 13.8733 82.0991 30.4062 54.3389C38.7031 40.4078 48.7155 27.812 60.0488 18.6416C71.3893 9.46551 84.3416 3.50009 98.333 3.5Z";

  return (
    <div className={`relative flex items-center justify-center 
      ${isShaking ? 'animate-evolve-shake' : 'animate-rotate-slow'}
    `}>
      {isEgg ? (
        <div className={`relative w-[200px] h-[240px] transition-all duration-300
          ${isEvolution ? 'brightness-0 invert animate-evolve-flash' : ''}
        `}>
          <svg viewBox="0 0 197 240" className="absolute inset-0 w-full h-full">
            <path d={eggPath} fill="white" stroke="#1b1f4b" strokeWidth="7" />
            <defs>
              <clipPath id="eggClip"><path d={eggPath} /></clipPath>
            </defs>
            <image href={imagePath} width="100%" height="100%" clipPath="url(#eggClip)" preserveAspectRatio="xMidYMid slice" />
          </svg>
        </div>
      ) : (
        <div className={`
          w-[228px] h-[296px] bg-white border-[7px] border-hobi-black rounded-[30px] 
          overflow-hidden flex items-center justify-center transition-all duration-300
          ${isEvolution ? 'brightness-0 invert animate-evolve-flash' : ''}
        `}>
          <img 
            key={imagePath}
            src={imagePath} 
            className="w-full h-full object-cover" 
            alt={characterId}
            onError={(e) => {
              console.error(`이미지 로드 실패: ${imagePath}`);
              // 엑박 대신 임시로 보여줄 이미지 (필요시 수정)
              // e.target.src = "/images/photos/egg_1.png"; 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterFrame;