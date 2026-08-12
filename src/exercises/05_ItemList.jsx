import { useState, useCallback } from "react";

export default function ItemList() {
  const [items, setItems] = useState(["Belajar React", "Latihan Hooks"]);
  const [renderCount, setRenderCount] = useState(0);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, `Item Baru #${prev.length + 1}`]);
  }, []); // dependency kosong karena pakai functional update

  const removeItem = useCallback((index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-800">5. useCallback — Daftar Item</h2>

      <div className="flex items-center justify-between">
        <button
          onClick={addItem}
          className="rounded-xl bg-[#8C7B6C] px-5 py-2.5 font-semibold text-[#FDFBF7] transition hover:bg-[#6B5D50] active:scale-95"
        >
          + Tambah Item
        </button>
        <span className="text-xs text-stone-400">Render count: {renderCount}</span>
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded-xl border border-[#E6DED3] bg-[#FDFBF7] px-4 py-3"
          >
            <span className="text-stone-700">{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setRenderCount((c) => c + 1)}
        className="text-xs text-stone-400 underline"
      >
        Paksa re-render (addItem & removeItem tetap referensi sama)
      </button>
    </div>
  );
}