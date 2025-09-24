import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="fixed top-0 inset-x-0 bg-black text-white flex justify-between items-center h-[64px] w-full">
      <h1 className="font-bold ml-4">Admin Panel</h1>
      <nav className="flex gap-4 mr-4">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/orders">Заказы</Link>
        <Link href="/admin/users">Пользователи</Link>
      </nav>
    </header>
  );
}
