// src/components/SpeechBubble.jsx
import React from 'react';

const SpeechBubble = ({ children, className = "" }) => {
  if (!children) return null;

  return (
    <div className={`absolute z-20 animate-bounce-slow w-full flex justify-center ${className}`}>
      {/* [수정] 
        1. whitespace-nowrap 제거 -> 자동 줄바꿈 허용
        2. max-w-[200px] 추가 -> 최대 너비 제한 (원하는 너비로 숫자 조절 가능)
        3. w-fit 추가 -> 짧은 문구일 때는 너비가 글자 길이에 맞춰지게 함
      */}
      <div className="bg-white border-[1px] border-hobi-black px-4 py-2 rounded-[20px] shadow-[0px_3px_0_0_#1b1f4b] relative max-w-[80%] w-fit mx-auto">
        <p className="text-hobi-base font-bold text-center break-words whitespace-pre-wrap leading-snug">
          {children}
        </p>
        
        {/* 꼬리 디자인 유지 */}
        <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-[1px] border-b-[1px] shadow-[3px_3px_0_0_#1b1f4b] border-hobi-black rotate-45"></div>
      </div>
    </div>
  );
};

export default SpeechBubble;