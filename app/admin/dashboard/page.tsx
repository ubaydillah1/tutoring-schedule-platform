"use client";

import AdminNav from "@/components/admin/AdminNav";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-72 lg:z-40">
        <AdminNav />
      </div>

      <div className="w-full lg:ml-72">
        <div className="lg:hidden">
          <AdminNav />
        </div>
        <AdminDashboard />
      </div>
    </div>
  );
}
