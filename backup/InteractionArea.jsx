import React from 'react';
import ActionGroup from './ActionGroup';
import SubMenuList from './SubMenuList';
import EvolutionActionGroup from './EvolutionActionGroup';
import { ButtonXL } from './Buttons';

const STAGE_LEVELS = { 'egg': 0, 'child': 1, 'teen': 2, 'adult': 3 };

const InteractionArea = ({ 
  hatchStep, evolutionStage, activeAction, 
  ITEMS, ACTION_THEMES, 
  onItemClick, onActionClick, onNextStep, 
  t, currentStage,
  evolutionStep, onEvolutionStart, onEvolutionContinue, 
  endingStep, onEndingNext, onReset,
  lang, sysTheme // [신규] App.jsx에서 받아온 시스템 테마 객체
}) => {
  
  if (evolutionStage === 'flash') return <div className="mt-auto z-20 min-h-[120px]" />;

  const getFilteredItems = () => {
    const currentLevel = STAGE_LEVELS[currentStage] || 1; 
    return ITEMS.filter(item => {
      if (item.type !== activeAction) return false;
      return currentLevel >= (item.unlock || 1);
    });
  };

  // 1. 알 발견 & 부화 과정 (기존 유지)
  if (hatchStep !== 'complete') {
    return (
      <div className="absolute bottom-10 w-full flex justify-center z-50 px-6">
        <button 
          onClick={onNextStep}
          className={`
            w-full py-4 rounded-full text-xl font-bold text-hobi-black 
            bg-white border-2 border-hobi-black shadow-[0_4px_0_0_#1b1f4b]
            transform transition-transform active:scale-95 animate-bounce
          `}
        >
          {hatchStep === 'discovery' ? t('discovery') : 
           hatchStep === 'hatching_start' ? t('hatching_start') : 
           hatchStep === 'hatched' ? t('hatched') : t('hatching_process')}
        </button>
      </div>
    );
  }

  // 2. 진화 진행 중 (애니메이션) - 버튼 숨김
  if (evolutionStep === 'process') return null;

  // [3] 진화 대기 상태
  if (evolutionStep === 'ready') {
    return (
      <div className="mt-auto z-20 min-h-[120px] px-5 pb-10">
        {/* ButtonXL은 theme="sys" 문자열을 사용하므로 그대로 둠 */}
        <ButtonXL onClick={onEvolutionStart} theme="sys">
          {lang === 'ko' ? '확인하기' : (lang === 'jp' ? '確認する' : 'Confirm')}
        </ButtonXL>
      </div>
    );
  }

  // [4] 진화 완료 상태
if (evolutionStep === 'completed') {
    return (
      <div className="absolute bottom-10 w-full flex justify-center z-50">
        {/* [수정 포인트] 
           currentStage가 'adult'(성인)라면 '이어하기' 버튼을 숨깁니다.
           대신 '처음으로(리셋)' 버튼을 보여주거나, 아무것도 안 보여줄 수 있습니다.
        */}
        
        {currentStage !== 'adult' ? (
          // [기존] 성인이 아닐 땐 '이어하기' 버튼 표시
          <button 
            onClick={onEvolutionContinue}
            className={`
              px-8 py-3 rounded-full text-xl font-bold text-white shadow-lg
              transform transition-transform active:scale-95 animate-bounce
              ${sysTheme?.bg || 'bg-hobi-green-d'} 
            `}
          >
            {t('continue') || "이어하기"}
          </button>
        ) : (
          // [신규] 성인(엔딩)일 땐 '다시 시작' 버튼 표시 (선택 사항)
          <button 
            onClick={() => window.location.reload()} // 간단히 새로고침으로 리셋
            className="px-8 py-3 rounded-full text-xl font-bold text-white bg-hobi-black shadow-lg animate-pulse"
          >
            {t('restart') || "다시 키우기"}
          </button>
        )}
      </div>
    );
  }

  // [5] 평상시
  return (
    <div className="mt-auto z-20 min-h-[120px]">
      <div className="w-full">
        {hatchStep === 'complete' ? (
          <>
            {activeAction && (
              <SubMenuList 
                items={getFilteredItems()} 
                theme={ACTION_THEMES[activeAction]} 
                onItemClick={onItemClick}
                lang={lang}
              />
            )}
            <ActionGroup 
              themes={ACTION_THEMES} 
              activeAction={activeAction} 
              onActionClick={onActionClick} 
              lang={lang}
            />
          </>
        ) : hatchStep === 'hatched' ? (
          <EvolutionActionGroup 
            t={t} 
            theme={sysTheme} // [적용] 받아온 시스템 테마(객체) 사용
            onShare={() => alert('공유!')}
            onNext={onNextStep}
          />
        ) : (
          <div className="px-5 pb-10">
            <ButtonXL onClick={onNextStep}>
              {hatchStep === 'discovery' ? t('start') : (lang === 'ko' ? '부화' : 'Hatch')}
            </ButtonXL>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionArea;