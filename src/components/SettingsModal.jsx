import React, { useState } from 'react';
import { ButtonL } from './Buttons';

const SettingsModal = ({ isOpen, onClose, t, lang, onLangChange }) => {
  const [view, setView] = useState('menu'); 

  if (!isOpen) return null;

  // [방어 코드] t 함수가 없으면 키 그대로 반환
  const safeT = t || ((key) => key);

  const CONTENT = {
    ko: {
      guide: [
        "호비고치는 j-hope를 키우는 게임입니다.",
        "알 > 어린이 > 청소년 > 성인 총 네 단계가 있으며 성인이 되면 게임 종료입니다.",
        "어떤 음식을 먹는지, 어떤 활동을 하느냐에 따라 최종 결과(성인)가 달라집니다.",
        "체력, 청결, 감성 세가지 스탯을 잘 관리해주세요!"
      ],
      devTitle1: "⋰˚★ 개발한 사람",
      devDesc1: "싣ㅏ (x.com/_ceedarr)",
      devTitle2: "⋰˚☆ 의견/문의",
      devDesc2: "spin-spin.co.kr/ceedarr",
      devTitle3: "⋰˚★ 개발자 한마디",
      devDesc3: "정호석은 셀카좀 올리셈. 님 이쁘고 나도 님 이쁜거 알아서 그래요. 암튼 생일 축하하고."
    },
    en: {
      guide: [
        "Hobigotchi is a game where you raise j-hope.",
        "There are 4 stages: Egg > Child > Teen > Adult. The game ends when he becomes an adult.",
        "The final result depends on what food he eats and what activities he does.",
        "Please manage HP, Cleanliness, and Love stats well!"
      ],
      devTitle1: "⋰˚★ Developer",
      devDesc1: "Ceedarr (x.com/_ceedarr)",
      devTitle2: "⋰˚☆ Contact",
      devDesc2: "spin-spin.co.kr/ceedarr",
      devTitle3: "⋰˚★ Dev's Note",
      devDesc3: "Jung Hoseok, please upload some selfies. You are pretty and I know it. Anyway, happy birthday."
    },
    jp: {
      guide: [
        "ホビゴッチはj-hopeを育てるゲームです。",
        "卵 > 子供 > 青少年 > 大人 の全4段階があり、大人になるとゲーム終了です。",
        "どんな食べ物を食べ、どんな活動をするかによって、最終的な姿（大人）が変わります。",
        "体力、清潔、感性の3つのステータスをしっかり管理してください！"
      ],
      devTitle1: "⋰˚★ 開発者",
      devDesc1: "Ceedarr (x.com/_ceedarr)",
      devTitle2: "⋰˚☆ お問い合わせ",
      devDesc2: "spin-spin.co.kr/ceedarr",
      devTitle3: "⋰˚★ 開発者の一言",
      devDesc3: "チョン·ホソクは自撮りをアップして。あなたが綺麗なのは私も知ってるから。とにかく誕生日おめでとう。"
    }
  };

  const txt = CONTENT[lang] || CONTENT['ko'];

  const renderHeader = (title) => (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        {view !== 'menu' && (
          <button onClick={() => setView('menu')} className="text-xl">〈〈</button>
        )}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <button onClick={() => { setView('menu'); onClose(); }} className="text-xl">X</button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-black/40 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[350px] rounded-[30px] border-[3px] border-hobi-black p-4 shadow-[0_8px_0_0_#1b1f4b] flex flex-col min-h-[374px]">
        
        {view === 'menu' && (
          <>
            {renderHeader(safeT('settings'))}
            <div className="flex flex-col gap-4">
              <ButtonL label={safeT('guide')} icon=">" onClick={() => setView('guide')} />
              <ButtonL label={safeT('lang')} icon=">" onClick={() => setView('lang')} />
              <ButtonL label={safeT('dev')} icon=">" onClick={() => setView('dev')} />
            </div>
          </>
        )}

        {view === 'guide' && (
          <>
            {renderHeader(safeT('guide'))}
            <div className="text-hobi-lg leading-relaxed overflow-y-auto pr-2 h-[280px] scrollbar-hide">
              {txt.guide.map((line, index) => (
                <p key={index} className="mb-4">{line}</p>
              ))}
            </div>
          </>
        )}

        {view === 'lang' && (
          <>
            {renderHeader(safeT('lang'))}
            <div className="flex flex-col gap-4">
              <ButtonL label="한글" icon="🇰🇷" onClick={() => onLangChange('ko')} />
              <ButtonL label="English" icon="🇺🇸" onClick={() => onLangChange('en')} />
              <ButtonL label="日本語" icon="🇯🇵" onClick={() => onLangChange('jp')} />
            </div>
          </>
        )}

        {view === 'dev' && (
          <>
            {renderHeader(safeT('dev'))}
            <div className="text-hobi-lg leading-relaxed overflow-y-auto h-[280px] scrollbar-hide">
              <p className="font-bold mb-2">{txt.devTitle1}</p>
              <p className="mb-4">{txt.devDesc1}</p>
              <p className="font-bold mb-2">{txt.devTitle2}</p>
              <p className="mb-4">{txt.devDesc2}</p>
              <p className="font-bold mb-2">{txt.devTitle3}</p>
              <p>{txt.devDesc3}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;