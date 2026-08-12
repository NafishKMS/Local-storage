import { useState, useEffect, useRef } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // Fokus otomatis saat halaman pertama dibuka
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setText("");
    inputRef.current?.focus(); // ✅ fokus otomatis setelah submit
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis tugas baru..."
        className="flex-1 rounded-xl border border-[#E6DED3] bg-[#FDFBF7] px-5 py-3.5 text-stone-800 placeholder:text-stone-400 outline-none transition-all focus:border-[#8C7B6C] focus:ring-2 focus:ring-[#8C7B6C]/20"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-xl bg-[#8C7B6C] px-6 py-3.5 font-semibold text-[#FDFBF7] transition-all hover:bg-[#6B5D50] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
      >
        + Tambah
      </button>
    </form>
  );
}   