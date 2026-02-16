import React from 'react';

const UnlockModal = ({ isOpen, onClose, newStage, ITEMS, lang = 'ko' }) => {
  if (!isOpen) return null;

  // [수정] 일본어 데이터 추가
  const TEXT = {
    ko: { title: "아이템 추가!", food: "음식", activity: "활동", confirm: "확인", teen: "청소년", adult: "성인" },
    en: { title: "Items Added!", food: "Food", activity: "Activity", confirm: "Confirm", teen: "Teen", adult: "Adult" },
    jp: { title: "アイテム追加！", food: "食べ物", activity: "活動", confirm: "確認", teen: "青少年", adult: "大人" } 
  };

  const t = TEXT[lang] || TEXT['ko'];

  const STAGE_LEVELS = { 'child': 1, 'teen': 2, 'college': 3 };
  const unlockedItems = ITEMS.filter(item => item.unlock === (STAGE_LEVELS[newStage] || 0));
  const foodItems = unlockedItems.filter(i => i.type === 'food');
  const activityItems = unlockedItems.filter(i => i.type === 'activity');

  const stageName = t[newStage] || newStage;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border-[3px] border-hobi-black rounded-[20px] w-[85%] max-w-[320px] overflow-hidden shadow-[0_8px_0_0_#1B1F4B]">
        <div className="p-4 text-center border-b-1 border-hobi-black">
          <h2 className="text-xl font-bold text-hobi-black">{t.title}</h2>
          <p className="text-xs text-gray-600 mt-1">{t.desc}</p>
        </div>

        <div className="p-5 max-h-[260px] overflow-y-auto text-s space-y-4">
          {unlockedItems.length === 0 ? (
            <p className="text-center">...</p>
          ) : (
            <>
              {foodItems.length > 0 && (
                <div>
                  <h3 className="font-bold text-hobi-black mb-1">{t.food}</h3>
                  <ul className="list-disc pl-5 text-hobi-black space-y-1">
                    {foodItems.map(item => <li key={item.id}>{item[lang] || item.name}</li>)}
                  </ul>
                </div>
              )}
              {activityItems.length > 0 && (
                <div>
                  <h3 className="font-bold text-hobi-black mb-1">{t.activity}</h3>
                  <ul className="list-disc pl-5 text-hobi-black space-y-1">
                    {activityItems.map(item => <li key={item.id}>{item[lang] || item.name}</li>)}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4 flex justify-center border-t-1 border-hobi-black">
          <button onClick={onClose} className="w-full text-hobi-black font-bold active:shadow-none active:translate-y-[4px] transition-all">
            {t.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnlockModal;