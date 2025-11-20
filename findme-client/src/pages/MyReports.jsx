// src/pages/MyReports.jsx
import React, { useEffect, useState } from "react";
import ReportRow from "../components/ReportRow";
import EditReportModal from "../components/EditReportModal";
import { useAuth } from "../context/authContext";
import { missingPersonsAPI } from "../services/api";

export default function MyReports() {
  const { user, token, isAuthenticated } = useAuth();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMyReports() {
      setError(null);
      if (!isAuthenticated) {
        setReports([]);
        return;
      }

      setLoading(true);
      try {
        const res = await missingPersonsAPI.getMyReports(token);
        if (res?.status === 200) {
          // backend returns { success: true, data: [...] } per earlier responses
          const list = Array.isArray(res.data?.data) ? res.data.data : [];
          setReports(list);
        } else {
          setError("Failed to fetch your reports.");
        }
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.error || "Network error");
      } finally {
        setLoading(false);
      }
    }

    loadMyReports();
  }, [isAuthenticated, token]);

  // Delete handler (calls backend if authenticated)
  async function handleDelete(id) {
    if (!window.confirm("Delete this report? This action cannot be undone.")) return;
    try {
      if (token) {
        await missingPersonsAPI.delete(id, token);
        setReports((prev) => prev.filter((r) => r.id !== id));
      } else {
        setReports((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Could not delete report. You might not have permissions.");
    }
  }

  // Launch edit modal
  function handleEdit(report) {
    setEditingReport(report);
  }

  // Save updates from modal (attempt backend update if token present)
  async function handleSave(updated) {
    try {
      if (token) {
        await missingPersonsAPI.update(updated.id, updated, token);
      }
      setReports((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
      setEditingReport(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    }
  }

  // Cancel edit
  function handleCancelEdit() {
    setEditingReport(null);
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Please log in to view your reports</h2>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#f5f6f8", padding: "3.5rem 2rem", boxSizing: "border-box" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "14px",
          padding: "2.25rem",
          boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
        }}
      >
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "0.5rem", color: "#0f1724" }}>My Reports</h1>
        <p style={{ color: "#6b7280", marginBottom: "1.75rem" }}>
          Manage the missing person reports you have submitted. Edit to update details or delete if needed.
        </p>

        {loading && <div style={{ color: "#374151" }}>Loading…</div>}
        {error && <div style={{ color: "crimson" }}>{error}</div>}

        {/* report list - full-width cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {reports.length === 0 && !loading ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "#6b7280" }}>You haven't submitted any reports yet.</div>
          ) : (
            reports.map((r) => (
              <ReportRow
                key={r.id}
                report={r}
                onEdit={() => handleEdit(r)}
                onDelete={() => handleDelete(r.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Edit modal */}
      {editingReport && (
        <EditReportModal
          initial={editingReport}
          onSave={handleSave}
          onClose={handleCancelEdit}
        />
      )}
    </div>
  );
}
