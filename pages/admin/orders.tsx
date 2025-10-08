import AdminLayout from "@/components/admin/AdminLayout";
import { GetServerSideProps } from "next";

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

export default function OrdersPage({ orders }: { orders: Order[] }) {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Заказы</h1>

      {orders.length === 0 ? (
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
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const host = ctx.req.headers["x-forwarded-host"] || ctx.req.headers.host;
  const proto = ctx.req.headers["x-forwarded-proto"] || "https";
  const baseUrl = `${proto}://${host}`;
  const auth = ctx.req.headers.authorization || "";

  const res = await fetch(`${baseUrl}/api/orders`, {
    headers: { Authorization: auth },
  });

  if (res.status === 401) {
    return { notFound: true };
  }

  const orders = res.ok ? await res.json() : [];
  return { props: { orders } };
};
