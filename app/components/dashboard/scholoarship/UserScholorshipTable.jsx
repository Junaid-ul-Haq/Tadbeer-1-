"use client";
import React from "react";

export default function UserScholarshipTable({ scholarships, loading }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--surface-color)]">
          <tr className="text-gray-400 uppercase text-sm">
            <th className="px-4 py-3 border-b border-gray-600">Degree</th>
            <th className="px-4 py-3 border-b border-gray-600">Status</th>
            <th className="px-4 py-3 border-b border-gray-600">Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : scholarships.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-400">
                No scholarship applications yet
              </td>
            </tr>
          ) : (
            scholarships.map((s) => (
              <tr
                key={s._id}
                className="hover:bg-[var(--surface-color)] transition"
              >
                <td className="px-4 py-3 font-semibold">{s.degreeLevel}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold capitalize ${
                      s.status === "approved"
                        ? "text-green-500"
                        : s.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
