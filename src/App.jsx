import { useState, useEffect, useMemo } from "react";
import TodoHeader from "./components/Header";
import TodoForm from "./components/Form";
import TodoFilter from "./components/Filter";
import TodoList from "./components/List";

const STORAGE_KEY = "todo-list-data";

export default function App() {
  // ===== STATE UTAMA (sumber data tunggal) =====
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("semua");

  // ===== SIMPAN OTOMATIS KE LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // ===== FUNGSI YANG DITERUSKAN KE ANAK =====
  const addTodo = (text) => {
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  // ===== USEMEMO =====
  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos]
  );

  const activeCount = useMemo(
    () => todos.length - completedCount,
    [todos.length, completedCount]
  );

  const filteredTodos = useMemo(() => {
    if (filter === "aktif") return todos.filter((t) => !t.completed);
    if (filter === "selesai") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      semua: todos.length,
      aktif: activeCount,
      selesai: completedCount,
    }),
    [todos.length, activeCount, completedCount]
  );

  // ===== RENDER (WARM CREAM THEME) =====
  return (
    // Background: Warm Cream Gradient
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F5EFE6] to-[#E8DCC4] px-4 py-10 text-stone-800">
      <div className="mx-auto w-full max-w-xl">
        {/* Card: Off-white dengan shadow lembut */}
        <div className="overflow-hidden rounded-2xl bg-[#FFFCF8] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E6DED3]">
          
          <TodoHeader total={todos.length} completed={completedCount} />

          <main className="p-6">
            <TodoForm onAdd={addTodo} />

            <TodoFilter
              filter={filter}
              onChange={setFilter}
              counts={counts}
              onClearCompleted={clearCompleted}
            />

            <TodoList
              todos={filteredTodos}
              total={todos.length}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />

            <p className="mt-6 text-center text-xs font-medium tracking-wide text-stone-400">
              Muhammad Dzurunnafis Khairuddin XII | SAAS
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}