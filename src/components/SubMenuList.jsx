import React, { useRef, useEffect } from 'react';
import { ButtonS } from './Buttons';

const SubMenuList = ({ items, theme, onItemClick, lang }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [items]);

  // [수정] 아이템을 위/아래 줄로 분리 (인덱스 홀/짝 기준)
  // 이렇게 나눠서 렌더링하면 위아래 버튼 너비가 서로 영향을 주지 않습니다.
  const row1 = items.filter((_, i) => i % 2 === 0);
  const row2 = items.filter((_, i) => i % 2 === 1);

  return (
    <div className="absolute bottom-[130px] left-0 w-full z-30 overflow-x-auto scrollbar-hide px-6">
      <div ref={scrollRef} className="flex flex-col gap-3 w-max pt-2 pb-1">
        
        {/* 첫 번째 줄 */}
        <div className="flex gap-2">
          {row1.map((item) => (
            <ButtonS 
              key={item.id}
              label={item[lang]} 
              icon={item.icon} 
              theme={theme} 
              onClick={() => onItemClick(item)} 
              lang={lang}
            />
          ))}
        </div>

        {/* 두 번째 줄 */}
        <div className="flex gap-2">
          {row2.map((item) => (
            <ButtonS 
              key={item.id}
              label={item[lang]} 
              icon={item.icon} 
              theme={theme} 
              onClick={() => onItemClick(item)} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default SubMenuList;