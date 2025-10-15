"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllConsultations,
  updateConsultationStatus,
  fetchConsultationById,
} from "@/redux/slices/consultationSlice";
import ConsultationTable from "@/app/components/dashboard/consultation/ConsultationTable";
import Modal from "@/app/components/dashboard/scholoarship/Modal";

export default function AdminConsultationDashboard() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const { allConsultations, selectedConsultation, loading, totalPages } = useSelector(state => state.consultation);

  const [showDetail, setShowDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (token) fetchPage(page, limit);
  }, [token, page, limit]);

  const fetchPage = async (pageNumber, pageLimit) => {
    await dispatch(fetchAllConsultations({ token, page: pageNumber, limit: pageLimit }));
  };

  const handleStatus = async (id, status) => {
    await dispatch(updateConsultationStatus({ token, id, status }));
  };

  const handleView = async (id) => {
    await dispatch(fetchConsultationById({ token, id }));
    setShowDetail(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Consultations</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label>Records per page:</label>
          <select value={limit} onChange={e => { setLimit(parseInt(e.target.value)); setPage(1); }}>
            {[5,10,20,50].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <button disabled={page <= 1} onClick={() => setPage(page-1)}>Prev</button>
          <select value={page} onChange={e => setPage(parseInt(e.target.value))}>
            {Array.from({ length: totalPages }, (_, i) => i+1).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button disabled={page >= totalPages} onClick={() => setPage(page+1)}>Next</button>
        </div>
      </div>

      <ConsultationTable
        consultations={allConsultations}
        loading={loading}
        onApprove={(id) => handleStatus(id, "approved")}
        onReject={(id) => handleStatus(id, "rejected")}
        onView={handleView}
      />

      <Modal show={showDetail} onClose={() => setShowDetail(false)}>
        {selectedConsultation ? (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2 text-[var(--primary-color)]">
              Consultation Details
            </h2>
            <p><strong>Name:</strong> {selectedConsultation.user?.name}</p>
            <p><strong>Phone:</strong> {selectedConsultation.user?.phone}</p>
            
            <p><strong>CnicFront:</strong> {selectedConsultation.user?.cnicFront}</p>
             <p><strong>CnicBack:</strong> {selectedConsultation.user?.cnicFront}</p>


            <p><strong>Email:</strong> {selectedConsultation.user?.email}</p>
            <p><strong>Category:</strong> {selectedConsultation.category}</p>
            <p><strong>Description:</strong> {selectedConsultation.description}</p>
           
            <span
                  className={
                    selectedConsultation.status === "approved"
                      ? "text-green-500 font-semibold"
                      : selectedConsultation.status === "rejected"
                      ? "text-red-500 font-semibold"
                      : "text-yellow-400 font-semibold"
                  }
                >
                  {selectedConsultation.status}
                </span>
          </div>
        ) : <p>Loading...</p>}
      </Modal>
    </div>
  );
}
