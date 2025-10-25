"use client";
import React from "react";

export default function GrantUserTable({ grants, loading }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--surface-color)]">
          <tr className="text-gray-400 uppercase text-sm">
            <th className="px-4 py-3 border-b border-gray-600">Title</th>
            <th className="px-4 py-3 border-b border-gray-600">Status</th>
            <th className="px-4 py-3 border-b border-gray-600">Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-300">
                Loading...
              </td>
            </tr>
          ) : grants.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-400">
                No grant applications yet
              </td>
            </tr>
          ) : (
            grants.map((g) => (
              <tr
                key={g._id}
                className="hover:bg-[var(--surface-color)] transition"
              >
                <td className="px-4 py-3 font-semibold">{g.title}</td>
                
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold capitalize ${
                      g.status === "approved"
                        ? "text-green-500"
                        : g.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {g.status || "pending"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(g.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
