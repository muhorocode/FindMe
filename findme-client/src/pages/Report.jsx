import { useState } from "react";

export default function Report() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    last_seen_location: "",
    description: "",
    image_url: "",
    contact_person: "",
    contact_details: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus({ loading: true, success: "", error: "" });

    try {
      const response = await fetch(
        "https://findme-backend-2.onrender.com/missing_persons",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      setStatus({
        loading: false,
        success: "Report submitted successfully!",
        error: "",
      });

      setFormData({
        first_name: "",
        last_name: "",
        age: "",
        last_seen_location: "",
        description: "",
        image_url: "",
        contact_person: "",
        contact_details: "",
      });

    } catch (err) {
      setStatus({
        loading: false,
        success: "",
        error: err.message,
      });
    }
  }

  return (
    <div style={styles.page}>
      {/* HERO HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>Report a Missing Person</h1>
        <p style={styles.subtitle}>
          Provide accurate details to help the community locate your loved one.
        </p>
      </div>

      {/* FORM CARD */}
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* FIRST & LAST NAME */}
          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="e.g. John"
                value={formData.first_name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="e.g. Doe"
                value={formData.last_name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          {/* AGE */}
          <div style={styles.field}>
            <label style={styles.label}>Age</label>
            <input
              type="number"
              name="age"
              placeholder="e.g. 20"
              value={formData.age}
              onChange={handleChange}
              style={{ ...styles.input, ...styles.noSpinner }}
              required
            />
          </div>

          {/* LAST SEEN LOCATION */}
          <div style={styles.field}>
            <label style={styles.label}>Last Seen Location</label>
            <input
              type="text"
              name="last_seen_location"
              placeholder="Enter county or city"
              value={formData.last_seen_location}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Provide any helpful details..."
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
          </div>

          {/* IMAGE URL */}
          <div style={styles.field}>
            <label style={styles.label}>Image URL</label>
            <input
              type="text"
              name="image_url"
              placeholder="https://example.com/photo.jpg"
              value={formData.image_url}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* CONTACT PERSON */}
          <div style={styles.field}>
            <label style={styles.label}>Contact Person</label>
            <input
              type="text"
              name="contact_person"
              placeholder="e.g. Sarah Kamau"
              value={formData.contact_person}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* CONTACT DETAILS */}
          <div style={styles.field}>
            <label style={styles.label}>Contact Details</label>
            <input
              type="text"
              name="contact_details"
              placeholder="Phone number or email"
              value={formData.contact_details}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            style={styles.submit}
            disabled={status.loading}
          >
            {status.loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>

        {/* SUCCESS OR ERROR */}
        {status.success && (
          <p style={styles.success}>{status.success}</p>
        )}
        {status.error && (
          <p style={styles.error}>{status.error}</p>
        )}
      </div>
    </div>
  );
}


/* ------------------------ STYLES ------------------------ */
const styles = {
  page: {
    maxWidth: "650px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "0.3rem",
    color: "#1f2937",
  },
  subtitle: {
    color: "#4b5563",
    fontSize: "0.95rem",
  },

  card: {
    background: "#ffffff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },

  row: {
    display: "flex",
    gap: "1rem",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  label: {
    fontWeight: "600",
    marginBottom: "0.4rem",
    fontSize: "0.9rem",
    color: "#374151",
  },

  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.95rem",
  },

  textarea: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    fontSize: "0.95rem",
  },

  /* remove number field spinners */
  noSpinner: {
    MozAppearance: "textfield",
  },

  submit: {
    padding: "0.8rem",
    background: "#2563eb",
    color: "white",
    borderRadius: "8px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },

  success: {
    marginTop: "1rem",
    color: "green",
    fontWeight: "600",
  },

  error: {
    marginTop: "1rem",
    color: "red",
    fontWeight: "600",
  },
};
