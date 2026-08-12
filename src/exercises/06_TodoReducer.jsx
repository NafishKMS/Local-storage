import { useReducer } from "react";

const initialState = [];

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        { id: Date.now(), text: action.payload, completed: false },
        ...state,
      ];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.payload);
    default:
      return state;
  }
}

export default function TodoReducer() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState("");



  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-800">6. useReducer — Todo List</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          dispatch({ type: "ADD", payload: input.trim() });
          setInput("");
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis todo..."
          className="flex-1 rounded-xl border border-[#E6DED3] bg-[#FDFBF7] px-4 py-2.5 outline-none focus:border-[#8C7B6C]"
        />
        <button
          type="submit"
          className="rounded-xl bg-[#8C7B6C] px-5 py-2.5 font-semibold text-[#FDFBF7] hover:bg-[#6B5D50]"
        >
          Tambah
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
              todo.completed
                ? "border-green-200 bg-green-50/50"
                : "border-[#E6DED3] bg-[#FDFBF7]"
            }`}
          >
            <span
              onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
              className={`cursor-pointer ${todo.completed ? "text-stone-400 line-through" : "text-stone-700"}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Hapus
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <p className="text-center text-sm text-stone-400 py-4">Belum ada todo</p>
        )}
      </ul>
    </div>
  );
}

import { useState } from "react";