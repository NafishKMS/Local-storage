import { useState, useEffect } from "react";

export default function FetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        if (!cancelled) setUsers(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUsers();
    return () => { cancelled = true; }; // cleanup: cegah update jika unmount
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-800">2. useEffect — Fetch Users</h2>

      {loading && <p className="text-stone-400 animate-pulse">Memuat data...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="rounded-xl border border-[#E6DED3] bg-[#FDFBF7] px-4 py-3 text-stone-700"
            >
              <span className="font-semibold">{user.name}</span>
              <p className="text-xs text-stone-400">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}