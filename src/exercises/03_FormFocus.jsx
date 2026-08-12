import { useRef, useEffect } from "react";

export default function FormFocus() {
  const inputRef = useRef(null);

  //  Fokus otomatis saat pertama kali mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-800">3. useRef — Auto Focus</h2>
      <p className="text-sm text-stone-500">Kursor otomatis fokus ke input saat halaman dimuat.</p>

      <input
        ref={inputRef}
        type="text"
        placeholder="Ketik sesuatu..."
        className="w-full rounded-xl border border-[#E6DED3] bg-[#FDFBF7] px-5 py-3.5 text-stone-800 placeholder:text-stone-400 outline-none focus:border-[#8C7B6C] focus:ring-2 focus:ring-[#8C7B6C]/20"
      />
    </div>
  );
}