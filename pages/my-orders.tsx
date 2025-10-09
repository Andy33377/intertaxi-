"use client";
import { useEffect, useState } from "react";
import { getOrders, clearOrders, ClientOrder } from "@/lib/ordersLocal";

export default function MyOrders() {
  const [orders, setOrders] = useState<ClientOrder[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Мои заказы</h1>

      <div className="flex justify-between items-center mb-3 text-sm text-slate-600">
        <span>Сохраняются только на этом устройстве (до 10 шт.)</span>
        {orders.length > 0 && (
          <button
            onClick={() => {
              clearOrders();
              setOrders([]);
            }}
            className="text-red-600 hover:underline"
          >
            Очистить
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-slate-600">Пока пусто.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-lg shadow p-3 text-sm space-y-1"
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
                  <span className="font-semibold">Обратка:</span>
                  <span>
                    {o.returnDate ?? "—"} {o.returnTime ?? ""}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold">Пассажиры:</span>
                <span>
                  {o.passengers}
                  {o.childSeat ? " (+дет.кресло)" : ""}
                </span>
              </div>
              {o.comment && (
                <div className="flex justify-between">
                  <span className="font-semibold">Комментарий:</span>
                  <span className="text-slate-600">{o.comment}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold">ID:</span>
                <span>{o.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Создан:</span>
                <span>
                  {o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
