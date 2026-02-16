// src/components/LoadingModal.jsx
import React from 'react';

const LoadingModal = ({ progress }) => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-[#e6f7ff] select-none">
      
      {/* Loading... 텍스트 */}
      <h2 className="text-xl text-slate-700 font-galmuri mb-4 tracking-widest">
        Loading...
      </h2>
      
      {/* 프로그레스 바 (스크린샷 스타일) */}
      <div className="w-64 h-4 bg-white border-2 border-[#78ceef] rounded-full overflow-hidden p-[2px]">
        <div 
          className="h-full bg-[#78ceef] rounded-full transition-all duration-300 ease-out" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      {/* 퍼센트 표시 (선택사항 - 필요 없으면 지우셔도 됩니다) */}
      <p className="mt-2 text-sm text-[#78ceef] font-galmuri opacity-80">
        {progress}%
      </p>

    </div>
  );
};

export default LoadingModal;