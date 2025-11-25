// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (!result.success) {
      setError(result.message || "Registration failed");
      return;
    }

    // registration successful
    navigate("/report");
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create account</h2>
        <p style={styles.subtitle}>Register to manage your reports and save them to your account.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.field}>
            <label style={styles.label}>Full name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. johndoe@gmail.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter a password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {error && <div style={{ color: "crimson", marginBottom: "0.5rem" }}>{error}</div>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating…" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* reuse styles from Login */
const styles = {
  wrapper: {
    width: "100%",
    minHeight: "calc(100vh - 120px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    boxSizing: "border-box",
    background: "#f5f6f7",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    borderRadius: "12px",
    padding: "2.5rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    marginBottom: "0.2rem",
    color: "#111827",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#6b7280",
    marginBottom: "1.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    outline: "none",
    transition: "0.2s border-color ease",
  },
  button: {
    marginTop: "0.5rem",
    width: "100%",
    padding: "0.9rem",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default Register;
