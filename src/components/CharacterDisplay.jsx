import React from 'react';
import SpeechBubble from './SpeechBubble';
import CharacterFrame from './CharacterFrame';

const CharacterDisplay = ({ hatchStep, stats, isShaking, isEvolution, speechText }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center relative z-10">
      <SpeechBubble className="bottom-[85%] left-1/2 -translate-x-1/2">
        {speechText}
      </SpeechBubble>

      <CharacterFrame 
        characterId={stats.characterId} 
        isEgg={hatchStep !== 'complete' && hatchStep !== 'hatched'} 
        isShaking={isShaking}
        isEvolution={isEvolution}
        turn={stats.turn}
      />
    </div>
  );
};

export default CharacterDisplay;