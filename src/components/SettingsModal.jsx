import React, { useState } from 'react';
import { ButtonL } from './Buttons'; // 경로가 맞는지 확인 필요

const SettingsModal = ({ isOpen, onClose, t, lang, onLangChange }) => {
  const [view, setView] = useState('menu'); 

  if (!isOpen) return null;

  // [방어 코드] t 함수가 없으면 키 그대로 반환
  const safeT = t || ((key) => key);

  const CONTENT = {
    ko: {
      guide: [
        "호비고치는 제이홉을 키우는 게임이에요. 알부터 시작해서 총 세단계를 거쳐 마지막 최종 진화까지 완료하면 게임 종료! 어떤 음식을 먹는지, 어떤 활동을 하느냐에 따라 최종 결과가 달라져요. 체력, 청결, 감성 세가지 스탯을 잘 관리해주세요! 어떤 제이홉으로 자라날지 궁금해요. 꼭 공유해주세요!"
      ],
      dev: [
        { label: "⋰˚★ 개발한 사람", desc: "싣ㅏ", url: "https://x.com/_ceedarr" },
        { label: "⋰˚☆ 의견/문의/새캐릭터", desc: "새로운 아이템이나 버그, 캐릭터 추가 요청 대환영!", url: "https://spin-spin.com/ceedarr" },
        { label: "⋰˚★ 개발자 한마디", desc: "정호석은 셀카좀 올리셈. 님 이쁘고 나도 님 이쁜거 알아서 그래요. 암튼 생일 축하하고." },
      ]
    },
    en: {
      guide: [
        "Hobigotchi is a game where you raise your very own j-hope. Starting from an egg, go through three stages of growth. The game is complete once he reaches his final evolution! Your final result will vary depending on the food he eats and the activities he does. Make sure to manage his three stats: HP, Hygiene, and Love! We can’t wait to see which j-hope he grows into. Don’t forget to share your results!"
      ],
      dev: [
        { label: "⋰˚★ Developer", desc: "Ceedarr", url: "https://x.com/_ceedarr" },
        { label: "⋰˚☆ Contact", desc: "New item, bug, or character addition requests are welcome!", url: "https://spin-spin.com/ceedarr" },
        { label: "⋰˚★ Dev's Note", desc: "Jung Hoseok, please upload some selfies. You are pretty and I know it. Anyway, happy birthday." }
      ],
    },
    jp: {
      guide: [
        "ホビゴッチは、j-hopeを育てるゲームです。 たまごから始まり、計3段階を経て最終進化まで完了すればゲームクリア！ 食べるごはんや活動の内容によって、最終的な姿が変わります。 「体力」「清潔」「感性」の3つのステータスをしっかり管理してあげてくださいね。 どんなj-hopeに成長するか楽しみですね。 ぜひシェアしてください！"
      ],
      dev: [
        { label: "⋰˚★ 開発者", desc: "Ceedarr", url: "https://x.com/_ceedarr" },
        { label: "⋰˚☆ お問い合わせ/新キャラ", desc: "新しいアイテムやキャラクターの追加も大歓迎です！", url: "https://spin-spin.com/ceedarr" },
        { label: "⋰˚★ 開発者の一言", desc: "チョン·ホソクは自撮りをアップして。あなたが綺麗なのは私も知ってるから。とにかく誕生日おめでとう。" }
      ]
    }
  };

  const txt = CONTENT[lang] || CONTENT['ko'];

  // 헤더 렌더링 함수
  const renderHeader = (title) => (
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2">
        {/* 메뉴가 아닐 때만 뒤로가기 표시 */}
        {view !== 'menu' ? (
          <button onClick={() => setView('menu')} className="text-xl px-2">
            〈〈
          </button>
        ) : (
          /* 레이아웃 유지를 위한 빈 공간 (선택사항) */
          <div className="w-8" />
        )}
      </div>
      <h3 className="text-xl font-bold text-center flex-1">{title}</h3>
      {/* 닫기 버튼: 뷰를 초기화하고 모달 닫기 */}
      <button 
        onClick={() => { setView('menu'); onClose(); }} 
        className="text-xl px-2"
      >
        X
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] bg-black/40 flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[350px] rounded-[30px] border-[3px] border-hobi-black p-4 shadow-[0_8px_0_0_#1b1f4b] flex flex-col min-h-[366px] max-h-[80vh]">
        
        {/* 1. 메인 메뉴 뷰 */}
        {view === 'menu' && (
          <>
            {renderHeader(safeT('settings'))}
            <div className="flex flex-col gap-4 mt-2">
              <ButtonL label={safeT('guide')} icon=">" onClick={() => setView('guide')} />
              <ButtonL label={safeT('lang')} icon=">" onClick={() => setView('lang')} />
              <ButtonL label={safeT('dev')} icon=">" onClick={() => setView('dev')} />
            </div>
          </>
        )}

        {/* 2. 가이드 뷰 */}
        {view === 'guide' && (
          <>
            {renderHeader(safeT('guide'))}
            <div className="text-hobi-lg leading-relaxed overflow-y-auto pr-2 h-[280px] scrollbar-hide">
              {txt.guide.map((line, index) => (
                <p key={index} className="mb-4 whitespace-pre-wrap">{line}</p>
              ))}
            </div>
          </>
        )}

        {/* 3. 언어 설정 뷰 */}
        {view === 'lang' && (
          <>
            {renderHeader(safeT('lang'))}
            <div className="flex flex-col gap-4 mt-2">
              <ButtonL label="한글" icon="🇰🇷" onClick={() => onLangChange('ko')} />
              <ButtonL label="English" icon="🇺🇸" onClick={() => onLangChange('en')} />
              <ButtonL label="日本語" icon="🇯🇵" onClick={() => onLangChange('jp')} />
            </div>
          </>
        )}

        {/* 4. 개발자 정보 뷰 (수정됨) */}
        {view === 'dev' && (
  <>
         {renderHeader(safeT('dev'))}
            <div className="text-hobi-lg leading-relaxed overflow-y-auto pr-2 h-[280px] scrollbar-hide">
           {txt.dev.map((item, index) => (
           <div key={index} className="mb-6">
           <p className="font-bold text-lg text-hobi-black">{item.label}</p>
           <p className="text-hobi-black">{item.desc}</p>

           {item.url && (
            <a 
              /* [1] 실제 이동 주소: https가 없으면 코드가 알아서 붙여줌 */
              href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
              
              /* [2] 눈에 보이는 텍스트: https가 있으면 지워서 깔끔하게 보여줌 */
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg text-hobi-black break-all cursor-pointer"
            >
              {item.url.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      ))}
    </div>
  </>
)}
      </div>
    </div>
  );
};

export default SettingsModal;