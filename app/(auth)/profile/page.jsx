"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { completeProfile } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function CompleteProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    education: "",
    experience: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(completeProfile(formData));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Profile completed successfully!");
      router.push("/user");
    } else {
      setError(result.payload || "Failed to complete profile");
      toast.error("Please try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050505] via-[#0A0A0A] to-[#111] text-white font-[var(--font-family)] relative overflow-hidden px-6 py-10">
      {/* ✨ Background Glows */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-[var(--accent-color)]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-[var(--primary-color)]/10 blur-[120px] rounded-full" />
      </div>

      {/* 🧩 Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl bg-[#0F0F0F]/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.05)] p-10"
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-extrabold text-center mb-2 text-[var(--accent-color)] drop-shadow-[0_0_8px_rgba(24,186,214,0.4)]"
        >
          Complete Your Profile
        </motion.h2>

        <p className="text-center text-gray-400 mb-6">
          Add your education and experience details to complete registration.
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Educational Background
            </label>
            <textarea
              name="education"
              placeholder="Enter your education details"
              className="w-full bg-[#1A1A1A]/80 text-white border border-white/10 rounded-xl p-4 resize-none focus:border-[var(--accent-color)] outline-none transition-all"
              rows="4"
              value={formData.education}
              onChange={(e) =>
                setFormData({ ...formData, education: e.target.value })
              }
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Professional Experience
            </label>
            <textarea
              name="experience"
              placeholder="Describe your work experience"
              className="w-full bg-[#1A1A1A]/80 text-white border border-white/10 rounded-xl p-4 resize-none focus:border-[var(--accent-color)] outline-none transition-all"
              rows="4"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              required
            ></textarea>
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl font-semibold text-lg text-white 
            bg-gradient-to-r from-[var(--accent-color)] to-[var(--primary-color)] 
            shadow-[0_0_15px_rgba(24,186,214,0.4)] hover:shadow-[0_0_25px_rgba(143,194,65,0.5)] 
            transition-all duration-300"
          >
            Finish & Go to Dashboard →
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
