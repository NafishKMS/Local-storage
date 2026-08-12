import { useState, useMemo } from "react";

// Simulasi fungsi berat agar efek useMemo terlihat
function computeFactorial(n) {
  console.log(`🔄 Menghitung factorial(${n})...`);
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export default function Factorial() {
  const [number, setNumber] = useState(5);
  const [unrelatedState, setUnrelatedState] = useState(0);

  //  Hanya dihitung ulang jika `number` berubah
  const factorial = useMemo(() => computeFactorial(number), [number]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-800">4. useMemo — Factorial</h2>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-stone-600">Angka:</label>
        <input
          type="number"
          min={0}
          max={20}
          value={number}
          onChange={(e) => setNumber(Math.min(20, Math.max(0, Number(e.target.value))))}
          className="w-20 rounded-xl border border-[#E6DED3] bg-[#FDFBF7] px-4 py-2 text-center text-stone-800 outline-none focus:border-[#8C7B6C]"
        />
      </div>

      <div className="rounded-xl bg-[#F5EFE6] px-5 py-4 text-stone-800">
        <span className="text-sm text-stone-500">Hasil:</span>
        <p className="text-2xl font-bold tabular-nums">{factorial.toLocaleString()}</p>
      </div>

      {/* Tombol ini TIDAK memicu perhitungan ulang factorial */}
      <button
        onClick={() => setUnrelatedState((s) => s + 1)}
        className="rounded-xl border border-[#E6DED3] px-4 py-2 text-xs text-stone-500 hover:bg-[#F5EFE6]"
      >
        Render Ulang (state lain: {unrelatedState}) — cek console, factorial tidak dihitung ulang
      </button>
    </div>
  );
}