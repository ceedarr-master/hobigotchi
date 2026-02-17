import React from 'react';
import ActionGroup from './ActionGroup';
import SubMenuList from './SubMenuList';
import EvolutionActionGroup from './EvolutionActionGroup';
import { ButtonXL, ButtonM } from './Buttons';

const STAGE_LEVELS = { 'egg': 0, 'child': 1, 'teen': 2, 'college': 3, 'adult': 4 };

const InteractionArea = ({ 
  hatchStep, evolutionStage, activeAction, ITEMS, ACTION_THEMES, 
  onItemClick, onActionClick, onNextStep, t, currentStage,
  evolutionStep, onEvolutionStart, onEvolutionContinue, lang,
  sysTheme, endingStep, onEndingNext, onRestart,
  onShare
}) => {
  
  if (evolutionStage === 'flash') return <div className="mt-auto z-20 min-h-[120px]" />;

  const getFilteredItems = () => {
    const currentLevel = STAGE_LEVELS[currentStage] || 1; 
    return ITEMS.filter(item => {
      if (item.type !== activeAction) return false;
      return currentLevel >= (item.unlock || 1);
    });
  };

  // [Step 1] 진화 대기
  if (evolutionStep === 'ready') {
    return (
      <div className="mt-auto z-20 min-h-[120px] px-5 pb-10">
        <ButtonXL onClick={onEvolutionStart} theme="sys">
          {t('confirm')}
        </ButtonXL>
      </div>
    );
  }

  // [Step 2~] 진화 완료
  if (evolutionStep === 'completed') {
    
    // 성인 엔딩
    if (currentStage === 'adult') {
      return (
        <div className="absolute bottom-10 w-full flex justify-center z-50 px-5">
           
           {/* Step 2 ~ 9: "다음" 버튼 */}
           {endingStep >= 2 && endingStep <= 9 && (
             <ButtonXL onClick={onEndingNext} theme="sys">
               {t('action_next')}
             </ButtonXL>
           )}

           {/* Step 10: 공유 & 다시하기 (최종 화면) */}
           {endingStep >= 10 && (
             <div className="flex justify-between w-full items-end">
                {/* 공유하기 */}
                <ButtonM 
                  label={t('share')} 
                  icon="/assets/icons/share.svg" 
                  theme={sysTheme} 
                  onClick={onShare}
                  isActive={false}
                />
                
                {/* 다시하기 */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute -top-15 right-0 w-max z-50 pointer-events-none animate-bounce">
                    <div className="relative bg-hobi-black border-hobi-black px-4 py-2">
                      <span className="font-pixel text-sm font-bold text-hobi-white whitespace-nowrap">
                        {t('ask_restart')}
                      </span>
                      <div className="absolute -bottom-2 right-[23px] -translate-x-1/2 w-4 h-4 bg-hobi-black rotate-45"></div>
                    </div>
                  </div>
                  <ButtonM 
                    label={t('restart')} 
                    icon="/assets/icons/undo.svg" 
                    theme={sysTheme} 
                    onClick={onRestart} 
                    isActive={false}
                  />
                </div>
             </div>
           )}
        </div>
      );
    }

    // 일반 진화
    return (
      <div className="mt-auto z-20 min-h-[120px]">
        <div className="w-full">
          <EvolutionActionGroup 
            t={t} 
            theme={sysTheme} 
            onShare={onShare} 
            onNext={onEvolutionContinue} 
            nextLabel={t('continue')}
          />
        </div>
      </div>
    );
  }

  // 평상시
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
            theme={sysTheme} 
            onShare={onShare}
            onNext={onNextStep}
          />
        ) : (
          <div className="px-5 pb-10">
            <ButtonXL onClick={onNextStep}>
              {hatchStep === 'discovery' ? t('start') : t('action_hatch')}
            </ButtonXL>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionArea;