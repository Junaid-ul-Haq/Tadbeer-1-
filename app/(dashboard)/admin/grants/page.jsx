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
import CNICPreview from "@/app/components/cnicPreview";
import { openProtectedFile } from "@/services/fileService";
import { Link } from "lucide-react";

export default function AdminGrantDashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  console.log("tokenin domain:",token)
  const { allGrants, selectedGrant, loading, totalPages } = useSelector(
  (state) => state.businessGrant
);
console.log("data of path",allGrants)
console.log("all grants:",selectedGrant)
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
  const res = await dispatch(getGrantById({ token, id }));
  const grant = res.payload; 
  console.log("Grant CNIC paths:", {
    cnicFront: grant.user?.cnicFront,
    cnicBack: grant.user?.cnicBack,
  });
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      {/* Modal Container */}
      <div className="bg-[var(--surface-color)] text-[var(--text-color)] w-[95%] max-w-6xl h-[90vh] rounded-[var(--border-radius)] shadow-lg font-[var(--font-family)] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[var(--outline-color)] shrink-0">
          <h2 className="text-3xl font-bold text-[var(--primary-color)]">
            Business Grant Details
          </h2>
          <button
            onClick={() => setShowDetail(false)}
            className="px-4 py-2 bg-[var(--primary-color)] text-[var(--background-color)] font-bold rounded hover:opacity-90"
          >
            Close
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 gap-8 overflow-hidden p-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-3">
            <div className="space-y-3">
              <p><strong>Name:</strong> {selectedGrant.user?.name || "N/A"}</p>
              <p><strong>Email:</strong> {selectedGrant.user?.email || "N/A"}</p>
              <p><strong>Phone:</strong> {selectedGrant.user?.phone || "N/A"}</p>

              <p><strong>Title:</strong> {selectedGrant.title || "N/A"}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`capitalize font-semibold ${
                    selectedGrant.status === "approved"
                      ? "text-green-500"
                      : selectedGrant.status === "rejected"
                      ? "text-red-500"
                      : "text-yellow-400"
                  }`}
                >
                  {selectedGrant.status || "pending"}
                </span>
              </p>

              <p>
                <strong>Submitted On:</strong>{" "}
                {selectedGrant.createdAt
                  ? new Date(selectedGrant.createdAt).toLocaleString()
                  : "N/A"}
              </p>

              {/* CNIC Preview */}
              {(selectedGrant.user?.cnicFront ||
                selectedGrant.user?.cnicBack) && (
                <CNICPreview
                  cnicFront={selectedGrant.user.cnicFront}
                  cnicBack={selectedGrant.user.cnicBack}
                  token={token}
                />
              )}

              {/* Other Documents */}
            {/* Other Documents Section */}
<div className="mt-6 border-t border-gray-700 pt-4">
  <h3 className="font-semibold text-lg mb-3 text-[var(--primary-color)]">
    Uploaded Proposal
  </h3>

  {selectedGrant.proposal || selectedGrant.proposal.filePath ? (
    <div className="flex items-center gap-3">   
      <span className="text-[var(--accent-color)]">
        {selectedGrant.proposal.fileName || "Proposal Document"}
      </span>
      <span className="text-sm text-gray-400">
        ({selectedGrant.proposal.fileType?.split("/")[1] || "file"})
      </span>
    </div>
  ) : (
    <p className="text-gray-400 text-sm italic">No proposal uploaded</p>
  )}
</div>



            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pl-3 border-l border-[var(--outline-color)]">
            <div className="flex flex-col">
              <strong>Description:</strong>
              <div className="border rounded p-3 min-h-[200px] max-h-[65vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 bg-[var(--background-color)] text-sm">
                {selectedGrant.description || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center py-4">Loading...</p>
  )}
</Modal>



    </div>
  );
}
