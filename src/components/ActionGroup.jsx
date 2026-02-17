import React from 'react';
import { ButtonM } from './Buttons';

const ActionGroup = ({ themes, activeAction, onActionClick, lang = 'ko' }) => {
  // [추가] 카테고리 버튼용 다국어 맵
  const labels = {
    ko: { food: '음식', activity: '활동', wash: '씻기', rest: '자기' },
    en: { food: 'Food', activity: 'Activity', wash: 'Wash', rest: 'rest' },
    jp: { food: '食べ物', activity: '活動', wash: '洗う', rest: '休み' }
  };

  const t = labels[lang] || labels['ko'];

  return (
    <div className="flex justify-between px-6 pb-8">
      <ButtonM 
        label={t.food} // '음식' 대신 다국어 적용
        icon={themes.food.icon} 
        theme={themes.food} 
        isActive={activeAction === 'food'}
        onClick={() => onActionClick('food')} 
      />
      <ButtonM 
        label={t.activity} 
        icon={themes.activity.icon} 
        theme={themes.activity} 
        isActive={activeAction === 'activity'}
        onClick={() => onActionClick('activity')} 
      />
      <ButtonM 
        label={t.wash} 
        icon={themes.wash.icon} 
        theme={themes.wash} 
        isActive={activeAction === 'wash'}
        onClick={() => onActionClick('wash')} 
      />
      <ButtonM 
        label={t.rest} 
        icon={themes.rest.icon} 
        theme={themes.rest} 
        isActive={activeAction === 'rest'}
        onClick={() => onActionClick('rest')} 
      />
    </div>
  );
};

export default ActionGroup;