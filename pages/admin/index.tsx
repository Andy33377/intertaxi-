import React from "react";
import AdminLayout from "../../src/components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Добро пожаловать в админку 🚀</p>
    </AdminLayout>
  );
}
