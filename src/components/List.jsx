import TodoItem from "./Item";
import EmptyState from "./EmptyState";

export default function TodoList({ todos, total, onToggle, onDelete, onEdit }) {
  // Tampilkan pesan kosong jika tidak ada todo
  if (todos.length === 0) {
    return (
      <EmptyState
        message={
          total === 0
            ? " Belum ada todo. Mulai tambahkan!"
            : "Tidak ada todo pada filter ini."
        }
      />
    );
  }

  return (
    <ul className="mt-4 space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}