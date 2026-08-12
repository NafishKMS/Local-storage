import { createContext, useContext, useState } from "react";

// 1. Buat Context
const ThemeContext = createContext();

// 2. Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook untuk akses context
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme harus dipakai dalam ThemeProvider");
  return ctx;
}

// 4. Komponen yang mengonsumsi context
function ThemedCard() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-[300px] rounded-2xl p-6 transition-colors duration-300 ${
        isDark ? "bg-stone-900 text-[#F5EFE6]" : "bg-[#FDFBF7] text-stone-800"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">7. useContext — Theme Switcher</h2>
        <button
          onClick={toggleTheme}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            isDark
              ? "bg-[#F5EFE6] text-stone-900 hover:bg-white"
              : "bg-[#8C7B6C] text-[#FDFBF7] hover:bg-[#6B5D50]"
          }`}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <p className={`text-sm ${isDark ? "text-stone-400" : "text-stone-500"}`}>
        Tema saat ini: <strong>{theme}</strong>. Background halaman berubah
        karena membaca nilai dari context.
      </p>
    </div>
  );
}

// Export default membungkus dengan Provider
export default function ThemeSwitcher() {
  return (
    <ThemeProvider>
      <ThemedCard />
    </ThemeProvider>
  );
}