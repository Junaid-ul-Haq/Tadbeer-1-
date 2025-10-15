"use client";
import React from "react";

export default function ScholarshipTable({
  scholarships,
  loading,
  onApprove,
  onReject,
  onView,
}) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[var(--surface-color)]">
          <tr className="text-gray-400 uppercase text-sm">
            <th className="px-4 py-3 border-b border-gray-600">Name</th>
            <th className="px-4 py-3 border-b border-gray-600">Email</th>
            <th className="px-4 py-3 border-b border-gray-600">Degree</th>
            <th className="px-4 py-3 border-b border-gray-600">Status</th>
            <th className="px-4 py-3 border-b border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : scholarships.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                No scholarship applications yet
              </td>
            </tr>
          ) : (
            scholarships.map((s) => (
              <tr
                key={s._id}
                className="hover:bg-[var(--surface-color)] transition"
              >
                <td className="px-4 py-3 font-semibold">{s.user?.name}</td>
                <td className="px-4 py-3">{s.user?.email}</td>
                <td className="px-4 py-3">{s.degreeLevel}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-semibold capitalize ${
                      s.status === "approved"
                         ? "text-[var(--secondary-color)]"
                        : s.status === "rejected"
                        ? "text-red-500"
                         : "text-[var(--accent-color)]"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-4 mt-2 py-2 ">
                    <button
                      onClick={() => onApprove(s._id)}
                        className="flex-1 px-4 py-1 bg-[var(--secondary-color)] text-white rounded text-sm font-semibold hover:opacity-90 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(s._id)}
                      className="flex-1 px-5 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:opacity-90 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onView(s._id)}
                      className="flex-1 px-1 py-1 bg-[var(--accent-color)] text-white font-bold rounded-lg shadow-md hover:opacity-90 transition"
                    >
                      View More
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
