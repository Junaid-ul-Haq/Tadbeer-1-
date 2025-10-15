"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@/app/components/dashboard/scholoarship/Modal";
import ScholarshipForm from "@/app/components/dashboard/scholoarship/ScholarshipForm";
import { fetchUserScholarships } from "@/redux/slices/scholarshipSlice";
import UserScholarshipTable from "@/app/components/dashboard/scholoarship/UserScholorshipTable";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const { userScholarships, loading } = useSelector((state) => state.scholarship);
  const token = useSelector((state) => state.auth.token);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (token) dispatch(fetchUserScholarships(token));
  }, [token]);

  const handleFormSuccess = () => {
    dispatch(fetchUserScholarships(token));
    setShowForm(false);
  };
  useEffect(() => {
  const interval = setInterval(() => {
    if (token) dispatch(fetchUserScholarships(token));
  }, 5000); // fetch every 5 seconds

  return () => clearInterval(interval);
}, [token, dispatch]);


  return (
    <div className="p-6 font-[var(--font-family)] text-[var(--text-color)]">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <button
          className="px-5 py-2 bg-[var(--primary-color)] text-black font-bold rounded-lg shadow-md hover:opacity-90 transition"
          onClick={() => setShowForm(true)}
        >
          Apply for Scholarship
        </button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <ScholarshipForm onSuccess={handleFormSuccess} />
      </Modal>

      {/* User Scholarships Table */}
      <UserScholarshipTable scholarships={userScholarships} loading={loading} />
    </div>
  );
}
