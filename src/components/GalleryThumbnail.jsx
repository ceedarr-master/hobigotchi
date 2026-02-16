export const GalleryThumbnail = ({ id, isUnlocked, themeBg }) => (
  <div className={`w-[52px] h-[66px] border-[2px] border-hobi-black rounded-[10px] flex items-center justify-center overflow-hidden 
    ${isUnlocked ? 'bg-white' : themeBg}`}>
    {isUnlocked ? (
      <img src={`/assets/images/photos/${id}_1.webp`} className="w-full h-full object-contain" alt={id} />
    ) : (
      <span className="text-hobi-black opacity-30 text-xl font-bold">?</span>
    )}
  </div>
);