export default function EmptyState({ message }) {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-gray-300 py-10 text-center text-sm text-gray-400">
      {message}
    </div>
  );
}