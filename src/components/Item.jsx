import { useState, useEffect, useRef } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  // State edit bersifat lokal — hanya item ini yang peduli
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editRef = useRef(null);

  // Fokus + select semua teks saat masuk mode edit
  useEffect(() => {
    if (isEditing) editRef.current?.select();
  }, [isEditing]);

  const startEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  return (
    <li
      className={`group flex items-center gap-3 rounded-xl border p-3 transition ${
        todo.completed
          ? "border-green-100 bg-green-50/60"
          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      {/* Checkbox tandai selesai */}
      <button
        onClick={() => onToggle(todo.id)}
        aria-label="Tandai selesai"
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? "border-green-500 bg-green-500"
            : "border-gray-300 hover:border-indigo-500"
        }`}
      >
        {todo.completed && (
          <svg
            className="h-3.5 w-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Teks / input edit */}
      {isEditing ? (
        <input
          ref={editRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") setIsEditing(false);
          }}
          onBlur={saveEdit}
          className="flex-1 rounded-lg border border-indigo-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          title="Klik dua kali untuk edit"
          className={`flex-1 cursor-default select-none text-sm ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* Tombol aksi */}
      {!isEditing && (
        <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            onClick={startEdit}
            title="Edit"
            className="rounded-lg p-1.5 hover:bg-indigo-100"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            title="Hapus"
            className="rounded-lg p-1.5 hover:bg-red-100"
          >
            🗑️
          </button>
        </div>
      )}
    </li>
  );
}