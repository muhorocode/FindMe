// src/pages/Home.jsx
import { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";

export default function Home() {
  const [people, setPeople] = useState([]); // real data from backend
  const [filtered, setFiltered] = useState([]); // filtered by search
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base URL: use Vite env var if set, otherwise localhost fallback
  const BASE =
    (import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
    process.env.REACT_APP_API_BASE_URL ||
    "http://localhost:5000";

  // Fetch reports from backend
  useEffect(() => {
    let mounted = true;
    const fetchPeople = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE}/api/missing`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to load: ${res.status} ${text}`);
        }
        const data = await res.json();
        if (mounted) {
          // ensure we have an array
          const list = Array.isArray(data) ? data : [];
          setPeople(list);
          setFiltered(list);
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load data");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPeople();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Search handler: filter client-side by name (case-insensitive)
  const handleSearch = (e) => {
    e && e.preventDefault();
    const q = query.trim().toLowerCase();
    if (q === "") {
      setFiltered(people);
      return;
    }
    const filteredList = people.filter((p) => {
      const name = (p.full_name || p.name || "").toString().toLowerCase();
      return name.includes(q);
    });
    setFiltered(filteredList);
  };

  // Allow pressing Enter in the search input to search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "1300px", margin: "0 auto" }}>
      {/* Heading */}
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "700",
          marginBottom: "1rem",
          color: "#1f2937",
        }}
      >
        Find Missing Persons
      </h1>

      <p style={{ color: "#4b5563", marginBottom: "2rem", maxWidth: "650px" }}>
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
          onKeyDown={handleKeyDown}
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

      {/* Featured Section */}
      <h2
        style={{
          fontSize: "1.6rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
        }}
      >
        Featured cases
      </h2>

      {/* Loading / Error */}
      {loading && (
        <div style={{ marginBottom: "1rem", color: "#374151" }}>Loading…</div>
      )}
      {error && (
        <div style={{ marginBottom: "1rem", color: "crimson" }}>
          {error}
        </div>
      )}

      {/* Responsive Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {filtered.length === 0 && !loading && !error ? (
          <div style={{ color: "#6b7280" }}>No cases found.</div>
        ) : (
          filtered.map((p) => {
            // Normalize backend fields to what PersonCard expects.
            const person = {
              id: p.id,
              name: p.full_name || p.name,
              last_seen_location: p.last_seen_location,
              status: p.status || "Missing",
              last_seen_date: p.last_seen_date,
              image_url: p.image_url || p.image || null,
              description: p.description || null,
            };
            return <PersonCard key={person.id} person={person} />;
          })
        )}
      </div>
    </div>
  );
}
