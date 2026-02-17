import React from 'react';

const BG_PATH = "/assets/images/bg_img";

const GameContainer = ({ children, bgImage, onContextMenu, onDragStart }) => {
  return (
    <div 
      className="min-h-screen flex justify-center bg-white font-pixel text-hobi-black overflow-hidden relative select-none"
      onContextMenu={onContextMenu}
      onDragStart={onDragStart}
      style={{ touchAction: 'manipulation' }}
    >
      <div 
        className="w-full max-w-[440px] max-h-[956px] h-screen flex flex-col relative bg-cover bg-center transition-all duration-500" 
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        {children}
      </div>
    </div>
  );
};

export default GameContainer;