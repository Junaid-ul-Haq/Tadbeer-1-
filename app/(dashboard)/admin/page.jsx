"use client";
import { motion } from "framer-motion";

export default function AdminHome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section-dark p-8 rounded-xl border border-[var(--outline-color)]"
    >
      <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4">
        Welcome, Admin 🌿
      </h1>
      <p className="text-gray-400">
        Manage users, scholarships, and business grants efficiently from this dashboard.
      </p>
    </motion.div>
  );
}
