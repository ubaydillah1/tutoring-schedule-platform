import AdminNav from "@/components/admin/AdminNav";
import ViewRegistrations from "@/components/admin/ViewRegistrations";
import { redirect } from "next/navigation";

export default function AdminRegistrationsPage() {
  redirect("/admin/dashboard");
  return;
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-72 lg:z-40">
        <AdminNav />
      </div>

      <div className="w-full lg:ml-72">
        <div className="lg:hidden">
          <AdminNav />
        </div>

        <ViewRegistrations />
      </div>
    </div>
  );
}
