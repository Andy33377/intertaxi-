import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

type Order = {
  id: number;
  name: string;
  phone: string;
  passengers: number;
  childSeat: boolean;
  comment?: string | null;
  from: string;
  to: string;
  date: string;
  time: string;
  roundTrip: boolean;
  returnDate?: string | null;
  returnTime?: string | null;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Ошибка загрузки заказов");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000); // обновление каждые 5 сек
    return () => clearInterval(interval);
  }, []);

  async function onDelete(id: number) {
    if (!confirm("Удалить заказ?")) return;
    const res = await fetch(`/api/orders/${id}`, { method: "DELETE" });
    if (res.ok) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Заказы</h1>

      {loading ? (
        <div className="text-center text-gray-500 py-6">Загрузка...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-500 py-6">Заказов пока нет</div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-lg shadow p-3 space-y-2 text-sm"
            >
              <div className="flex justify-between">
                <span className="font-semibold">Маршрут:</span>
                <span>
                  {o.from} → {o.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Дата/время:</span>
                <span>
                  {o.date} {o.time}
                </span>
              </div>
              {o.roundTrip && (
                <div className="flex justify-between">
                  <span className="font-semibold">Обратный рейс:</span>
                  <span>
                    {o.returnDate ?? "—"} {o.returnTime ?? ""}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold">ID:</span>
                <span>{o.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Имя:</span>
                <span>{o.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Телефон:</span>
                <span>{o.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Пассажиры:</span>
                <span>{o.passengers}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Дет. кресло:</span>
                <span>{o.childSeat ? "Да" : "Нет"}</span>
              </div>
              {o.comment && (
                <div className="flex justify-between">
                  <span className="font-semibold">Комментарий:</span>
                  <span className="text-slate-600">{o.comment}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold">Создан:</span>
                <span>{new Date(o.createdAt).toLocaleString()}</span>
              </div>

              <button
                onClick={() => onDelete(o.id)}
                className="w-full bg-red-500 text-white py-2 rounded mt-2 hover:bg-red-600"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
