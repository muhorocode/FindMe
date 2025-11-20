// src/pages/Home.jsx
import { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import { missingPersonsAPI } from "../services/api";

export default function Home() {
  const [people, setPeople] = useState([]); // real data from backend
  const [filtered, setFiltered] = useState([]); // filtered by search
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reports from backend
  useEffect(() => {
    let mounted = true;
    const fetchPeople = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await missingPersonsAPI.getAll();
        if (res?.status === 200) {
          const list = Array.isArray(res.data?.data) ? res.data.data : [];
          if (mounted) {
            setPeople(list);
            setFiltered(list);
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
    };

    fetchPeople();
    return () => (mounted = false);
  }, []);

  const handleSearch = (e) => {
    e && e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) {
      setFiltered(people);
      return;
    }

    setFiltered(
      people.filter((p) =>
        (p.full_name || p.name || "").toLowerCase().includes(q)
      )
    );
  };

  return (
    <div style={{ width: "100%", maxWidth: "1300px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: 700, color: "#1f2937" }}>
        Find Missing Persons
      </h1>

      <p style={{ color: "#4b5563", marginBottom: "2rem" }}>
        A community-driven platform to report and search for missing persons.
      </p>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "1rem", marginBottom: "3rem" }}
      >
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "0.9rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "0 1.6rem",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      <h2 style={{ fontSize: "1.6rem", fontWeight: 700 }}>Featured cases</h2>

      {loading && <div style={{ color: "#374151" }}>Loading…</div>}
      {error && <div style={{ color: "crimson" }}>{error}</div>}

      {/* Results grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
          width: "100%",
        }}
      >
        {filtered.map((p) => (
          <PersonCard
            key={p.id}
            person={{
              id: p.id,
              name: p.full_name,
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
