import React from 'react';
import StatGroup from './StatGroup';
import Dialog from './Dialog';

const InfoSection = ({ hatchStep, stats, clickCount, t, evolutionStep, charInfo, lang, getCharName, endingStep }) => {
  
  const containerClass = "z-20 mt-24 p-5 w-full h-[100px] flex flex-col justify-center"; 
  const charName = getCharName && stats.characterId ? getCharName(stats.characterId, lang) : "Hobi";
  
  // 1. 진화 대기
  if (evolutionStep === 'ready') {
    const text = t('evo_ready').replace('{name}', charName);
    return <div className={containerClass}><Dialog>{text}</Dialog></div>;
  }

  // 2. 진화 중
  if (evolutionStep === 'process') {
    return <div className={containerClass}><Dialog>{t('evo_process')}</Dialog></div>;
  }

  // 3. 진화 완료 (청소년/성인)
  if (evolutionStep === 'completed') {
    
    // [성인 엔딩 시퀀스 로직]
    if (stats.stage === 'adult') {
      // Step 2: "최종 성장 완료!!"
      if (endingStep === 2) {
        return <div className={containerClass}><Dialog>{t('evo_adult_done')}</Dialog></div>;
      }
      
      // Step 3: "{name}으로 성장했어!"
      if (endingStep === 3) {
        const text = t('evo_adult_grown').replace('{name}', charName);
        return <div className={containerClass}><Dialog>{text}</Dialog></div>;
      }

      // Step 4 ~ 9: ending_1 ~ ending_6
      // (Step 4 -> ending_1, Step 5 -> ending_2 ... Step 9 -> ending_6)
      if (endingStep >= 4 && endingStep <= 9) {
        const key = `ending_${endingStep - 3}`; // 4-3=1, 9-3=6
        return <div className={containerClass}><Dialog>{t(key)}</Dialog></div>;
      }

      // Step 10 (Final): 다시 "{name}으로 성장했어!" (마무리 화면)
      if (endingStep >= 10) {
        const text = t('evo_adult_grown').replace('{name}', charName);
        return <div className={containerClass}><Dialog>{text}</Dialog></div>;
      }
    }

    // 일반 진화 (Child -> Teen 등)
    const suffix = t('evo_normal_grown').replace('{name}', charName);
    return <div className={containerClass}><Dialog>{suffix}</Dialog></div>;
  }

  // 4. 부화 성공
  if (hatchStep === 'hatched') {
    const name = getCharName ? getCharName(stats.characterId, lang) : "Child";
    const text = t('hatch_born').replace('{name}', name);
    return <div className={containerClass}><Dialog>{text}</Dialog></div>;
  }

  // 5. 평상시
  return (
    <div className={containerClass}>
      {hatchStep === 'hatching_process' ? (
        <StatGroup stats={{stats, turn: clickCount, maxTurn: 10}} t={t} isHatching={true} />
      ) : hatchStep === 'complete' ? (
        <StatGroup stats={stats} t={t} isHatching={false} />
      ) : (
        <div className="px-0"><Dialog>{t(hatchStep)}</Dialog></div>
      )}
    </div>
  );
};

export default InfoSection;