"use client";
export default function Modal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[var(--surface-color)] p-6 rounded shadow-lg max-w-lg w-full relative text-[var(--text-color)]">
        <button onClick={onClose} className="absolute top-2 right-2 text-[var(--text-color)] font-bold hover:text-[var(--primary-color)]">✕</button>
        {children}
      </div>
    </div>
  );
}
