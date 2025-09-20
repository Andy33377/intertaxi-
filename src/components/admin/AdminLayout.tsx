import React from "react";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="mx-auto w-[375px] px-4 pt-4 pb-10">{children}</main>
    </div>
  );
}
