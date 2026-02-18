import React from 'react';
// 컴포넌트들
import useGameLoader from './hooks/useGameLoader';
import useGameLogic from './hooks/useGameLogic';
import LoadingModal from './components/LoadingModal'; 
import SettingsModal from './components/SettingsModal';
import GalleryModal from './components/GalleryModal';
import DeveloperMode from './components/DeveloperMode';
import EvolutionEffect from './components/EvolutionEffect';
import UnlockModal from './components/UnlockModal';
import GameHeader from './components/GameHeader';
import InfoSection from './components/InfoSection';
import CharacterDisplay from './components/CharacterDisplay';
import InteractionArea from './components/InteractionArea';

import { CHARACTER_INFO } from './data/evolutionData';
import { ITEMS } from './data/itemData';
import { SYS_THEME, EVOLUTION_THEMES } from './data/themeData';
import { UI_TEXT } from './data/textData';

const ICON_BASE = "/assets/icons";
const BG_PATH = "/assets/images/bg_img";

const ACTION_THEMES = {
  food: { bg: 'bg-hobi-orange-l', bgPressed: 'bg-hobi-orange-d', border: 'border-hobi-orange-d', shadow: 'shadow-[0_8px_0_0_#ffad5a]', shadow_s: 'shadow-[0_4px_0_0_#ffad5a]', icon: `${ICON_BASE}/cookie.svg` },
  activity: { bg: 'bg-hobi-pink-l', border: 'border-hobi-pink-d', bgPressed: 'bg-hobi-pink-d', shadow: 'shadow-[0_8px_0_0_#ffa69b]', shadow_s: 'shadow-[0_4px_0_0_#ffa69b]', icon: `${ICON_BASE}/grid.svg` },
  wash: { bg: 'bg-hobi-blue-l', border: 'border-hobi-blue-d', bgPressed: 'bg-hobi-blue-d', shadow: 'shadow-[0_8px_0_0_#78ceef]', shadow_s: 'shadow-[0_4px_0_0_#78ceef]', icon: `${ICON_BASE}/drop.svg` },
  rest: { bg: 'bg-hobi-purple-l', border: 'border-hobi-purple-d', bgPressed: 'bg-hobi-purple-d', shadow: 'shadow-[0_8px_0_0_#aa96da]', shadow_s: 'shadow-[0_4px_0_0_#aa96da]', icon: `${ICON_BASE}/moon-star.svg` }
};

const getCharName = (id, lang) => {
  const info = CHARACTER_INFO[id];
  return (info && info.name && (info.name[lang] || info.name['ko'])) || id;
};

const preloadSrcList = [
  // 파티클
  '/assets/particles/blue_diamond.svg',
  '/assets/particles/blue_ellipse.svg',
  '/assets/particles/blue_rectangle.svg',
  '/assets/particles/blue_star.svg',
  '/assets/particles/pink_diamond.svg',
  '/assets/particles/pink_ellipse.svg',
  '/assets/particles/pink_rectangle.svg',
  '/assets/particles/pink_star.svg',
  '/assets/particles/purple_diamond.svg',
  '/assets/particles/purple_ellipse.svg',
  '/assets/particles/purple_rectangle.svg',
  '/assets/particles/purple_star.svg',
  '/assets/particles/final_diamond_1.svg',
  '/assets/particles/final_diamond_2.svg',
  '/assets/particles/final_diamond_3.svg',
  '/assets/particles/final_diamond_4.svg',
  '/assets/particles/final_ellipse_1.svg',
  '/assets/particles/final_ellipse_2.svg',
  '/assets/particles/final_ellipse_3.svg',
  '/assets/particles/final_ellipse_4.svg',
  '/assets/particles/final_rectangle_1.svg',
  '/assets/particles/final_rectangle_2.svg',
  '/assets/particles/final_rectangle_3.svg',
  '/assets/particles/final_rectangle_4.svg',
  '/assets/particles/final_star_1.svg',
  '/assets/particles/final_star_2.svg',
  '/assets/particles/final_star_3.svg',
  '/assets/particles/final_star_4.svg',
  // 아이콘
  '/assets/icons/cupcake.svg',
  '/assets/icons/cookie.svg',
  '/assets/icons/food.svg',
  '/assets/icons/chat-dots.svg',
  '/assets/icons/book-open.svg',
  '/assets/icons/workout.svg',
  '/assets/icons/puzzle.svg',
  // 배경 이미지
  '/assets/images/bg_img/ev_blue_completed.svg',
  '/assets/images/bg_img/ev_blue_processing.svg',
  '/assets/images/bg_img/ev_final_completed.svg',
  '/assets/images/bg_img/ev_final_processing.svg',
  '/assets/images/bg_img/ev_pink_completed.svg',
  '/assets/images/bg_img/ev_pink_processing.svg',
  '/assets/images/bg_img/ev_purple_completed.svg',
  '/assets/images/bg_img/ev_purple_processing.svg',
  '/assets/images/bg_img/main.svg',
];

function App() {
  const { isLoaded, progress } = useGameLoader(preloadSrcList);
  const game = useGameLogic();
  const t = (key) => (UI_TEXT[game.lang] && UI_TEXT[game.lang][key]) || UI_TEXT['ko'][key] || key;

  if (!isLoaded) {
    return <LoadingModal progress={progress} />;
  }

  // [테마 결정 로직]
  const getEvolutionTheme = () => {
    if (game.hatchStep !== 'complete') return EVOLUTION_THEMES.evolution_1;
    const currentStage = game.stats.stage;
    const isEvolutionFinished = game.evolutionStep === 'completed' || game.evolutionStep === 'modal';

    if (isEvolutionFinished) {
      if (currentStage === 'teen') return EVOLUTION_THEMES.evolution_2;
      if (currentStage === 'college') return EVOLUTION_THEMES.evolution_3;
      if (currentStage === 'adult') return EVOLUTION_THEMES.evolution_4; 
    }

    if (currentStage === 'child') return EVOLUTION_THEMES.evolution_2;
    if (currentStage === 'teen') return EVOLUTION_THEMES.evolution_3;
    if (currentStage === 'college') return EVOLUTION_THEMES.evolution_4;
    if (currentStage === 'adult') return EVOLUTION_THEMES.evolution_4;

    return EVOLUTION_THEMES.evolution_1;
  };

  const activeTheme = getEvolutionTheme();

  const getBgImage = () => {
    if (game.evolutionStep !== 'none') {
      if (game.evolutionStep === 'completed' || game.evolutionStep === 'modal') {
        return `${BG_PATH}/${activeTheme.bg_done}`;
      }
      return `${BG_PATH}/${activeTheme.bg_process}`;
    }
    if (game.hatchStep === 'hatched') return `${BG_PATH}/${EVOLUTION_THEMES.evolution_1.bg_done}`;
    if (game.hatchStep !== 'complete') return `${BG_PATH}/${EVOLUTION_THEMES.evolution_1.bg_process}`;
    return `${BG_PATH}/main.svg`;
  };

  const getSpeechText = () => {
    if (game.evolutionStep === 'process') return "";
    if (game.evolutionStep === 'ready') return t('speech_ready');
    if (game.evolutionStep === 'completed') {
      const charData = CHARACTER_INFO[game.stats.characterId];
      // 캐릭터 고유 대사가 없으면 기본 감사 인사 출력 (하드코딩 제거됨)
      return (charData?.dialogue?.[game.lang]) || t('speech_thanks');
    }
    if (game.hatchStep === 'discovery') return t('egg_greet');
    if (game.hatchStep === 'hatching_start') return t('egg_help');
    if (game.hatchStep === 'hatching_process') return game.isShaking ? t('egg_help') : t('egg_help');
    if (game.hatchStep === 'hatched') {
       const charData = CHARACTER_INFO[game.stats.characterId];
       return (charData?.dialogue?.[game.lang]) || t('egg_greet');
    }
    if (game.hatchStep === 'complete') {
      if (game.randomSpeech) return game.randomSpeech;
      const charData = CHARACTER_INFO[game.stats.characterId];
      // 캐릭터 고유 대사가 없으면 기본 감사 인사 출력 (하드코딩 제거됨)
      return (charData?.dialogue?.[game.lang]) || t('speech_thanks');
    }

    return t('egg_greet');
  };

  return (
    <div 
      className="min-h-screen flex justify-center bg-white font-pixel text-hobi-black overflow-hidden relative select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{ touchAction: 'manipulation' }}
    >
      <DeveloperMode onReset={game.handleHardReset} stats={game.stats} onForceEvolution={game.handleForceEvolution} />
      
      <EvolutionEffect stage={game.evolutionStage} theme={activeTheme.effect} />
      
      <div className="w-full max-w-[440px] max-h-[956px] h-screen flex flex-col relative bg-cover bg-center transition-all duration-500" 
           style={{ backgroundImage: `url('${getBgImage()}')` }}>
        
        <GameHeader 
          hatchStep={game.hatchStep} 
          setShowGallery={game.setShowGallery} 
          setShowSettings={game.setShowSettings} 
          logoTheme={game.evolutionStep !== 'none' || game.hatchStep !== 'complete' ? activeTheme.logo : 'logo_main'} 
          headerColor={game.evolutionStep !== 'none' || game.hatchStep !== 'complete' ? activeTheme.color : 'bg-hobi-green-d'}
          lang={game.lang} 
          disabled={game.evolutionStep === 'process'} 
        />
        
        <InfoSection 
          hatchStep={game.hatchStep} stats={game.stats} clickCount={game.clickCount} t={t}
          evolutionStep={game.evolutionStep} charInfo={CHARACTER_INFO}
          lang={game.lang} getCharName={getCharName}
          endingStep={game.endingStep}
        />
        
        <CharacterDisplay 
          hatchStep={game.hatchStep} stats={game.stats} isShaking={game.isShaking || game.evolutionStep === 'ready'} 
          isEvolution={game.isEvolution} speechText={getSpeechText()} 
        />
        
        {/* [수정] 대기 상태일 때(isEvolutionPending) 투명도 0, 클릭 방지 */}
        <div className={`flex-shrink-0 h-[120px] w-full relative transition-opacity duration-300 ${game.isEvolutionPending ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <InteractionArea 
            hatchStep={game.hatchStep} evolutionStage={game.evolutionStage} activeAction={game.activeAction} 
            ITEMS={ITEMS} ACTION_THEMES={ACTION_THEMES} 
            onItemClick={game.handleItemClick} 
            onActionClick={(key) => {
              if (key === 'wash' || key === 'rest') game.handleBasicAction(key);
              else game.setActiveAction(game.activeAction === key ? null : key);
            }} 
            onNextStep={game.handleNextStep} t={t} currentStage={game.stats.stage}
            evolutionStep={game.evolutionStep} 
            onEvolutionStart={game.handleEvolutionStart} 
            onEvolutionContinue={game.handleEvolutionContinue}
            lang={game.lang}
            sysTheme={SYS_THEME} 
            endingStep={game.endingStep} 
            onEndingNext={game.handleEndingNext}
            onRestart={game.handleHardReset}
            onShare={game.handleShare}
          />
        </div>

        <SettingsModal isOpen={game.showSettings} onClose={() => game.setShowSettings(false)} t={t} lang={game.lang} onLangChange={game.setLang} />
        <GalleryModal 
          isOpen={game.showGallery} 
          onClose={() => game.setShowGallery(false)} 
          collection={game.collection} 
          lang={game.lang}
          t={t} 
        />        
        <UnlockModal isOpen={game.evolutionStep === 'modal'} onClose={game.handleModalClose} newStage={game.stats.stage} ITEMS={ITEMS} lang={game.lang}/>
      </div>
    </div>
  );
}

export default App;