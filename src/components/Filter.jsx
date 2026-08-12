const FILTERS = [
  { key: "semua", label: "Semua" },
  { key: "aktif", label: "Aktif" },
  { key: "selesai", label: "Selesai" },
];

export default function TodoFilter({ filter, onChange, counts, onClearCompleted }) {
  return (
    <div className="mt-5 flex items-center justify-between">
      <div className="flex gap-1 rounded-xl bg-gray-100 p-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              filter === f.key
                ? "bg-white text-indigo-700 shadow"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {f.label} ({counts[f.key]})
          </button>
        ))}
      </div>

      {counts.selesai > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs font-medium text-red-500 hover:text-red-600 hover:underline"
        >
          Bersihkan selesai
        </button>
      )}
    </div>
  );
}