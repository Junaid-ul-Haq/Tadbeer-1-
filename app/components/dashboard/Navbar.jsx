"use client";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, LogOut } from "lucide-react";

export default function TopNavbar({ title }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-between items-center w-full border-b border-[var(--outline-color)] p-4 md:p-6 bg-[var(--background-color)] backdrop-blur-lg z-40"
    >
      <h2 className="text-xl md:text-2xl font-semibold text-[var(--primary-color)]">
        {title}
      </h2>

      <div className="flex items-center gap-5">
        {/* Notifications */}
        <button className="relative p-2 rounded-full bg-[var(--surface-color)] border border-[var(--outline-color)] hover:bg-[var(--accent-color)] transition">
          <Bell className="text-[var(--text-color)] w-5 h-5" />
          <span className="absolute top-1 right-1 bg-[var(--primary-color)] w-2.5 h-2.5 rounded-full animate-ping"></span>
        </button>

        {/* User Profile */}
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-gray-400 hidden sm:block">{user?.name}</span>
            <div className="w-10 h-10 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-white font-semibold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-lg bg-[var(--primary-color)] hover:bg-[var(--accent-color)] text-white font-medium transition"
        >
          <LogOut size={18} />
        </button>
      </div>
    </motion.header>
  );
}
