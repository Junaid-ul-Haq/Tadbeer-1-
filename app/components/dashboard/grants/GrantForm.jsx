"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGrant, getMyGrants } from "@/redux/slices/businessGrantSlice";
import { toast } from "react-hot-toast";

export default function GrantForm({ onSuccess }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({
    title: "",
    description: "",
    amountRequested: "",
    proposal: null,
  });
  const [loading, setLoading] = useState(false);

  // 🟢 Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // 🟢 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.amountRequested)
      formData.append("amountRequested", form.amountRequested);
    if (form.proposal) formData.append("proposal", form.proposal);

    try {
      await dispatch(createGrant({ token, formData })).unwrap();
      toast.success("✅ Grant submitted successfully!");
      await dispatch(getMyGrants(token));
      setForm({
        title: "",
        description: "",
        amountRequested: "",
        proposal: null,
      });
      onSuccess && onSuccess();
    } catch (err) {
      toast.error(`❌ ${err.message || "Failed to submit grant."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-center text-[var(--primary-color)]">
        Apply for Business Grant
      </h2>

      {/* Grant Title */}
      <input
        type="text"
        name="title"
        placeholder="Grant Title"
        value={form.title}
        onChange={handleChange}
        required
        className="p-2 border rounded bg-[var(--surface-color)] text-[var(--text-color)]"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Describe your business idea..."
        value={form.description}
        onChange={handleChange}
        rows={4}
        required
        className="p-2 border rounded bg-[var(--surface-color)] text-[var(--text-color)]"
      />

      {/* Amount Requested */}
      <input
        type="number"
        name="amountRequested"
        placeholder="Amount Requested (optional)"
        value={form.amountRequested}
        onChange={handleChange}
        className="p-2 border rounded bg-[var(--surface-color)] text-[var(--text-color)]"
      />

      {/* Proposal File Upload */}
      <input
        type="file"
        name="proposal"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="p-2 border rounded bg-[var(--surface-color)] text-[var(--text-color)]"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded font-bold text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[var(--accent-color)] hover:opacity-90"
        }`}
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
