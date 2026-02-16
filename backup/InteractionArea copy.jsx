import React from 'react';
import ActionGroup from './ActionGroup';
import SubMenuList from './SubMenuList';
import EvolutionActionGroup from './EvolutionActionGroup';
import { ButtonXL, ButtonM } from './Buttons'; // [수정] ButtonM 추가

const STAGE_LEVELS = { 'egg': 0, 'child': 1, 'teen': 2, 'adult': 3 };

const InteractionArea = ({ 
  hatchStep, evolutionStage, activeAction, ITEMS, ACTION_THEMES, 
  onItemClick, onActionClick, onNextStep, t, currentStage,
  evolutionStep, onEvolutionStart, onEvolutionContinue, lang,
  sysTheme, endingStep, onEndingNext, onRestart // [신규 props 추가]
}) => {
  
  if (evolutionStage === 'flash') return <div className="mt-auto z-20 min-h-[120px]" />;

  const getFilteredItems = () => {
    const currentLevel = STAGE_LEVELS[currentStage] || 1; 
    return ITEMS.filter(item => {
      if (item.type !== activeAction) return false;
      return currentLevel >= (item.unlock || 1);
    });
  };

  // [3] 진화 대기 상태 (Step 1)
  if (evolutionStep === 'ready') {
    return (
      <div className="mt-auto z-20 min-h-[120px] px-5 pb-10">
        <ButtonXL onClick={onEvolutionStart} theme="sys">
          {lang === 'ko' ? '확인하기' : (lang === 'jp' ? '確認する' : 'Confirm')}
        </ButtonXL>
      </div>
    );
  }

  // [4] 진화 완료 상태
  if (evolutionStep === 'completed') {
    
    // ----------------------------------------------------------------
    // [성인 엔딩 시퀀스] : currentStage가 'adult'일 때만 독자적 버튼 흐름
    // ----------------------------------------------------------------
    if (currentStage === 'adult') {
      return (
        <div className="absolute bottom-10 w-full flex justify-center z-50 px-5">
           
           {/* Step 2: "우와!" 버튼 */}
           {endingStep === 2 && (
             <ButtonXL onClick={onEndingNext} theme="sys">
               {lang === 'ko' ? '우와!' : (lang === 'en' ? 'Wow!' : 'うわー！')}
             </ButtonXL>
           )}

           {/* Step 3: "다음이 기대돼!" 버튼 */}
           {endingStep === 3 && (
             <ButtonXL onClick={onEndingNext} theme="sys">
               {lang === 'ko' ? '다음이 기대돼!' : (lang === 'en' ? 'Looking forward to it!' : '次が楽しみ！')}
             </ButtonXL>
           )}

           {/* Step 4: 공유 & 다시하기 (ButtonM) */}
           {endingStep >= 4 && (
             <div className="flex justify-between w-full max-w-[300px] items-end">
                {/* 공유하기 버튼 */}
                <ButtonM 
                  label={t('share') || "공유"} 
                  icon="/assets/icons/share.svg" // 공유 아이콘 경로 (확인 필요)
                  theme={sysTheme} 
                  onClick={() => alert('준비 중입니다!')} 
                  isActive={false}
                />
                
                {/* 다시하기 버튼 + 말풍선 */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute -top-10 bg-white border-2 border-hobi-black rounded-lg px-2 py-1 text-xs font-bold whitespace-nowrap animate-bounce shadow-sm">
                    {lang === 'ko' ? "다시 키워볼래요?" : "Restart?"}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r-2 border-b-2 border-hobi-black rotate-45"></div>
                  </div>
                  <ButtonM 
                    label={t('start') || "다시하기"} 
                    icon="/assets/icons/arrow-clockwise.svg" // 아이콘 경로 (확인 필요)
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

    // [일반 진화] 성인이 아닐 땐 기존 EvolutionActionGroup 사용 (이어하기)
    return (
      <div className="mt-auto z-20 min-h-[120px]">
        <div className="w-full">
          <EvolutionActionGroup 
            t={t} 
            theme={sysTheme} 
            onShare={() => alert('공유하기 기능은 준비중입니다!')}
            onNext={onEvolutionContinue} 
            nextLabel={currentStage === 'teen' ? (lang === 'ko' ? '이어하기' : 'Continue') : t('start')}
          />
        </div>
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
            theme={sysTheme} 
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