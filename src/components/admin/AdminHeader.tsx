import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="bg-black text-white h-[64px] flex items-center justify-between px-4">
      <h1 className="font-bold">Admin Panel</h1>
      <nav className="flex gap-4">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/orders">Заказы</Link>
        <Link href="/admin/users">Пользователи</Link>
      </nav>
    </header>
  );
}
