"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { scholarshipService } from "@/services/scholarshipService";

export default function ScholarshipForm({ onSuccess }) {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const [degreeLevel, setDegreeLevel] = useState("");
  const [documents, setDocuments] = useState([]);
  const [degreeLevels, setDegreeLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDegrees() {
      try {
        const levels = await scholarshipService.getDegreeLevels(token);
        setDegreeLevels(levels);
      } catch (err) {
        console.error(err);
      }
    }
    fetchDegrees();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await scholarshipService.createScholarship(token, degreeLevel, documents);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Apply for Scholarship</h2>
      {error && <p className="text-red-500">{error}</p>}

      <select
        className="p-2 border rounded bg-[var(--surface-color)] text-[var(--text-color)]"
        value={degreeLevel}
        onChange={e => setDegreeLevel(e.target.value)}
        required
      >
        <option value="">Select Degree Level</option>
        {degreeLevels.map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      <input
        type="file"
        multiple
        onChange={e => setDocuments(e.target.files)}
        className="text-[var(--text-color)]"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 bg-[var(--accent-color)] rounded font-bold"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
