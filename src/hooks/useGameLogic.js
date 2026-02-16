import { useState, useEffect } from 'react';
import { CHILD_BASE_STATS, determineNextEvolution, CHARACTER_INFO } from '../data/evolutionData';
import { BUBBLES } from '../data/textData';
import { INITIAL_STATS } from '../data/gameConfig';

const CHILD_CHARACTERS = ['child_debut', 'child_chestnut', 'child_joseon', 'child_goodboy', 'child_blueberry'];
const GAME_URL = "https://hobigotchi.vercel.app"; // 배포 URL (임시)

// [안전한 파싱 함수] 
// 컴포넌트(hook) 외부인 이곳에 위치해야 문법 에러가 나지 않습니다.
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
  
  // INITIAL_STATS가 로드되지 않았을 경우를 대비한 기본값
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
  
  const [history, setHistory] = useState(() => 
    safeParse('hobigotchi_history', { items: {}, actions: {} })
  );
  
  const [evolutionStep, setEvolutionStep] = useState('none');
  const [randomSpeech, setRandomSpeech] = useState(null);
  const [endingStep, setEndingStep] = useState(0); 

  const [showSettings, setShowSettings] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // --- 2. useEffect (자동 저장) ---
  useEffect(() => { window.localStorage.setItem('hobigotchi_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { window.localStorage.setItem('hobigotchi_history', JSON.stringify(history)); }, [history]);
  useEffect(() => { window.localStorage.setItem('hobigotchi_collection', JSON.stringify(collection));}, [collection]);

  useEffect(() => {
    if (stats.turn > stats.maxTurn && stats.stage !== 'adult' && evolutionStep === 'none' && hatchStep === 'complete') {
      setEvolutionStep('ready');
    }
  }, [stats.turn, stats.maxTurn, stats.stage, evolutionStep, hatchStep]);
  
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
      turn: 1,
      maxTurn: nextStage === 'teen' ? 13 : (nextStage === 'college' ? 15 : 0),
    }));

    setHatchStep('complete');
    
    if (nextStage === 'adult') {
        setEndingStep(2); 
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
        turn: 1, 
        maxTurn: 999 
      }));

      setIsEvolution(false);
      setEvolutionStep('completed');
      
      if (nextStage === 'adult') {
          setEndingStep(2);
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
      
      return { ...prev, turn: 1, maxTurn: nextMaxTurn };
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
            ...prev, stage: 'child', characterId: randomCharId, turn: 1, maxTurn: 10,
            r: baseStats?.r || 0, b: baseStats?.b || 0, g: baseStats?.g || 0, y: baseStats?.y || 0, minHp: 100
          }));

          setHatchStep('hatched');
          setIsEvolution(false);
          updateRandomSpeech();
        }, 1000);
        setTimeout(() => setEvolutionStage('none'), 2500);
      }
    } else if (hatchStep === 'hatched') setHatchStep('complete');
  };

  const handleItemClick = (item) => {
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
    setHistory(prev => ({ ...prev, actions: { ...prev.actions, [type]: (prev.actions[type] || 0) + 1 } }));
    setStats(prev => {
      const hpChange = type === 'rest' ? 70 : 0; 
      const nextHp = Math.max(0, Math.min(100, prev.hp + hpChange));
      return {
        ...prev, clean: type === 'wash' ? Math.min(100, prev.clean + 50) : prev.clean,
        hp: nextHp, turn: prev.turn + 1, minHp: Math.min(prev.minHp, nextHp)
      };
    });
    updateRandomSpeech();
    setActiveAction(null);
  };
const handleShare = async () => {
    const charId = stats.characterId;
    // 캐릭터 이름 가져오기 (언어별 폴백 처리)
    const charInfo = CHARACTER_INFO[charId];
    const charName = (charInfo && charInfo.name && (charInfo.name[lang] || charInfo.name['ko'])) || "제이홉";

    let shareTitle = "Hobigotchi";
    let shareText = "";
    let hashtags = "";

    // 언어별 텍스트 설정
    if (lang === 'ko') {
      shareText = `제이홉이 [${charName}]으로 자랐어요! 💜`;
      hashtags = "호비고치,Hobigotchi,happyhobiday";
    } else if (lang === 'jp') {
      shareText = `私のホビは [${charName}] に育ちました! 💜`;
      hashtags = "Hobigotchi";
    } else {
      shareText = `My Hobi grew up into [${charName}]! 💜`;
      hashtags = "Hobigotchi";
    }

    // Level 2: 네이티브 공유 (Mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: GAME_URL,
        });
        return; // 공유 성공 시 종료
      } catch (err) {
        // 사용자가 취소하거나 에러 발생 시 트위터 폴백으로 넘어가지 않도록(선택사항) 하거나
        // 혹은 에러 로그만 찍고 넘어갑니다.
        console.log("Native share skipped/cancelled:", err);
      }
    }

    // Level 1: 트위터 공유 (PC / Fallback)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(GAME_URL)}&hashtags=${hashtags}`;
    window.open(twitterUrl, '_blank');
  };


  return {
    stats, lang, setLang, collection, hatchStep, activeAction, setActiveAction,
    clickCount, isShaking, isEvolution, evolutionStage, evolutionStep, randomSpeech,
    endingStep,
    showSettings, setShowSettings, showGallery, setShowGallery,
    handleHardReset, handleForceEvolution,
    handleEvolutionStart, handleEvolutionContinue, handleModalClose, 
    handleEndingNext,
    handleNextStep, handleItemClick, handleBasicAction,
    handleShare
  };
};