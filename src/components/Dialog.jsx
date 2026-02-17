// src/components/Dialog.jsx
import React from 'react';

const Dialog = ({ children }) => (
  <div className="w-full bg-white border-[3px] border-hobi-black rounded-[20px] p-6 text-center mb-6">
    <p className="text-hobi-lg font-bold text-hobi-black leading-tight">
      {children}
    </p>
  </div>
);

export default Dialog;