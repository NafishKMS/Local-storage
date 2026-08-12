import { useState, useEffect, useMemo } from "react";
import TodoHeader from "./components/Header";
import TodoForm from "./components/Form";
import TodoFilter from "./components/Filter";
import TodoList from "./components/List";

// Import semua latihan dari file terpisah
import ExCounter from "./exercises/01_Counter";
import ExFetchUsers from "./exercises/02_FetchUsers";
import ExFormFocus from "./exercises/03_FormFocus";
import ExFactorial from "./exercises/04_Factorial";
import ExItemList from "./exercises/05_ItemList";
import ExTodoReducer from "./exercises/06_TodoReducer";
import ExThemeSwitcher from "./exercises/07_ThemeSwitcher";
import ExScrollPosition from "./exercises/08_ScrollPosition";
import ExCustomInput from "./exercises/09_CustomInput";

const STORAGE_KEY = "todo-list-data";

const EXERCISES = [
  { id: "counter", label: "1. useState", component: ExCounter },
  { id: "fetch", label: "2. useEffect", component: ExFetchUsers },
  { id: "focus", label: "3. useRef", component: ExFormFocus },
  { id: "memo", label: "4. useMemo", component: ExFactorial },
  { id: "callback", label: "5. useCallback", component: ExItemList },
  { id: "reducer", label: "6. useReducer", component: ExTodoReducer },
  { id: "context", label: "7. useContext", component: ExThemeSwitcher },
  { id: "layout", label: "8. useLayoutEffect", component: ExScrollPosition },
  { id: "imperative", label: "9. useImperativeHandle", component: ExCustomInput },
];

export default function App() {
  // ===== TODO LIST STATE =====
  const [todos, setTodos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []; }
    catch { return []; }
  });
  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => setTodos((p) => [{ id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`, text, completed: false }, ...p]);
  const toggleTodo = (id) => setTodos((p) => p.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTodo = (id) => setTodos((p) => p.filter((t) => t.id !== id));
  const editTodo = (id, newText) => setTodos((p) => p.map((t) => t.id === id ? { ...t, text: newText } : t));
  const clearCompleted = () => setTodos((p) => p.filter((t) => !t.completed));

  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);
  const activeCount = useMemo(() => todos.length - completedCount, [todos.length, completedCount]);
  const filteredTodos = useMemo(() => {
    if (filter === "aktif") return todos.filter((t) => !t.completed);
    if (filter === "selesai") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);
  const counts = useMemo(() => ({ semua: todos.length, aktif: activeCount, selesai: completedCount }), [todos.length, activeCount, completedCount]);

  // ===== PANEL LATIHAN STATE =====
  const [showExercises, setShowExercises] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);
  const ActiveExComponent = activeExercise ? EXERCISES.find((e) => e.id === activeExercise)?.component : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] via-[#F5EFE6] to-[#E8DCC4] px-4 py-10 text-stone-800">
      <div className="mx-auto w-full max-w-xl space-y-4">

        {/* PROJECT TO-DO LIST */}
        <div className="overflow-hidden rounded-2xl bg-[#FFFCF8] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#E6DED3]">
          <TodoHeader total={todos.length} completed={completedCount} />
          <main className="p-6">
            <TodoForm onAdd={addTodo} />
            <TodoFilter filter={filter} onChange={setFilter} counts={counts} onClearCompleted={clearCompleted} />
            <TodoList todos={filteredTodos} total={todos.length} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
            <p className="mt-6 text-center text-xs font-medium tracking-wide text-stone-400">
              Muhammad Dzurunnafis Khairuddin XII | SAAS
            </p>
          </main>
        </div>

        {/* PANEL LATIHAN */}
        <div className="overflow-hidden rounded-2xl border border-[#E6DED3] bg-[#FFFCF8] shadow-[0_4px_15px_rgb(0,0,0,0.04)]">
          <button onClick={() => setShowExercises((s) => !s)} className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-[#F5EFE6]">
            <span className="font-bold text-stone-700">Latihan Hooks (1–9)</span>
            <span className={`text-stone-400 transition-transform duration-300 ${showExercises ? "rotate-180" : ""}`}>▼</span>
          </button>

          {showExercises && (
            <div className="border-t border-[#E6DED3] p-6">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {EXERCISES.map((ex) => (
                  <button key={ex.id} onClick={() => setActiveExercise(ex.id === activeExercise ? null : ex.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${activeExercise === ex.id ? "bg-[#8C7B6C] text-[#FDFBF7]" : "bg-[#F5EFE6] text-stone-600 hover:bg-[#E6DED3]"}`}>
                    {ex.label}
                  </button>
                ))}
              </div>
              {ActiveExComponent ? (
                <div className="rounded-xl border border-[#E6DED3] bg-[#FDFBF7] p-5 animate-in fade-in duration-200">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-400">
                    {EXERCISES.find((e) => e.id === activeExercise)?.label}
                  </h3>
                  <ActiveExComponent />
                </div>
              ) : (
                <p className="text-center text-sm text-stone-400 py-6">Pilih salah satu latihan di atas</p>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}