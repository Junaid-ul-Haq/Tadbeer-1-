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
import CNICPreview from "@/app/components/cnicPreview";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-[#060606] via-[#0a0a0a] to-[#111] text-white p-8 font-[var(--font-family)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent">
          Scholarship Applications
        </h1>
        <p className="text-gray-400 text-center mt-2">
          Review, approve, and manage scholarship requests efficiently.
        </p>
      </motion.div>

      {/* Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-[#0F0F0F]/60 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_25px_rgba(24,186,214,0.1)] p-6"
      >
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <label className="font-medium">Records per page:</label>
            <select
              value={limit}
              onChange={handleLimitChange}
              className="bg-[#1A1A1A]/80 text-white border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
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
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                page <= 1
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-[var(--accent-color)] to-[var(--primary-color)] hover:opacity-90"
              }`}
            >
              ← Previous
            </button>

            <select
              value={page}
              onChange={(e) => setPage(parseInt(e.target.value))}
              className="bg-[#1A1A1A]/80 text-white border border-white/10 rounded-lg px-3 py-2"
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
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                page >= totalPages
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] hover:opacity-90"
              }`}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Scholarship Table */}
        <ScholarshipTable
          scholarships={allScholarships}
          loading={loading}
          onApprove={(id) => handleStatus(id, "approved")}
          onReject={(id) => handleStatus(id, "rejected")}
          onView={handleView}
        />
      </motion.div>

      {/* Detail Modal */}
     <Modal show={showDetail} onClose={() => setShowDetail(false)}>
  {selectedScholarship ? (
    <div className="p-6 bg-[#0F0F0F]/90 rounded-2xl text-gray-200 max-h-[90vh] overflow-y-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[var(--primary-color)] to-[var(--accent-color)] bg-clip-text text-transparent mb-6">
        Applicant Details
      </h2>

      {/* CNIC Section - Row at Top */}
      

      {/* Applicant Details Below CNIC */}
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          <strong>Name:</strong> {selectedScholarship.user?.name}
        </p>
        <p>
          <strong>Phone:</strong> {selectedScholarship.user?.phone}
        </p>

        <div>
          <strong>Education:</strong>
          {selectedScholarship.user?.education?.length > 0 ? (
            selectedScholarship.user.education.map((edu, i) => (
              <div
                key={i}
                className="ml-3 mt-1 text-gray-400 border-l border-white/10 pl-3"
              >
                🎓 {edu.institute} — {edu.degree} ({edu.startDate} →{" "}
                {edu.endDate}) CGPA: {edu.cgpa}
              </div>
            ))
          ) : (
            <span> No education details provided </span>
          )}
        </div>

        <div>
          <strong>Experience:</strong>
          {selectedScholarship.user?.experience?.length > 0 ? (
            selectedScholarship.user.experience.map((exp, i) => (
              <div
                key={i}
                className="ml-3 mt-1 text-gray-400 border-l border-white/10 pl-3"
              >
                💼 {exp.institute} — {exp.role} ({exp.startDate} →{" "}
                {exp.endDate})
              </div>
            ))
          ) : (
            <span> No experience details provided </span>
          )}
        </div>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`${
              selectedScholarship.status === "approved"
                ? "text-green-400"
                : selectedScholarship.status === "rejected"
                ? "text-red-400"
                : "text-yellow-400"
            } font-semibold`}
          >
            {selectedScholarship.status}
          </span>
        </p>

        <p>
          <strong>Submitted:</strong>{" "}
          {new Date(selectedScholarship.createdAt).toLocaleString()}
        </p>
      </div>

{selectedScholarship.user && (
        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-3 border-b border-white/10 pb-2">
            CNIC Documents
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            <CNICPreview
              cnicFront={selectedScholarship.user.cnicFront}
              cnicBack={selectedScholarship.user.cnicBack}
              token={token}
            />
          </div>
        </div>
      )}
      
      {/* Uploaded Documents at the Bottom */}
      {selectedScholarship.documents?.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-lg border-b border-white/10 pb-2 mb-3">
            Other Uploaded Documents
          </h3>
          <ul className="list-disc pl-6 space-y-3">
            {selectedScholarship.documents.map((doc) => (
              <li
                key={doc.filePath}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-[var(--accent-color)] underline truncate">
                  {doc.fileName}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      try {
                        // Handle different file path formats
                        let folder, filename;
                        
                        if (doc.filePath.startsWith('/files/')) {
                          // Format: /files/scholarships/filename.pdf
                          const pathParts = doc.filePath.split('/');
                          folder = pathParts[2];
                          filename = pathParts[3];
                        } else if (doc.filePath.startsWith('/uploads/')) {
                          // Format: /uploads/scholarships/filename.pdf
                          const pathParts = doc.filePath.split('/');
                          folder = pathParts[pathParts.length - 2];
                          filename = pathParts[pathParts.length - 1];
                        } else {
                          folder = 'scholarships';
                          filename = doc.filePath;
                        }
                        
                        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/files/${folder}/${filename}`, {
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = doc.fileName;
                        a.click();
                        window.URL.revokeObjectURL(url);
                      } catch (error) {
                        console.error("Download failed:", error);
                        alert("Download failed. Please check your connection and try again.");
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-xs font-medium"
                  >
                    Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    <p className="text-center py-4 text-gray-400">Loading details...</p>
  )}
</Modal>


    </div>
  );
}
