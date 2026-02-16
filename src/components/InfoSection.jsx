import React from 'react';
import StatGroup from './StatGroup';
import Dialog from './Dialog';

const InfoSection = ({ hatchStep, stats, clickCount, t, evolutionStep, charInfo, lang, getCharName, endingStep }) => {
  
  const containerClass = "z-20 px-5 mt-24 w-full"; 
  const charName = getCharName && stats.characterId ? getCharName(stats.characterId, lang) : "Hobi";
  // 1. 진화 대기 (Step 1)
  if (evolutionStep === 'ready') {
    // "어라 {이름}의 상태가...?"
    // 주의: 여기서 이름은 아직 '진화 전(대학생)' 이름이어야 자연스럽지만, 
    // 로직상 현재 stats.characterId가 바뀌기 전이므로 그대로 사용하면 됨.
    let text = "";
    if (lang === 'ko') text = `어라 ${charName}의 상태가...?`;
    else if (lang === 'jp') text = `あれ？${charName}の状態が...？`;
    else text = `Huh? ${charName} is...?`;

    return (
      <div className={containerClass}><Dialog>{text}</Dialog></div>
    );
  }

  // 2. 진화 진행 중
  if (evolutionStep === 'process') {
    const text = lang === 'jp' ? "進化中..." : (lang === 'en' ? "Evolving..." : "진화 중...");
    return <div className={containerClass}><Dialog>{text}</Dialog></div>;
  }

  // 3. 진화 완료 (청소년/성인)
  if (evolutionStep === 'completed') {
    
    // [수정] 성인 엔딩 분기 처리
    if (stats.stage === 'adult') {
      // Step 2: "최종 성장 완료!!"
      if (endingStep === 2) {
        let doneText = "최종 성장 완료!!";
        if (lang === 'en') doneText = "Final Evolution Complete!!";
        else if (lang === 'jp') doneText = "最終成長完了!!";
        return <div className={containerClass}><Dialog>{doneText}</Dialog></div>;
      }
      
      // Step 3, 4: "{성인 이름}로 자랐어!"
      if (endingStep >= 3) {
        let growText = "";
        if (lang === 'ko') growText = `"${charName}"으로 성장했어☆!`;
        else if (lang === 'en') growText = `Grew into "${charName}"☆!`;
        else if (lang === 'jp') growText = `"${charName}"に育ったよ☆!`;
        return <div className={containerClass}><Dialog>{growText}</Dialog></div>;
      }
    }

    // 일반 진화 멘트 (기존 유지)
    let suffix = "!!";
    if (lang === 'ko') suffix = "으로 자랐어!!";
    else if (lang === 'en') suffix = " has grown up!!";
    else if (lang === 'jp') suffix = "に成長しました!!"; 

    return (
      <div className={containerClass}><Dialog>{charName}{suffix}</Dialog></div>
    );
  }

  // 4. 알 부화 성공 (어린이)
  if (hatchStep === 'hatched') {
    const name = getCharName ? getCharName(stats.characterId, lang) : "Child";
    let suffix = "!!";
    if (lang === 'ko') suffix = "이 태어났다!";
    else if (lang === 'en') suffix = " is born!";
    else if (lang === 'jp') suffix = "が生まれました!";

    return (
      <div className={containerClass}><Dialog>{name}{suffix}</Dialog></div>
    );
  }

  // 5. 평상시
  return (
    <div className="z-20 mt-24 w-full"> 
      {hatchStep === 'hatching_process' ? (
        <StatGroup stats={{...stats, turn: clickCount, maxTurn: 10}} t={t} isHatching={true} />
      ) : hatchStep === 'complete' ? (
        <StatGroup stats={stats} t={t} isHatching={false} />
      ) : (
        <div className="px-5"><Dialog>{t(hatchStep)}</Dialog></div>
      )}
    </div>
  );
};

export default InfoSection;