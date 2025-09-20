import { useEffect, useState } from "react";
import AdminLayout from "../../src/components/admin/AdminLayout";

type User = { id: number; name: string; email: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  async function load() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: number) {
    if (!confirm("Удалить пользователя?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Пользователи</h1>

      <div className="bg-white rounded shadow p-2">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Имя</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left w-40">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">
                  <button
                    className="px-3 py-1 border rounded text-red-600"
                    onClick={() => onDelete(u.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="p-4 text-gray-500" colSpan={4}>
                  Пока пусто
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
