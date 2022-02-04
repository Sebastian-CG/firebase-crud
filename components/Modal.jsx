import React from "react";

export default function Modal({ closeModal, children }) {
  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen min-h-screen backdrop-blur-sm bg-slate-600/30 dark:bg-slate-800/30"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
