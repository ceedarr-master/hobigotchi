// src/components/StatGroup.jsx
import React from 'react';
import StatGauge from './StatGauge';

const StatGroup = ({ stats, t, isHatching = false }) => (
  <section className={`
    bg-white border-[3px] rounded-[20px] flex flex-col shadow-none mx-5 mb-6
    ${isHatching 
      ? 'h-[80px] px-4 border-hobi-black justify-center' // 부화 단계: 높이 80px, 검정 테두리, 수직 중앙 정렬
      : 'border-hobi-green-d p-4 gap-1'             // 일반 단계: 기존 스타일
    }
  `}>
    {/* 1행: 성장/부화 게이지 - 항상 표시 */}
    <StatGauge 
      label={t('growth')} 
      value={(stats.turn / stats.maxTurn) * 100} 
      isGrowth={true} 
    />
    
    {/* 부화 중이 아닐 때만 세부 스탯 표시 */}
    {!isHatching && (
      <div className="grid grid-cols-3 gap-3 mt-2">
        <StatGauge label={t('hp')} value={stats.hp} />
        <StatGauge label={t('clean')} value={stats.clean} />
        <StatGauge label={t('love')} value={stats.love} />
      </div>
    )}
  </section>
);

export default StatGroup;