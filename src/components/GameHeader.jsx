import React from 'react';
import { ButtonXS } from './Buttons';

const GameHeader = ({ hatchStep, setShowGallery, setShowSettings, logoTheme, lang, disabled, headerColor }) => {
  
  const logoPath = `/assets/images/logo/${logoTheme}_${lang}.svg`;

  return (
    <header className="absolute top-0 left-0 w-full p-5 z-10 flex justify-between items-center pointer-events-auto">
      
      {/* 1. 좌측: 갤러리 버튼 */}
      <div className="w-10 h-10 flex items-center justify-center">
        {hatchStep === 'complete' ? (
          <ButtonXS 
            icon="/assets/icons/book-open.svg" 
            onClick={() => setShowGallery(true)} 
            disabled={disabled}
            bgColor={headerColor} // [추가] 색상 전달
          />
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* 2. 중앙: 로고 */}
      <div className="h-[60px] flex items-center justify-center">
        <img 
          src={logoPath} 
          alt="Hobigotchi Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* 3. 우측: 설정 버튼 */}
      <div className="w-10 h-10 flex items-center justify-center">
        <ButtonXS 
          icon="/assets/icons/cog-four.svg" 
          onClick={() => setShowSettings(true)} 
          disabled={disabled}
          bgColor={headerColor} // [추가] 색상 전달
        />
      </div>

    </header>
  );
};

export default GameHeader;