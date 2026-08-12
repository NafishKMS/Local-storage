import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-xl font-bold text-stone-800">1. useState — Counter</h2>

      <div className="text-6xl font-bold text-[#8C7B6C] tabular-nums">
        {count}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="rounded-xl bg-[#E6DED3] px-6 py-3 font-semibold text-stone-700 transition hover:bg-[#D4C9B8] active:scale-95"
        >
          − Kurang
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-xl bg-[#8C7B6C] px-6 py-3 font-semibold text-[#FDFBF7] transition hover:bg-[#6B5D50] active:scale-95"
        >
          + Tambah
        </button>
      </div>
    </div>
  );
}