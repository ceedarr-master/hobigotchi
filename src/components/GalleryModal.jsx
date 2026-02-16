import React, { useMemo } from 'react';
import { GalleryThumbnail } from './GalleryThumbnail';
import { CHARACTER_INFO } from '../data/evolutionData';

const GalleryModal = ({ isOpen, onClose, collection, t, lang }) => {
  if (!isOpen) return null;

  // 1. 데이터를 스테이지별로 분류하고 카운트 계산
  const { galleryData, totalCount, unlockedCount } = useMemo(() => {
    const stages = [
      { id: 'child', label: t('Stage 1') || 'Stage 1', prefix: 'child_', bg: 'bg-[#d9f2f2]' },
      { id: 'teen', label: t('Stage 2') || 'Stage 2', prefix: 'teen_', bg: 'bg-[#e7e1ff]' },
      { id: 'college', label: t('Stage 3') || 'Stage 3', prefix: 'college_', bg: 'bg-[#ffe8e8]' },
      { id: 'adult', label: t('Stage Final') || 'Stage Final', prefix: 'adult_', bg: 'bg-[#f2f2f2]' },
    ];

    let total = 0;
    let unlocked = 0;

    const sections = stages.map(stage => {
      const ids = Object.keys(CHARACTER_INFO).filter(key => key.startsWith(stage.prefix));
      const sectionUnlocked = ids.filter(id => collection.includes(id)).length;
      
      total += ids.length;
      unlocked += sectionUnlocked;

      return {
        ...stage,
        ids,
        countText: `(${sectionUnlocked}/${ids.length})`
      };
    });

    return { galleryData: sections, totalCount: total, unlockedCount: unlocked };
  }, [collection, t]);

  return (
    <div className="absolute inset-0 z-[200] bg-black/40 flex items-center justify-center p-10">
      <div className="bg-[#fff9e6] w-max-[350px] h-[70vh] rounded-[30px] border-[3px] border-hobi-black flex flex-col shadow-[0_8px_0_0_#1b1f4b] overflow-hidden">
        
        {/* 헤더 섹션 */}
        <div className="p-4 pb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-center flex-1 ml-6">{t('gallery')}</h3>
            <button onClick={onClose} className="text-xl">X</button>
          </div>

          {/* 전체 통계 바 (스크린샷 반영) */}
          <div className="bg-[#ffcc4d] border-[2px] border-hobi-black rounded-lg p-2 flex justify-between items-center px-2 mb-2">
            <span className="font-bold">{t('TOTAL') || '전체'}</span>
            <span className="font-bold">({unlockedCount}/{totalCount})</span>
          </div>
        </div>

        {/* 리스트 섹션 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
          {galleryData.map((section) => (
            <div key={section.id} className="mb-8 last:mb-0">
              <div className="flex justify-between items-end mb-2 border-b-2 border-hobi-black pb-1">
                <h3 className="text-lg font-bold">{section.label}</h3>
                <span className="text-sm font-bold opacity-70">{section.countText}</span>
              </div>
              
              <div className="grid grid-cols-5 gap-5 p-2">
                {section.ids.map(id => (
                  <div key={id} className="flex flex-col items-center">
                    <GalleryThumbnail 
                      id={id} 
                      isUnlocked={collection.includes(id)} 
                      themeBg={section.bg} 
                    />
                    {/* 획득 시 이름 표시 (선택 사항) */}
                    {collection.includes(id) && (
                      <span className="text-[11px] mt-1 text-center truncate w-full">
                        {CHARACTER_INFO[id]?.name?.[lang] || CHARACTER_INFO[id]?.name?.ko}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;