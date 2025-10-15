"use client";
import React from "react";

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-300 tracking-wide"
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A]/80 text-white placeholder-gray-500
                   border border-white/10 focus:border-[var(--accent-color)] 
                   focus:ring-2 focus:ring-[var(--accent-color)]/40 
                   outline-none transition-all duration-300
                   shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]"
      />
    </div>
  );
}
