import React from 'react';
import { ButtonM } from './Buttons';

// [수정] 인자에 'nextLabel'을 추가했습니다.
const EvolutionActionGroup = ({ onShare, onNext, t, theme, nextLabel }) => {
  
  // 테마가 없으면 기본 블루 테마 사용 (방어 코드)
  const activeTheme = theme || {
    bg: 'bg-hobi-blue-l',
    bgPressed: 'bg-hobi-blue-d',
    border: 'border-hobi-blue-d',
    shadow: 'shadow-[0_8px_0_0_#78ceef]'
  };

  return (
    <div className="flex justify-between items-center gap-4 pb-10 w-full px-5 animate-fade-in">
      {/* 공유 버튼 (왼쪽) */}
      <ButtonM 
        label={t('share')} 
        icon="/assets/icons/send.svg"
        theme={activeTheme}
        onClick={onShare}
      />
      
      {/* 다음 단계/키워보자 버튼 (오른쪽) */}
      <ButtonM 
        /* [수정] nextLabel이 있으면 그것을 쓰고, 없으면 기본값 t('start') 사용 */
        label={nextLabel || t('start')} 
        icon="/assets/icons/play.svg"
        theme={activeTheme}
        onClick={onNext}
      />
    </div>
  );
};

export default EvolutionActionGroup;