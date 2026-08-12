import { useState, useLayoutEffect } from "react";

export default function ScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useLayoutEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set nilai awal
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-800">8. useLayoutEffect — Scroll Position</h2>

      <div className="sticky top-4 z-10 inline-block rounded-xl bg-[#8C7B6C] px-5 py-3 font-mono text-lg font-bold text-[#FDFBF7] shadow-lg">
        scrollY: {scrollY}px
      </div>

      <p className="text-sm text-stone-500">
        Scroll halaman ini. Badge di atas mengikuti posisi scroll secara real-time
        tanpa flicker karena menggunakan <code className="rounded bg-[#F5EFE6] px-1 py-0.5 text-xs">useLayoutEffect</code>.
      </p>

      {/* Konten panjang agar bisa di-scroll */}
      <div className="mt-8 space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#E6DED3] bg-[#FDFBF7] px-4 py-6 text-center text-stone-400"
          >
            Blok konten #{i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}