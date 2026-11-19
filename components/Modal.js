"use client";

// Simple popup box. Clicking the dark background closes it.
export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-label={title}
        className="w-full max-w-sm rounded border border-border bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-3 font-bold">{title}</h2>
        {children}
      </div>
    </div>
  );
}
