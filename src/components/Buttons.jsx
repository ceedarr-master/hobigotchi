import React from 'react';

const baseStyle = "transition-all duration-100 font-pixel flex items-center shrink-0 cursor-pointer select-none";

// 1. Button XL 
export const ButtonXL = ({ children, onClick, theme = "sys", disabled }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`${baseStyle} w-full h-20 text-hobi-xl font-bold justify-center border-[3px] rounded-[20px] 
    ${theme === 'sys' ? 'bg-white border-hobi-black shadow-[0_8px_0_0_#1b1f4b]' : ''}
    ${disabled 
      ? 'opacity-50 cursor-not-allowed shadow-none translate-y-[4px]' 
      : 'hover:-translate-y-[2px] active:translate-y-[4px] active:shadow-none'
    }`}
  >
    {children}
  </button>
);

// 2. Button L (변경 없음)
export const ButtonL = ({ label, icon, onClick }) => (
  <button 
    onClick={onClick}
    className="transition-all duration-100 font-pixel flex items-center shrink-0 cursor-pointer select-none
    w-full h-20 px-5 justify-between border-[3px] border-hobi-black rounded-[20px] bg-white shadow-[0_8px_0_0_#1b1f4b] text-hobi-lg 
    hover:-translate-y-[2px] active:translate-y-[4px] active:shadow-none"
  >
    <span className="font-bold">{label}</span>
    {/* [수정] icon이 있을 때만 렌더링하도록 조건부 처리 */}
    {icon && (
      <span className="w-6 h-6 flex items-center justify-center text-hobi-xl">
        {typeof icon === 'string' && icon.startsWith('http') 
          ? <img src={icon} alt="" className="w-full h-full object-contain"/> 
          : icon}
      </span>
    )}
  </button>
);

// 3. Button Medium (M): 하단 메인 메뉴용 [수정됨]
export const ButtonM = ({ label, icon, theme, onClick, isActive }) => (
  <button 
    onClick={onClick}
    className={`${baseStyle} w-20 h-20 flex-col gap-1 justify-center border-[3px] rounded-[20px]
    ${theme.border} 
    ${isActive 
        ? `${theme.bgPressed} translate-y-[8px] shadow-none` // [수정] bgPressed 적용
        : `${theme.bg} ${theme.shadow} hover:-translate-y-[2px] active:translate-y-[8px] active:shadow-none`
    }`}
  >
    <img src={icon} alt={label} className="w-6 h-6 object-contain" />
    <span className="text-hobi-xs font-bold uppercase">{label}</span>
  </button>
);

// 4. Button Small (S): 세부 아이템 리스트용 [수정됨]
export const ButtonS = ({ label, icon, theme, onClick }) => (
  <button 
    onClick={onClick}
    className={`${baseStyle} w-max h-12 px-4 justify-between border-[3px] rounded-[15px]
    ${theme.bg} ${theme.border} ${theme.shadow_s} 
    hover:-translate-y-[2px] active:translate-y-[4px] active:shadow-none`} 
  >
    {/* 위 줄에서 theme.shadow_s 를 적용했습니다 (기존 하드코딩 제거) */}
    <span className="text-hobi-base font-bold">{label}</span>
    <img src={icon} alt="" className="w-6 h-6 object-contain" />
  </button>
);

// 5. Button XS (변경 없음)
export const ButtonXS = ({ icon, onClick, disabled, bgColor }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`w-10 h-10 rounded-[20px] flex items-center justify-center shrink-0 transition-all
    ${disabled 
      ? 'bg-gray-200 cursor-not-allowed opacity-50' 
      : `${bgColor || 'bg-hobi-green-d'} hover:-translate-y-0.5 active:translate-y-0`
    }`}
  >
    <img src={icon} alt="" className="w-6 h-6 object-contain" />
  </button>
);