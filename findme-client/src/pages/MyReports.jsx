// src/pages/MyReports.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { missingPersonsAPI } from "../services/api";
import EditReportModal from "../components/EditReportModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Link } from "react-router-dom";

export default function MyReports() {
  const { token } = useAuth();

  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editingReport, setEditingReport] = useState(null);
  const [deletingReport, setDeletingReport] = useState(null);

  // LOAD USER REPORTS
  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      try {
        const res = await missingPersonsAPI.getMyReports(token);
        if (res.status === 200) {
          const sorted = [...res.data.data].reverse();
          setReports(sorted);
          setFiltered(sorted);
        }
      } catch (err) {
        setError("Unable to load your reports.");
      }
      setLoading(false);
    }

    loadReports();
  }, [token]);

  // SEARCH FILTERING
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    if (!term) {
      setFiltered(reports);
    } else {
      setFiltered(
        reports.filter((r) =>
          (r.full_name + r.case_number).toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, reports]);

  // SAVE EDIT (returns TRUE or FALSE)
  const handleSaveEdit = async (updated) => {
    try {
      const res = await missingPersonsAPI.update(updated.id, updated, token);

      if (res.status === 200) {
        const updatedList = reports.map((r) =>
          r.id === updated.id ? { ...r, ...updated } : r
        );

        setReports(updatedList);
        setFiltered(updatedList);

        return true;
      }
    } catch (err) {
      return false;
    }

    return false;
  };

  // DELETE REPORT
  const handleConfirmDelete = async () => {
    try {
      const res = await missingPersonsAPI.delete(
        deletingReport.id,
        token
      );

      if (res.status === 200) {
        const newList = reports.filter((r) => r.id !== deletingReport.id);
        setReports(newList);
        setFiltered(newList);
      }
    } catch (err) {
      alert("Delete failed.");
    }

    setDeletingReport(null);
  };

  return (
    <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.4rem", fontWeight: 700 }}>
        My Reports
      </h1>

      <p style={{ color: "#4b5563", marginBottom: "1.5rem" }}>
        Manage all missing person reports you have submitted.
      </p>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or case number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "0.9rem",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          marginBottom: "2rem",
        }}
      />

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {/* LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        {filtered.map((person) => (
          <div
            key={person.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.3rem 1.4rem",
              background: "#fff",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
            }}
          >
            {/* LEFT SIDE */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={person.photo_url}
                alt={person.full_name}
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  background: "#f3f4f6",
                }}
              />

              <div style={{ lineHeight: "1.6" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  {person.full_name}
                </div>
                <div style={{ color: "#6b7280" }}>
                  Case: <strong>{person.case_number}</strong>
                </div>
                <div style={{ fontSize: "0.88rem" }}>
                  Age: <strong>{person.age}</strong> | Gender:{" "}
                  <strong>{person.gender}</strong>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <Link to={`/person/${person.id}`} style={btnView}>
                View
              </Link>

              <button
                onClick={() => setEditingReport(person)}
                style={btnEdit}
              >
                Edit
              </button>

              <button
                onClick={() => setDeletingReport(person)}
                style={btnDelete}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODALS */}
      {editingReport && (
        <EditReportModal
          initial={editingReport}
          onClose={() => setEditingReport(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deletingReport && (
        <DeleteConfirmModal
          report={deletingReport}
          onClose={() => setDeletingReport(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

/* BUTTON STYLES */
const btnView = {
  padding: "0.45rem 1rem",
  borderRadius: "6px",
  background: "#f3f4f6",
  border: "1px solid #d1d5db",
  color: "#1f2937",
  fontSize: "0.85rem",
  textDecoration: "none",
  cursor: "pointer",
};

const btnEdit = {
  padding: "0.45rem 1rem",
  borderRadius: "6px",
  background: "#e8f0ff",
  border: "1px solid #c3dafc",
  color: "#1e40af",
  fontSize: "0.85rem",
  cursor: "pointer",
};

const btnDelete = {
  padding: "0.45rem 1rem",
  borderRadius: "6px",
  background: "#fee2e2",
  border: "1px solid #fecaca",
  color: "#b91c1c",
  fontSize: "0.85rem",
  cursor: "pointer",
};
