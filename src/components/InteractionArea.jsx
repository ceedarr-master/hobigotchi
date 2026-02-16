import React from 'react';
import ActionGroup from './ActionGroup';
import SubMenuList from './SubMenuList';
import EvolutionActionGroup from './EvolutionActionGroup';
import { ButtonXL, ButtonM } from './Buttons';

// [수정] 대학생(college) 레벨 추가 및 성인(adult) 레벨 정의
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

  // [Step 1] 진화 대기 상태: '확인하기' 버튼
  if (evolutionStep === 'ready') {
    return (
      <div className="mt-auto z-20 min-h-[120px] px-5 pb-10">
        <ButtonXL onClick={onEvolutionStart} theme="sys">
          {lang === 'ko' ? '확인하기' : (lang === 'jp' ? '確認する' : 'Confirm')}
        </ButtonXL>
      </div>
    );
  }

  // [Step 2~4] 진화 완료 상태
  if (evolutionStep === 'completed') {
    
    // ----------------------------------------------------------------
    // [성인 엔딩 시퀀스] (currentStage === 'adult' 일 때)
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
               {lang === 'ko' ? '축하해!!' : (lang === 'en' ? 'Congrats!!' : 'ありがとう！')}
             </ButtonXL>
           )}
           {endingStep === 4 && (
             <ButtonXL onClick={onEndingNext} theme="sys">
               {lang === 'ko' ? '여기까지 오느라 고생했어.' : (lang === 'en' ? 'Good job getting here!' : 'ここまでお疲れ様!')}
             </ButtonXL>
           )}
           {endingStep === 5 && (
             <ButtonXL onClick={onEndingNext} theme="sys">
               {lang === 'ko' ? '게임은 여기까지지만...' : (lang === 'en' ? 'Game ends here, but...' : 'ゲームはここまでだけど…')}
             </ButtonXL>
           )}
           {endingStep === 6 && (
             <ButtonXL onClick={onEndingNext} theme="sys">
               {lang === 'ko' ? '이다음은 뭘까?' : (lang === 'en' ? 'What will come next?' : 'この次は何かな？')}
             </ButtonXL>
           )}
          {endingStep === 7 && (
           <ButtonXL onClick={onEndingNext} theme="sys">
               {lang === 'ko' ? '제이홉의 미래, 엄청 기대돼!' : (lang === 'en' ? 'Can\'t wait for Hobi\'s next!' : 'これからのホビ, 超楽しみ！')}
             </ButtonXL>
          )}

           {/* Step 4: 공유 & 다시하기 (ButtonM) */}
           {endingStep >= 8 && (
             <div className="flex justify-between w-full items-end">
                {/* 공유하기 버튼 */}
                <ButtonM 
                  label={t('share') || "공유"} 
                  icon="/assets/icons/share.svg" 
                  theme={sysTheme} 
                  onClick={onShare}
                  isActive={false}
                />
                
                {/* 다시하기 버튼 + 말풍선 (직접 구현) */}
                <div className="relative flex flex-col items-center">
                  
                  {/* [수정] 말풍선 직접 구현 (확실하게 보이도록 설정) */}
                  <div className="absolute -top-15 left-2 -translate-x-1/2 w-max z-50 pointer-events-none animate-bounce">
                    <div className="relative bg-hobi-black border-hobi-black px-4 py-2">
                      <span className="font-pixel text-sm font-bold text-hobi-white whitespace-nowrap">
                        {lang === 'ko' ? "다시 키워볼래요?" : "Restart?"}
                      </span>
                      {/* 말풍선 꼬리 */}
                      <div className="absolute -bottom-2 left-8/11 -translate-x-1/2 w-4 h-4 bg-hobi-black rotate-45"></div>
                    </div>
                  </div>

                  <ButtonM 
                    label={t('start') || "다시하기"} 
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

    // [일반 진화]
    return (
      <div className="mt-auto z-20 min-h-[120px]">
        <div className="w-full">
          <EvolutionActionGroup 
            t={t} 
            theme={sysTheme} 
            onShare={onShare}
            onNext={onEvolutionContinue} 
            nextLabel={currentStage === 'teen' ? (lang === 'ko' ? '이어하기' : 'Continue') : t('start')}
          />
        </div>
      </div>
    );
  }

  // [평상시]
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
              {hatchStep === 'discovery' ? t('start') : (lang === 'ko' ? '부화' : 'Hatch')}
            </ButtonXL>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionArea;