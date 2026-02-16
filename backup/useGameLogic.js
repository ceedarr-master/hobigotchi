import { useState, useEffect } from 'react';
import { CHILD_BASE_STATS, determineNextEvolution } from '../data/evolutionData';
import { BUBBLES } from '../data/textData';
import { INITIAL_STATS } from '../data/gameConfig';

const safeParse = (key, fallback) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`데이터 초기화됨: ${key}`, e);
    return fallback;
  }
};

const CHILD_CHARACTERS = ['child_debut', 'child_chestnut', 'child_joseon', 'child_goodboy', 'child_blueberry'];

export const useGameLogic = () => {
  // --- 1. State 선언 ---
  
  const [stats, setStats] = useState(() => safeParse('hobigotchi_stats', { ...INITIAL_STATS, r: 0, b: 0, g: 0, y: 0, minHp: 70 })
  );

  const [collection, setCollection] = useState(() => {
    const loaded = safeParse('hobigotchi_collection', ['egg']);
    return Array.isArray(loaded) ? loaded : ['egg'];
  });

  const [hatchStep, setHatchStep] = useState(() => {
    const savedStats = safeParse('hobigotchi_stats', null);
    return (savedStats && savedStats.stage && savedStats.stage !== 'egg') ? 'complete' : 'discovery';
  });

  const [activeAction, setActiveAction] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isEvolution, setIsEvolution] = useState(false);
  const [evolutionStage, setEvolutionStage] = useState('none');
  const [history, setHistory] = useState(() => JSON.parse(window.localStorage.getItem('hobigotchi_history')) || { items: {}, actions: {} });
  
  const [evolutionStep, setEvolutionStep] = useState('none');
  const [randomSpeech, setRandomSpeech] = useState(null);
  
  // [신규] 엔딩 스텝: 0(미진행), 2(완료멘트), 3(대사공개), 4(버튼변경)
  // Step 1(진화 대기)은 evolutionStep='ready'로 처리됨
  const [endingStep, setEndingStep] = useState(0); 

  const [showSettings, setShowSettings] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  // --- 2. useEffect ---
  useEffect(() => { window.localStorage.setItem('hobigotchi_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { window.localStorage.setItem('hobigotchi_history', JSON.stringify(history)); }, [history]);
  useEffect(() => { window.localStorage.setItem('hobigotchi_collection', JSON.stringify(collection));}, [collection]);

  useEffect(() => {
    if (stats.turn > stats.maxTurn && stats.stage !== 'adult' && evolutionStep === 'none' && hatchStep === 'complete') {
      setEvolutionStep('ready');
    }
  }, [stats.turn, stats.maxTurn, stats.stage, evolutionStep, hatchStep]);
  
  // --- 3. Helper Functions & Handlers ---

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

    setStats(prev => ({
      ...prev,
      stage: nextStage,
      characterId: targetId,
      turn: 1,
      maxTurn: nextStage === 'teen' ? 13 : (nextStage === 'college' ? 15 : 0),
    }));

    setHatchStep('complete');
    
    // 강제 진화 시 엔딩 처리
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
      
      const nextCharId = determineNextEvolution(stats.stage, stats, history);
      
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
      
      // [수정] 성인 진화라면 엔딩 Step 2(완료 멘트)부터 시작
      if (nextStage === 'adult') {
          setEndingStep(2);
      }
      updateRandomSpeech();
    }, 1000);
  };

  const handleEvolutionContinue = () => {
    // 성인 단계에서는 이 함수가 호출되지 않도록 UI에서 제어하지만, 안전장치 추가
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

  // [신규] 엔딩 단계 진행 버튼 핸들러
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
          
          setStats(prev => ({ 
          ...prev, stage: 'child', characterId: randomCharId, turn: 1, maxTurn: 10,
          r: baseStats?.r || 0, b: baseStats?.b || 0, g: baseStats?.g || 0, y: baseStats?.y || 0, minHp: 100
        }));

        // [추가] ★★★ 여기서 컬렉션에 추가해야 함 ★★★
        setCollection(prev => {
           if (prev.includes(randomCharId)) return prev;
           return [...prev, randomCharId];
        });

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

  return {
    stats, lang, setLang, collection, hatchStep, activeAction, setActiveAction,
    clickCount, isShaking, isEvolution, evolutionStage, evolutionStep, randomSpeech,
    endingStep, // [신규 export]
    showSettings, setShowSettings, showGallery, setShowGallery,
    handleHardReset, handleForceEvolution,
    handleEvolutionStart, handleEvolutionContinue, handleModalClose, 
    handleEndingNext, // [신규 export]
    handleNextStep, handleItemClick, handleBasicAction
  };
};