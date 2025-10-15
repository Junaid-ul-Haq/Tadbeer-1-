"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllScholarships,
  updateScholarshipStatus,
  setSelectedScholarship,
} from "@/redux/slices/scholarshipSlice";
import ScholarshipTable from "@/app/components/dashboard/scholoarship/ScholarshipTable";
import Modal from "@/app/components/dashboard/scholoarship/Modal";
import { scholarshipService } from "@/services/scholarshipService";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { allScholarships, selectedScholarship, loading } = useSelector(
    (state) => state.scholarship
  );
  const token = useSelector((state) => state.auth.token);

  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (token) fetchPage(page, limit);
  }, [token, page, limit]);

  const fetchPage = async (pageNumber, pageLimit) => {
    const res = await dispatch(
      fetchAllScholarships({ token, page: pageNumber, limit: pageLimit })
    );
    if (res.payload?.totalPages) setTotalPages(res.payload.totalPages);
  };

  const handleStatus = async (id, status) => {
    await dispatch(updateScholarshipStatus({ token, id, status }));
    // update local state instantly
    const index = allScholarships.findIndex((s) => s._id === id);
    if (index >= 0) allScholarships[index].status = status;
  };

  const handleView = async (id) => {
    const data = await scholarshipService.getScholarshipById(token, id);
    dispatch(setSelectedScholarship(data.data));
    setShowDetail(true);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1);
  };

  return (
    <div className="p-6 font-[var(--font-family)] text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-6">Scholarship Applications</h1>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div>
          <label className="mr-2">Records per page:</label>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="bg-[var(--surface-color)] px-3 py-1 rounded border border-gray-600"
          >
            {[5, 10, 20, 50].map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className={`px-3 py-1 rounded bg-[var(--primary-color)] ${
              page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            Previous
          </button>
          <select
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value))}
            className="bg-[var(--surface-color)] px-2 py-1 rounded border border-gray-600"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-3 py-1 rounded bg-[var(--primary-color)] ${
              page >= totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Scholarship Table Component */}
      <ScholarshipTable
        scholarships={allScholarships}
        loading={loading}
        onApprove={(id) => handleStatus(id, "approved")}
        onReject={(id) => handleStatus(id, "rejected")}
        onView={handleView}
      />

      {/* Detail Modal */}
      <Modal show={showDetail} onClose={() => setShowDetail(false)}>
        {selectedScholarship ? (
          <div className="p-6 space-y-4 font-[var(--font-family)]">
            <h2 className="text-2xl font-bold mb-2 text-[var(--primary-color)]">
              Scholarship Details
            </h2>
            <div className="space-y-1">
              <p>
                <strong>Name:</strong> {selectedScholarship.user?.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedScholarship.user?.phone}
              </p>
              <p>
                <strong>CnicFront:</strong> {selectedScholarship.user?.cnicFront}
              </p>
              <p>
                <strong>CnicBack:</strong> {selectedScholarship.user?.cnicFront}
              </p>
              
              <p>
                <strong>Degree:</strong> {selectedScholarship.degreeLevel}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    selectedScholarship.status === "approved"
                      ? "text-green-500 font-semibold"
                      : selectedScholarship.status === "rejected"
                      ? "text-red-500 font-semibold"
                      : "text-yellow-400 font-semibold"
                  }
                >
                  {selectedScholarship.status}
                </span>
              </p>
              <p>
                <strong>Submitted On:</strong>{" "}
                {new Date(selectedScholarship.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mt-2 text-lg">Documents:</h3>
              <ul className="list-disc pl-6 space-y-1">
                {selectedScholarship.documents.map((doc) => (
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
          <p className="text-center py-4">Loading...</p>
        )}
      </Modal>
    </div>
  );
}
