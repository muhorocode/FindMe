// src/components/EditReportModal.jsx
import React, { useState } from "react";

export default function EditReportModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    id: initial.id,
    full_name: initial.full_name || "",
    age: initial.age || "",
    gender: initial.gender || "",
    height: initial.height || "",
    last_seen_location: initial.last_seen_location || "",
    last_seen_date: initial.last_seen_date?.split("T")[0] || "",
    status: initial.status || "Missing",
    photo_url: initial.photo_url || "",
    contact_name: initial.contact_name || "",
    contact_phone: initial.contact_phone || "",
    case_number: initial.case_number || "",
    description: initial.additional_info || "",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const required = [
      "full_name",
      "age",
      "gender",
      "last_seen_location",
      "last_seen_date",
      "contact_name",
      "contact_phone",
      "case_number",
    ];
    return required.every((k) => form[k]?.toString().trim() !== "");
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }

    setSaving(true);

    const payload = {
      id: form.id,
      height: form.height,
      last_seen_location: form.last_seen_location,
      last_seen_date: form.last_seen_date,
      status: form.status,
      contact_name: form.contact_name,
      contact_phone: form.contact_phone,
      additional_info: form.description,
    };

    try {
      const result = await onSave(payload);

      if (result === false) {
        setSaving(false);
        setShake(true);
        setTimeout(() => setShake(false), 600);
        return;
      }

      // success animation
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      setSaving(false);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            padding: "1.2rem 1.5rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 600 }}>
            Update Report
          </h2>

          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "0.95rem",
              color: "#555",
            }}
          >
            Close
          </button>
        </div>

        {/* IMAGE */}
        <div
          style={{
            padding: "1.4rem",
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #e5e7eb",
            background: "#f9fafb",
          }}
        >
          {form.photo_url && (
            <img
              src={form.photo_url}
              alt="Missing person"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSave}
          style={{
            overflowY: "auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* IDENTITY DETAILS */}
          <Section title="Identity Details">
            <div style={twoColGrid}>
              <Input label="Full Name *" value={form.full_name} disabled />
              <Input label="Age *" value={form.age} disabled />
              <Input label="Gender *" value={form.gender} disabled />

              <Input
                label="Height (optional)"
                name="height"
                value={form.height}
                onChange={change}
              />
            </div>
          </Section>

          {/* REPORT DETAILS */}
          <Section title="Report Details">
            <div style={twoColGrid}>
              <Input
                label="Last Seen Location *"
                name="last_seen_location"
                value={form.last_seen_location}
                onChange={change}
              />

              <Input
                label="Last Seen Date *"
                type="date"
                name="last_seen_date"
                value={form.last_seen_date}
                onChange={change}
              />

              <Input label="Case Number *" value={form.case_number} disabled />

              <div>
                <label style={labelStyle}>Missing Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={change}
                  style={inputStyle}
                >
                  <option value="Missing">Missing</option>
                  <option value="Found">Found</option>
                </select>
              </div>
            </div>
          </Section>

          {/* CONTACT DETAILS */}
          <Section title="Contact Details">
            <div style={twoColGrid}>
              <Input
                label="Contact Person Name *"
                name="contact_name"
                value={form.contact_name}
                onChange={change}
              />
              <Input
                label="Contact Person Phone *"
                name="contact_phone"
                value={form.contact_phone}
                onChange={change}
              />
            </div>
          </Section>

          {/* DESCRIPTION */}
          <Section title="Description">
            <textarea
              name="description"
              value={form.description}
              onChange={change}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </Section>

          {/* SUBMIT BUTTON */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={saving && !success}
              style={{
                ...submitBtn,
                opacity: saving ? 0.85 : 1,
                transform: shake ? "translateX(-4px)" : "translateX(0)",
                transition: "0.2s",
              }}
            >
              {/* Success icon */}
              {success ? (
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </span>
              ) : saving ? (
                "Updating…"
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------- Components ---------------------------- */

function Section({ title, children }) {
  return (
    <div>
      <h3 style={sectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

function Input({ label, name, value, disabled, onChange, type = "text" }) {
  return (
    <div style={{ minWidth: "100%", flex: 1 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        style={disabled ? disabledInput : inputStyle}
      />
    </div>
  );
}

/* ---------------------------- Styles ---------------------------- */

const sectionTitle = {
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.35rem",
  color: "#374151",
  fontSize: "0.9rem",
};

const twoColGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.6rem 0.75rem",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "0.95rem",
};

const disabledInput = {
  ...inputStyle,
  background: "#f3f4f6",
  color: "#6b7280",
};

const submitBtn = {
  background: "#2563eb",
  color: "white",
  padding: "0.7rem 1.4rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "0.95rem",
};

