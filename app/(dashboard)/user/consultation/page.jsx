"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@/app/components/dashboard/scholoarship/Modal";
import ConsultationForm from "@/app/components/dashboard/consultation/ConsultationForm";
import UserConsultationTable from "@/app/components/dashboard/consultation/UserTable";
import { fetchUserConsultations } from "@/redux/slices/consultationSlice";

export default function UserConsultationDashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { userConsultations, loading, error } = useSelector((state) => state.consultation);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (token) dispatch(fetchUserConsultations(token));
  }, [token, dispatch]);
useEffect(() => {
  const interval = setInterval(() => {
    if (token) dispatch(fetchUserConsultations(token));
  }, 5000); // fetch every 5 seconds

  return () => clearInterval(interval);
}, [token, dispatch]);

  const handleFormSuccess = () => {
    dispatch(fetchUserConsultations(token));
    setShowForm(false);
  };

  return (
    <div className="p-6 font-[var(--font-family)] text-[var(--text-color)]">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">My Consultations</h1>
        <button
          className="px-5 py-2 bg-[var(--primary-color)] text-black font-bold rounded-lg shadow-md hover:opacity-90 transition"
          onClick={() => setShowForm(true)}
        >
          Book Consultation
        </button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <ConsultationForm onSuccess={handleFormSuccess} />
      </Modal>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <UserConsultationTable consultations={userConsultations} loading={loading} />
    </div>
  );
}
