// src/pages/Report.jsx
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { missingPersonsAPI } from "../services/api";

export default function Report() {
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    gender: "",
    height: "",
    last_seen_location: "",
    last_seen_date: "",
    description: "",
    image_url: "",
    contact_name: "",
    contact_phone: "",
    case_number: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false); // for animation
  const [message, setMessage] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setSuccess(false);

    try {
      const payload = {
        full_name: formData.full_name,
        age: Number(formData.age) || null,
        gender: formData.gender,
        height: formData.height,
        last_seen_location: formData.last_seen_location,

        // Required ISO format
        last_seen_date: new Date(formData.last_seen_date).toISOString(),

        additional_info: formData.description,
        photo_url: formData.image_url,
        contact_name: formData.contact_name,
        contact_phone: formData.contact_phone,
        case_number: formData.case_number,
      };

      const res = await missingPersonsAPI.create(payload, token);

      if (res?.status === 201 || res?.status === 200) {
        setSuccess(true);
        setMessage({ type: "success", text: "Report submitted successfully." });

        // Reset form
        setFormData({
          full_name: "",
          age: "",
          gender: "",
          height: "",
          last_seen_location: "",
          last_seen_date: "",
          description: "",
          image_url: "",
          contact_name: "",
          contact_phone: "",
          case_number: "",
        });

        // Reset button after 2 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        setMessage({ type: "error", text: "Failed to submit report." });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: err?.response?.data?.error || "Network error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f5f6f8",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "780px",
          background: "#ffffff",
          padding: "3rem 2.5rem",
          borderRadius: "12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <h1 className="page-title">Report a Missing Person</h1>
        <p className="page-subtitle">
          Please fill in the details below to submit a missing person report.
        </p>

        {message && (
          <div
            style={{
              marginBottom: "1rem",
              color: message.type === "success" ? "green" : "crimson",
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            name="full_name"
            placeholder="e.g. John Doe"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          {/* AGE */}
          <label className="form-label">Age *</label>
          <input
            type="number"
            className="form-input"
            name="age"
            placeholder="e.g. 20"
            value={formData.age}
            onChange={handleChange}
            required
          />

          {/* GENDER */}
          <label className="form-label">Gender *</label>
          <select
            className="form-input"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* HEIGHT */}
          <label className="form-label">Height (optional)</label>
          <input
            type="text"
            className="form-input"
            name="height"
            placeholder="e.g. 5'7 or 170cm"
            value={formData.height}
            onChange={handleChange}
          />

          {/* LAST SEEN LOCATION */}
          <label className="form-label">Last Seen Location *</label>
          <input
            type="text"
            className="form-input"
            name="last_seen_location"
            placeholder="e.g. Nairobi"
            value={formData.last_seen_location}
            onChange={handleChange}
            required
          />

          {/* LAST SEEN DATE */}
          <label className="form-label">Last Seen Date *</label>
          <input
            type="date"
            className="form-input"
            name="last_seen_date"
            value={formData.last_seen_date}
            onChange={handleChange}
            required
          />

          {/* DESCRIPTION */}
          <label className="form-label">Description (optional)</label>
          <textarea
            className="form-input"
            name="description"
            placeholder="Any additional details..."
            value={formData.description}
            onChange={handleChange}
          />

          {/* IMAGE URL */}
          <label className="form-label">Image URL (optional)</label>
          <input
            type="text"
            className="form-input"
            name="image_url"
            placeholder="https://example.com/image.jpg"
            value={formData.image_url}
            onChange={handleChange}
          />

          {/* CONTACT NAME */}
          <label className="form-label">Contact Person Name *</label>
          <input
            type="text"
            className="form-input"
            name="contact_name"
            placeholder="e.g. Jane Doe"
            value={formData.contact_name}
            onChange={handleChange}
            required
          />

          {/* CONTACT PHONE */}
          <label className="form-label">Contact Person Phone *</label>
          <input
            type="text"
            className="form-input"
            name="contact_phone"
            placeholder="e.g. 0712345678"
            value={formData.contact_phone}
            onChange={handleChange}
            required
          />

          {/* CASE NUMBER */}
          <label className="form-label">Case Number *</label>
          <input
            type="text"
            className="form-input"
            name="case_number"
            placeholder="e.g. CASE12345"
            value={formData.case_number}
            onChange={handleChange}
            required
          />

          {/* SUBMIT BUTTON WITH ANIMATION */}
          <button
            className="btn-primary"
            type="submit"
            disabled={submitting || success}
            style={{
              marginTop: "1.5rem",
              height: "48px",
              width: success ? "48px" : "auto",
              padding: success ? "0" : "0 1.2rem",
              borderRadius: success ? "50%" : "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.35s ease",
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            {success ? (
              <span
                style={{
                  fontSize: "1.3rem",
                  opacity: success ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              >
                ✓
              </span>
            ) : submitting ? (
              "Submitting…"
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
