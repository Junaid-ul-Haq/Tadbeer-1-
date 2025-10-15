"use client";
import Sidebar from "@/app/components/dashboard/Sidebar";
import TopNavbar from "@/app/components/dashboard/Navbar";
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-[var(--background-color)] text-[var(--text-color)]">
        <Sidebar role="admin" />
        <div className="flex flex-col flex-1">
          <TopNavbar title="Admin Dashboard" />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
