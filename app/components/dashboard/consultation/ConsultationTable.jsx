"use client";
import React from "react";

export default function ConsultationTable({
  consultations = [],
  loading,
  onApprove,
  onReject,
  onView,
}) {
  const safeConsultations = Array.isArray(consultations) ? consultations : [];

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--surface-color)]">
          <tr className="text-gray-400 uppercase text-sm">
            <th className="px-4 py-3 border-b border-gray-600">Name</th>
            <th className="px-4 py-3 border-b border-gray-600">Email</th>
            <th className="px-4 py-3 border-b border-gray-600">Category</th>
            <th className="px-4 py-3 border-b border-gray-600">Status</th>
            {(onApprove || onReject || onView) && (
              <th className="px-4 py-3 border-b border-gray-600">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={onApprove || onReject || onView ? 5 : 4} className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : safeConsultations.length === 0 ? (
            <tr>
              <td colSpan={onApprove || onReject || onView ? 5 : 4} className="text-center py-6 text-gray-400">
                No consultations yet
              </td>
            </tr>
          ) : (
            safeConsultations.map((c) => (
              <tr key={c._id} className="hover:bg-[var(--surface-color)] transition">
                <td className="px-4 py-3 font-semibold">{c.user?.name || "N/A"}</td>
                <td className="px-4 py-3">{c.user?.email || "N/A"}</td>
                <td className="px-4 py-3 font-semibold">{c.category || "N/A"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold capitalize ${
                      c.status === "approved"
                          ? "text-[var(--secondary-color)]"
                        : c.status === "rejected"
                        ? "text-red-600"
                          : "text-[var(--accent-color)]"
                    }`}
                  >
                    {c.status || "pending"}
                  </span>
                </td>
                {(onApprove || onReject || onView) && (
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    {onApprove && (
                      <button
                        onClick={() => onApprove(c._id)}
                        className="flex-1 px-3 py-1 bg-[var(--secondary-color)] text-white rounded text-sm font-semibold hover:opacity-90 transition"
                      >
                        Approve
                      </button>
                    )}
                    {onReject && (
                      <button
                        onClick={() => onReject(c._id)}
                        className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold hover:opacity-90 transition"
                      >
                        Reject
                      </button>
                    )}
                    {onView && (
                      <button
                        onClick={() => onView(c._id)}
                        className="flex-1 px-3 py-1 bg-[var(--accent-color)] text-white rounded text-sm font-semibold hover:opacity-90 transition"
                      >
                        View
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
