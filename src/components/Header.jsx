export default function TodoHeader({ total, completed }) {
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    // Menggunakan warna warm brown/coffee yang senada dengan background cream
    <header className="bg-[#8C7B6C] px-6 py-6 text-[#FDFBF7]">
      <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
        Local Storage To-Do List (11)
      </h1>
      
      <p className="mt-1 text-sm text-[#E6DED3]/90">
        {total === 0
          ? "Belum ada tugas. Tambahkan Dahulu"
          : `${completed} dari ${total} tugas selesai (${progress}%)`}
      </p>

      {/* Progress bar dengan warna cream terang agar kontras tapi tetap soft */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#6B5D50]">
        <div
          className="h-full rounded-full bg-[#F5EFE6] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}