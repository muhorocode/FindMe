// src/pages/Home.jsx
import { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import { missingPersonsAPI } from "../services/api";

export default function Home() {
  const [people, setPeople] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reports
  useEffect(() => {
    let mounted = true;

    async function fetchPeople() {
      setLoading(true);
      setError(null);

      try {
        const res = await missingPersonsAPI.getAll();

        if (res?.status === 200) {
          const list = Array.isArray(res.data?.data) ? res.data.data : [];

          // Newest → Oldest
          const sorted = [...list].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );

          if (mounted) {
            setPeople(sorted);
            setFiltered(sorted);
          }
        } else {
          throw new Error("Failed to fetch reports");
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError("Unable to load missing persons.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPeople();
    return () => (mounted = false);
  }, []);

  // 🔍 LIVE SEARCH — updates filtered list as user types
  const handleLiveSearch = (value) => {
    setQuery(value);

    const q = value.trim().toLowerCase();

    if (!q) {
      setFiltered(people);
      return;
    }

    setFiltered(
      people.filter((p) =>
        (p.full_name || "").toLowerCase().includes(q)
      )
    );
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1300px",
        margin: "0 auto",
        paddingBottom: "4rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "#1f2937" }}>
        Find Missing Persons
      </h1>

      <p style={{ color: "#4b5563", marginBottom: "2rem" }}>
        A community-driven platform to report and search for missing persons.
      </p>

      {/* 🔍 LIVE SEARCH BAR (no form) */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => handleLiveSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "0.9rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        />

        <button
          type="button"
          style={{
            padding: "0 1.6rem",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => handleLiveSearch(query)}
        >
          Search
        </button>
      </div>

      <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>Featured cases</h2>

      {loading && <div style={{ color: "#374151" }}>Loading…</div>}
      {error && <div style={{ color: "crimson" }}>{error}</div>}

      {/* Results */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "2rem",
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        {filtered.map((p) => (
          <PersonCard
            key={p.id}
            person={{
              id: p.id,
              full_name: p.full_name,
              last_seen_location: p.last_seen_location,
              status: p.status || "Missing",
              image_url: p.photo_url || null,
            }}
          />
        ))}
      </div>
    </div>
  );
}
