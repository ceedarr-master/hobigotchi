import React, { useState, useEffect } from 'react';
import { CHARACTER_INFO } from '../data/evolutionData';

const DeveloperMode = ({ onReset, stats, onForceEvolution }) => { 
  const [keys, setKeys] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // [수정] 캐릭터 목록 필터링 (대학생 추가)
  const teenCharacters = Object.keys(CHARACTER_INFO).filter(id => id.startsWith('teen_'));
  const collegeCharacters = Object.keys(CHARACTER_INFO).filter(id => id.startsWith('college_')); // [추가]
  const adultCharacters = Object.keys(CHARACTER_INFO).filter(id => id.startsWith('adult_'));

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => [...prev, e.key].slice(-10));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const history = keys.join('');
    if (history.endsWith('hhhhh')) {
      setShowMenu(prev => !prev);
      setKeys([]);
    }
    if (history.endsWith('jjjjj')) {
      setShowStats(prev => !prev);
      setKeys([]);
    }
  }, [keys]);

  return (
    <div className="fixed z-[9999] pointer-events-none">
      {/* 1. 관리자 메뉴 (h x 5) */}
      {showMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex flex-col items-center justify-center pointer-events-auto p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg text-center max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">🔧 관리자 모드</h2>
            
            <div className="mb-6 border-b pb-4">
              <button 
                onClick={() => { onReset(); setShowMenu(false); }}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
              >
                데이터 완전 초기화 (Reset)
              </button>
            </div>

            <div className="text-left">
              <h3 className="font-bold text-lg mb-2 text-hobi-purple-d">🦋 강제 진화 테스트</h3>
              <p className="text-xs text-gray-500 mb-2">* 클릭 시 해당 캐릭터의 진화 완료 화면으로 이동합니다.</p>
              
              {/* 1. 청소년 (Teen) */}
              <div className="mb-4">
                <h4 className="font-bold text-sm mb-1 text-gray-700">청소년 (Teen)</h4>
                <div className="flex flex-wrap gap-2">
                  {teenCharacters.map(id => (
                    <button
                      key={id}
                      onClick={() => { onForceEvolution(id); setShowMenu(false); }}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 border border-blue-300"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. [추가] 대학생 (College) */}
              <div className="mb-4">
                <h4 className="font-bold text-sm mb-1 text-gray-700">대학생 (College)</h4>
                <div className="flex flex-wrap gap-2">
                  {collegeCharacters.map(id => (
                    <button
                      key={id}
                      onClick={() => { onForceEvolution(id); setShowMenu(false); }}
                      className="px-2 py-1 text-xs bg-pink-100 text-pink-800 rounded hover:bg-pink-200 border border-pink-300"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. 성인 (Adult) */}
              <div>
                <h4 className="font-bold text-sm mb-1 text-gray-700">성인 (Adult)</h4>
                <div className="flex flex-wrap gap-2">
                  {adultCharacters.map(id => (
                    <button
                      key={id}
                      onClick={() => { onForceEvolution(id); setShowMenu(false); }}
                      className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200 border border-purple-300"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowMenu(false)}
              className="mt-6 text-gray-500 underline text-sm"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 2. 히든 스탯 오버레이 (j x 5) */}
      {showStats && (
        <div className="fixed top-4 right-4 bg-black/70 text-green-400 p-4 rounded font-mono text-xs pointer-events-auto backdrop-blur-sm border border-green-500/30">
          <h3 className="font-bold border-b border-green-500/50 mb-2 pb-1 text-green-300">📊 Hidden Stats</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span>❤️ R (열정):</span> <span className="text-white">{stats.r}</span>
            <span>📘 B (지성):</span> <span className="text-white">{stats.b}</span>
            <span>🌿 G (감성):</span> <span className="text-white">{stats.g}</span>
            <span>✨ Y (센스):</span> <span className="text-white">{stats.y}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-green-500/30 text-yellow-300">
            <span>📉 Min HP:</span> <span className="ml-2 text-white">{stats.minHp}</span>
            <span className="col-span-2 mt-1 text-gray-400">Step: {stats.stage}</span> {/* 단계 확인용 추가 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperMode;