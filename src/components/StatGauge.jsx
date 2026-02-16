// src/components/StatGauge.jsx
import React from 'react';

const StatGauge = ({ label, value, isGrowth = false }) => {
  // 스탯 수치에 따른 색상 결정 (디자인 시스템 준수)
  const getGaugeColor = (val) => {
    if (isGrowth) return 'bg-hobi-blue-d'; // 성장 게이지는 네이비색 (#1b1f4b)
    if (val > 30) return 'bg-hobi-green-d'; // Good (100-30)
    if (val > 10) return 'bg-hobi-orange-d'; // Warning (30-10)
    return 'bg-hobi-pink-d'; // Bad (10-0)
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {/* 라벨: font_size_s (11px) 적용 */}
      <span className="text-[11px] font-bold text-hobi-text shrink-0 min-w-[24px]">
        {label}
      </span>

      {/* 게이지 바 배경: border_s (1px) 적용 */}
      <div className="flex-grow h-3 bg-white border-[1px] border-hobi-black rounded-full overflow-hidden">
        <div 
          className={`h-full ${getGaugeColor(value)} transition-all duration-500 ease-out`} 
          style={{ width: `${Math.min(100, value)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatGauge;