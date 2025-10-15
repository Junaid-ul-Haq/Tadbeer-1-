"use client";
import React from "react";
import { Loader2 } from "lucide-react";

export default function GrantTable({
  grants = [],
  loading,
  onApprove,
  onReject,
  onView,
}) {
  const safeGrants = Array.isArray(grants) ? grants : [];

  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--surface-color)]">
          <tr className="text-gray-400 uppercase text-sm">
            <th className="px-4 py-3 border-b border-gray-600">Name</th>
            <th className="px-4 py-3 border-b border-gray-600">Email</th>
            <th className="px-4 py-3 border-b border-gray-600">Title</th>
            <th className="px-4 py-3 border-b border-gray-600">Amount</th>
            <th className="px-4 py-3 border-b border-gray-600">Status</th>
            {(onApprove || onReject || onView) && (
              <th className="px-4 py-3 border-b border-gray-600">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={onApprove || onReject || onView ? 6 : 5}
                className="text-center py-6"
              >
                <Loader2 className="w-6 h-6 animate-spin inline-block text-[var(--accent-color)]" />
              </td>
            </tr>
          ) : safeGrants.length === 0 ? (
            <tr>
              <td
                colSpan={onApprove || onReject || onView ? 6 : 5}
                className="text-center py-6 text-gray-400 font-medium"
              >
                No Business Grants yet
              </td>
            </tr>
          ) : (
            safeGrants.map((g) => (
              <tr key={g._id} className="hover:bg-[var(--surface-color)] transition">
                <td className="px-4 py-3 font-semibold">
                  {g.user?.name || "N/A"}
                </td>
                <td className="px-4 py-3">{g.user?.email || "N/A"}</td>
                <td className="px-4 py-3 font-semibold">{g.title || "—"}</td>
                <td className="px-4 py-3">
                  {g.amountRequested ? `PKR ${g.amountRequested}` : "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold capitalize ${
                      g.status === "approved"
                        ? "text-[var(--secondary-color)]"
                        : g.status === "rejected"
                        ? "text-red-600"
                        : "text-[var(--accent-color)]"
                    }`}
                  >
                    {g.status || "pending"}
                  </span>
                </td>

                {(onApprove || onReject || onView) && (
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    {onApprove && (
                      <button
                        onClick={() => onApprove(g._id)}
                        className="flex-1 px-3 py-1 bg-[var(--secondary-color)] text-white rounded text-sm font-semibold hover:opacity-90 transition"
                      >
                        Approve
                      </button>
                    )}
                    {onReject && (
                      <button
                        onClick={() => onReject(g._id)}
                        className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold hover:opacity-90 transition"
                      >
                        Reject
                      </button>
                    )}
                    {onView && (
                      <button
                        onClick={() => onView(g._id)}
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
