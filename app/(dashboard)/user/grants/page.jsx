"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyGrants } from "@/redux/slices/businessGrantSlice";
import GrantForm from "@/app/components/dashboard/grants/GrantForm";
import GrantUserTable from "@/app/components/dashboard/grants/GrantUserTable";
import Modal from "@/app/components/dashboard/scholoarship/Modal"; // ✅ reuse modal

export default function UserGrantPage() {
  const dispatch = useDispatch();
  const { myGrants, loading } = useSelector((state) => state.businessGrant);
  const token = useSelector((state) => state.auth.token);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (token) dispatch(getMyGrants(token));
  }, [token, dispatch]);

  // Auto-refresh every 5 seconds like scholarship page
  useEffect(() => {
    const interval = setInterval(() => {
      if (token) dispatch(getMyGrants(token));
    }, 5000);
    return () => clearInterval(interval);
  }, [token, dispatch]);

  const handleFormSuccess = () => {
    dispatch(getMyGrants(token));
    setShowForm(false);
  };

  return (
    <div className="p-6 font-[var(--font-family)] text-[var(--text-color)]">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">My Business Grants</h1>
        <button
          className="px-5 py-2 bg-[var(--primary-color)] text-black font-bold rounded-lg shadow-md hover:opacity-90 transition"
          onClick={() => setShowForm(true)}
        >
          Apply for Grant
        </button>
      </div>

      {/* Modal Form */}
      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <GrantForm onSuccess={handleFormSuccess} />
      </Modal>

      {/* Grants Table */}
      <GrantUserTable grants={myGrants} loading={loading} />
    </div>
  );
}
