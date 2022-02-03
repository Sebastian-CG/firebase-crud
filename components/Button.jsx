import React from "react";

export default function Button({
  className,
  type,
  loading,
  onClick,
  children,
}) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {loading && (
        <div className="w-5 h-5 border-4 rounded-full border-slate-50/50 animate-spin border-t-slate-100" />
      )}
      {!loading && children}
    </button>
  );
}
