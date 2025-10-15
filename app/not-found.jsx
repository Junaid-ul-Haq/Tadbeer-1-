"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-slate-100 to-sky-100 dark:from-slate-900 dark:to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg"
      >
        <h1 className="text-7xl font-bold text-electricBlue dark:text-sky-400 mb-4">
          404
        </h1>
        <h3 className="text-lg text-gray-500 dark:text-gray-300 mb-4">
          Page not found 👀
        </h3>
        <p className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-white mb-6">
          Oops! This page doesn’t exist.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-10">
          The page you’re looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>

        {/* SVG or image from public folder */}
        <motion.div
          className="mb-10"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/error.svg" // ✅ only the path relative to /public
            alt="Lost robot illustration"
            width={256}
            height={256}
            className="mx-auto"
          />
        </motion.div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-300 transition duration-300"
        >
          <FaArrowLeft />
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
}
