import { useState, useEffect } from 'react';
import { CHILD_BASE_STATS, determineNextEvolution, CHARACTER_INFO } from '../data/evolutionData';
import { BUBBLES } from '../data/textData';
import { INITIAL_STATS } from '../data/gameConfig';
import { ITEMS } from '../data/itemData';

const CHILD_CHARACTERS = ['child_debut', 'child_chestnut', 'child_joseon', 'child_goodboy', 'child_blueberry'];
const GAME_URL = "https://hobigotchi.vercel.app"; 

const safeParse = (key, fallback) => {
  try {
    const saved = window.localStorage.getItem(key);
    if (!saved || saved === "undefined") return fallback;
    return JSON.parse(saved);
  } catch (e) {
    console.error(`Error parsing ${key}:`, e);
    return fallback;
  }
};

export const useGameLogic = () => {
  // --- 1. State 선언 ---
  
  const defaultStats = INITIAL_STATS || { hp: 100, clean: 100, love: 100, turn: 0, maxTurn: 10, stage: 'egg', characterId: 'egg' };

  const [stats, setStats] = useState(() => 
    safeParse('hobigotchi_stats', { ...defaultStats, r: 0, b: 0, g: 0, y: 0, minHp: 70 })
  );

  const [lang, setLang] = useState('ko');

  const [collection, setCollection] = useState(() => {
    const loaded = safeParse('hobigotchi_collection', ['egg']);
    return Array.isArray(loaded) ? loaded : ['egg'];
  });

  const [hatchStep, setHatchStep] = useState(() => {
    const saved = safeParse('hobigotchi_stats', null);
    return (saved && saved.stage && saved.stage !== 'egg') ? 'complete' : 'discovery';
  });

  const [activeAction, setActiveAction] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isEvolution, setIsEvolution] = useState(false);
  const [evolutionStage, setEvolutionStage] = useState('none');
  const [isEvolutionPending, setIsEvolutionPending] = useState(false);

  const [history, setHistory] = useState(() => 
    safeParse('hobigotchi_history', { items: {}, actions: {} })
  );
  
  // 성인 상태라면 새로고침 후에도 'completed'(엔딩 화면) 상태 유지
  const [evolutionStep, setEvolutionStep] = useState(() => {
    if (stats.stage === 'adult') return 'completed';
    return 'none';
  });

  const [randomSpeech, setRandomSpeech] = useState(null);

  // [수정 완료] 성인 상태라면 '10' (최종 버튼 화면)으로 복구
  const [endingStep, setEndingStep] = useState(() => {
    if (stats.stage === 'adult') return 10; // 2 -> 10 변경
    return 0;
  }); 

  const [showSettings, setShowSettings] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // --- 2. useEffect (자동 저장) ---
  useEffect(() => { window.localStorage.setItem('hobigotchi_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { window.localStorage.setItem('hobigotchi_history', JSON.stringify(history)); }, [history]);
  useEffect(() => { window.localStorage.setItem('hobigotchi_collection', JSON.stringify(collection));}, [collection]);

  // [성장 단계] 게이지가 찼을 때 -> Pending 상태 ON
  useEffect(() => {
    if (stats.turn >= stats.maxTurn && stats.stage !== 'adult' && evolutionStep === 'none' && hatchStep === 'complete' && !isEvolutionPending) {
      setIsEvolutionPending(true); 
    }
  }, [stats.turn, stats.maxTurn, stats.stage, evolutionStep, hatchStep, isEvolutionPending]);

  // [성장 단계] Pending 상태가 되면 -> 0.5초 뒤에 다음 단계로
  useEffect(() => {
    if (isEvolutionPending && hatchStep === 'complete') {
      const timer = setTimeout(() => {
        setEvolutionStep('ready');    
        setIsEvolutionPending(false); 
      }, 500); 

      return () => clearTimeout(timer);
    }
  }, [isEvolutionPending, hatchStep]);
  
  // --- 3. Handlers ---

  const handleHardReset = () => {
    window.localStorage.removeItem('hobigotchi_stats');
    window.localStorage.removeItem('hobigotchi_history');
    window.location.reload();
  };

  const updateRandomSpeech = () => {
    const stageKey = stats.stage;
    if (BUBBLES[stageKey] && BUBBLES[stageKey][lang]) {
      const texts = BUBBLES[stageKey][lang];
      setRandomSpeech(texts[Math.floor(Math.random() * texts.length)]);
    } else {
      setRandomSpeech(lang === 'ko' ? "안녕?" : "Hello");
    }
  };

  const handleForceEvolution = (targetId) => {
    let nextStage = 'child';
    if (targetId.startsWith('teen_')) nextStage = 'teen';
    else if (targetId.startsWith('college_')) nextStage = 'college';
    else if (targetId.startsWith('adult_')) nextStage = 'adult';

    setCollection(prev => {
        if (prev.includes(targetId)) return prev;
        return [...prev, targetId];
    });

    setStats(prev => ({
      ...prev,
      stage: nextStage,
      characterId: targetId,
      turn: 0,
      maxTurn: nextStage === 'teen' ? 13 : (nextStage === 'college' ? 15 : 0),
    }));

    setHatchStep('complete');
    setIsEvolutionPending(false); 
    
    if (nextStage === 'adult') {
        setEndingStep(2); // 강제 진화 시에는 처음부터 보여줌 (2)
        setEvolutionStep('completed');
    } else {
        setEvolutionStep('completed');
        setEvolutionStage('none');
    }
    
    setTimeout(() => updateRandomSpeech(), 50);
  };

  const handleEvolutionStart = () => {
    setEvolutionStep('process');
    setEvolutionStage('flash');
    setIsEvolution(true);

    const nextCharId = determineNextEvolution(stats.stage, stats, history);
    
    setCollection(prev => {
      if (prev.includes(nextCharId)) return prev;
      return [...prev, nextCharId];
    });

    setTimeout(() => {
      setEvolutionStage('confetti'); 
      
      let nextStage = '';
      if (stats.stage === 'child') nextStage = 'teen';
      else if (stats.stage === 'teen') nextStage = 'college';
      else if (stats.stage === 'college') nextStage = 'adult';
      
      setStats(prev => ({ 
        ...prev, 
        stage: nextStage, 
        characterId: nextCharId, 
        turn: 0, 
        maxTurn: 999 
      }));

      setIsEvolution(false);
      setEvolutionStep('completed');
      
      if (nextStage === 'adult') {
          setEndingStep(2); // 정상 진화 시에는 처음부터 보여줌 (2)
      }
      updateRandomSpeech();
    }, 1000);
  };

  const handleEvolutionContinue = () => {
    if (stats.stage === 'adult') return;

    setEvolutionStage('none');
    setEvolutionStep('modal');

    setStats(prev => {
      let nextStage = prev.stage;
      let nextMaxTurn = 10;
      if (nextStage === 'child') nextMaxTurn = 10;
      else if (nextStage === 'teen') nextMaxTurn = 13;
      else if (nextStage === 'college') nextMaxTurn = 15;
      
      return { ...prev, turn: 0, maxTurn: nextMaxTurn };
    });
  };

  const handleEndingNext = () => {
    setEndingStep(prev => prev + 1);
  };

  const handleModalClose = () => {
    setEvolutionStep('none');
    updateRandomSpeech();
  };

  const handleNextStep = () => {
    if (hatchStep === 'discovery') setHatchStep('hatching_start');
    else if (hatchStep === 'hatching_start') setHatchStep('hatching_process');
    else if (hatchStep === 'hatching_process') {
      if (clickCount < 9) {
        setClickCount(prev => prev + 1);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 200);
      } else {
        setClickCount(prev => prev + 1);
        setIsEvolutionPending(true);

        setTimeout(() => {
            setEvolutionStage('flash');
            setIsEvolution(true);
            
            setTimeout(() => {
              setEvolutionStage('confetti');
              const randomCharId = CHILD_CHARACTERS[Math.floor(Math.random() * CHILD_CHARACTERS.length)];
              const baseStats = CHILD_BASE_STATS[randomCharId];
              
              setCollection(prev => {
                if (prev.includes(randomCharId)) return prev;
                return [...prev, randomCharId];
              });
    
              setStats(prev => ({ 
                ...prev, stage: 'child', characterId: randomCharId, 
                turn: 0, 
                maxTurn: 10,
                r: baseStats?.r || 0, b: baseStats?.b || 0, g: baseStats?.g || 0, y: baseStats?.y || 0, minHp: 100
              }));
    
              setHatchStep('hatched');
              setIsEvolution(false);
              setIsEvolutionPending(false); 
              updateRandomSpeech();
            }, 1000);
            
            setTimeout(() => setEvolutionStage('none'), 2500);
        }, 500); 
      }
    } else if (hatchStep === 'hatched') setHatchStep('complete');
  };

  const handleItemClick = (item) => {
    if (isEvolutionPending) return;

    setHistory(prev => ({ ...prev, items: { ...prev.items, [item.id]: (prev.items[item.id] || 0) + 1 } }));
    setStats(prev => {
      const nextHp = Math.max(0, Math.min(100, prev.hp + item.hp));
      return {
        ...prev, hp: nextHp, clean: Math.max(0, Math.min(100, prev.clean + item.clean)), love: Math.max(0, Math.min(100, prev.love + item.love)),
        turn: prev.turn + 1, r: prev.r + (item.r || 0), b: prev.b + (item.b || 0), g: prev.g + (item.g || 0), y: prev.y + (item.y || 0),
        minHp: Math.min(prev.minHp, nextHp)
      };
    });
    updateRandomSpeech();
    setActiveAction(null);
  };

  const handleBasicAction = (type) => {
    if (isEvolutionPending) return;

    const itemId = type === 'wash' ? 'basic_wash' : 'basic_sleep';
    const itemData = ITEMS.find(item => item.id === itemId);

    if (!itemData) {
        console.error(`Item data not found for action: ${type} (mapped to ${itemId})`);
        return;
    }

    setHistory(prev => ({ ...prev, actions: { ...prev.actions, [type]: (prev.actions[type] || 0) + 1 } }));
    
    setStats(prev => {
      const changeHp = itemData.hp || 0;
      const changeClean = itemData.clean || 0;
      const changeLove = itemData.love || 0;
      const changeR = itemData.r || 0;
      const changeG = itemData.g || 0;
      const changeB = itemData.b || 0;
      const changeY = itemData.y || 0;

      const nextHp = Math.max(0, Math.min(100, prev.hp + changeHp));
      const nextClean = Math.max(0, Math.min(100, prev.clean + changeClean));
      const nextLove = Math.max(0, Math.min(100, prev.love + changeLove));

      return {
        ...prev, 
        hp: nextHp,
        clean: nextClean,
        love: nextLove,
        r: prev.r + changeR,
        g: prev.g + changeG,
        b: prev.b + changeB,
        y: prev.y + changeY,
        turn: prev.turn + 1, 
        minHp: Math.min(prev.minHp, nextHp)
      };
    });
    
    updateRandomSpeech();
    setActiveAction(null);
  };

  const handleShare = async () => {
    const charId = stats.characterId;
    const charInfo = CHARACTER_INFO[charId];
    const charName = (charInfo && charInfo.name && (charInfo.name[lang] || charInfo.name['ko'])) || "제이홉";

    let shareTitle = "Hobigotchi";
    let shareText = "";
    let hashtags = "";

    if (lang === 'ko') {
      shareText = `내 제이홉이 [${charName}]으로 자랐어요! 💜`;
      hashtags = "호비고치,Hobigotchi,ホビゴチ,HAPPYJHOPEDAY,제이홉,jhope";
    } else if (lang === 'jp') {
      shareText = `私のホビは [${charName}] に育ちました! 💜`;
      hashtags = "호비고치,Hobigotchi,ホビゴチ,HAPPYJHOPEDAY,제이홉,jhope";
    } else {
      shareText = `My Hobi grew up into [${charName}]! 💜`;
      hashtags = "호비고치,Hobigotchi,ホビゴチ,HAPPYJHOPEDAY,제이홉,jhope";
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: GAME_URL,
        });
        return; 
      } catch (err) {
        console.log("Native share skipped/cancelled:", err);
      }
    }

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(GAME_URL)}&hashtags=${hashtags}`;
    window.open(twitterUrl, '_blank');
  };

  return {
    stats, lang, setLang, collection, hatchStep, activeAction, setActiveAction,
    clickCount, isShaking, isEvolution, evolutionStage, evolutionStep, randomSpeech,
    endingStep, isEvolutionPending,
    showSettings, setShowSettings, showGallery, setShowGallery,
    handleHardReset, handleForceEvolution,
    handleEvolutionStart, handleEvolutionContinue, handleModalClose, 
    handleEndingNext,
    handleNextStep, handleItemClick, handleBasicAction,
    handleShare
  };
};

export default useGameLogic;