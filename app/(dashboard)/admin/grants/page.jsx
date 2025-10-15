"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllGrants,
  updateGrantStatus,
  getGrantById,
} from "@/redux/slices/businessGrantSlice";
import GrantTable from "@/app/components/dashboard/grants/GrantTable";
import Modal from "@/app/components/dashboard/scholoarship/Modal";

export default function AdminGrantDashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { allGrants, selectedGrant, loading, totalPages } = useSelector(
  (state) => state.businessGrant
);


  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (token) fetchPage(page, limit);
  }, [token, page, limit]);

  const fetchPage = async (pageNumber, pageLimit) => {
    await dispatch(getAllGrants({ token, page: pageNumber, limit: pageLimit }));
  };

  const handleStatus = async (id, status) => {
    await dispatch(updateGrantStatus({ token, id, status }));
  };

  const handleView = async (id) => {
    await dispatch(getGrantById({ token, id }));
    setShowDetail(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Business Grants</h1>

      {/* Pagination & Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2 font-medium">Records per page:</label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1);
            }}
            className="bg-[var(--surface-color)] border border-gray-500 rounded px-2 py-1"
          >
            {[5, 10, 20, 50].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded border text-sm font-semibold ${
              page <= 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[var(--accent-color)] hover:text-white transition"
            }`}
          >
            Prev
          </button>

          <select
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value))}
            className="bg-[var(--surface-color)] border border-gray-500 rounded px-2 py-1"
          >
            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 rounded border text-sm font-semibold ${
              page >= totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[var(--accent-color)] hover:text-white transition"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Grant Table */}
      <GrantTable
        grants={allGrants}
        loading={loading}
        onApprove={(id) => handleStatus(id, "approved")}
        onReject={(id) => handleStatus(id, "rejected")}
        onView={handleView}
      />

      {/* Modal for Grant Details */}
      <Modal show={showDetail} onClose={() => setShowDetail(false)}>
  {selectedGrant ? (
    <div className="p-4">
       <h2 className="text-2xl font-bold mb-2 text-[var(--primary-color)]">
              Business Grants Details
            </h2>

      <p>
        <strong>Name:</strong> {selectedGrant.user?.name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {selectedGrant.user?.email || "N/A"}
      </p>
      <p>
            <p><strong>Phone:</strong> {selectedGrant.user?.phone}</p>
            
            <p><strong>CnicFront:</strong> {selectedGrant.user?.cnicFront}</p>
             <p><strong>CnicBack:</strong> {selectedGrant.user?.cnicFront}</p>


            <p><strong>Email:</strong> {selectedGrant.user?.email}</p>




        <strong>Title:</strong> {selectedGrant.title || "N/A"}
      </p>
      <p>
        <strong>Amount Requested:</strong>{" "}
        {selectedGrant.amountRequested
          ? `PKR ${selectedGrant.amountRequested}`
          : "N/A"}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {selectedGrant.description || "N/A"}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`capitalize font-semibold ${
            selectedGrant.status === "approved"
              ? "text-[var(--secondary-color)]"
              : selectedGrant.status === "rejected"
              ? "text-red-600"
              : "text-[var(--accent-color)]"
          }`}
        >
          {selectedGrant.status || "pending"}
        </span>
      </p>
<div>
              <h3 className="font-semibold mt-2 text-lg">Documents:</h3>
              <ul className="list-disc pl-6 space-y-1">
                {selectedGrant.documents.map((doc) => (
                  <li key={doc.filePath}>
                    <a
                      href={doc.url}
                      target="_blank"
                      className="text-[var(--accent-color)] underline hover:opacity-80"
                    >
                      {doc.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
    </div>
  ) : (
    <p className="p-4 text-center">Loading...</p>
  )}
</Modal>

    </div>
  );
}
