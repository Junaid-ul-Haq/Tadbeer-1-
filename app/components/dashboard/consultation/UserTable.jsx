"use client";
import React from "react";

export default function UserConsultationTable({ consultations, loading }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--surface-color)]">
          <tr className="text-gray-400 uppercase text-sm">
            <th className="px-4 py-3 border-b border-gray-600">Category</th>
            <th className="px-4 py-3 border-b border-gray-600">Status</th>
            <th className="px-4 py-3 border-b border-gray-600">Requested On</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : consultations.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-400">
                No consultations submitted yet
              </td>
            </tr>
          ) : (
            consultations.map((c) => (
              <tr key={c._id} className="hover:bg-[var(--surface-color)] transition">
                <td className="px-4 py-3 font-semibold">{c.category}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold capitalize ${
                      c.status === "approved"
                        ? "text-green-500"
                        : c.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3">{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
