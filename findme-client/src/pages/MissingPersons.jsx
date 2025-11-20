import { useEffect, useState } from "react";
import PersonCard from "../components/PersonCard";
import { missingPersonsAPI } from "../services/api";

function MissingPersons() {
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch real backend data instead of dummy data
  useEffect(() => {
    async function loadPeople() {
      setLoading(true);
      setError(null);

      try {
        const res = await missingPersonsAPI.getAll();
        if (res.status === 200) {
          const list = Array.isArray(res.data?.data) ? res.data.data : [];

          // newest first
          setPeople([...list].reverse());
        } else {
          setError("Unable to load missing persons.");
        }
      } catch (err) {
        console.error("Error fetching missing persons:", err);
        setError("Unable to load missing persons.");
      } finally {
        setLoading(false);
      }
    }

    loadPeople();
  }, []);

  // FILTER LOGIC
  const filteredPeople = people.filter((person) => {
    const matchesName =
      searchTerm === "" ||
      (person.full_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === "All" ||
      person.last_seen_location === locationFilter;

    const matchesStatus =
      statusFilter === "All" || person.status === statusFilter;

    return matchesName && matchesLocation && matchesStatus;
  });

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "2rem 1.5rem",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "1.5rem",
          color: "#1f2937",
        }}
      >
        All Missing Persons
      </h1>

      {/* SEARCH + FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: "1",
            minWidth: "280px",
            padding: "0.8rem",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
            fontSize: "0.95rem",
          }}
        />

        <div style={wrapperStyle}>
          <span style={placeholderLabelStyle}>
            {locationFilter === "All" ? "Filter by Location" : locationFilter}
          </span>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Mombasa">Mombasa</option>
            <option value="Kisumu">Kisumu</option>
            <option value="Thika">Thika</option>
            <option value="Nakuru">Nakuru</option>
            <option value="Eldoret">Eldoret</option>
            <option value="Meru">Meru</option>
            <option value="Machakos">Machakos</option>
          </select>
        </div>

        <div style={wrapperStyle}>
          <span style={placeholderLabelStyle}>
            {statusFilter === "All" ? "Filter by Status" : statusFilter}
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All</option>
            <option value="missing">Missing</option>
            <option value="found">Found</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {loading && <p style={{ color: "#4b5563" }}>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {filteredPeople.length === 0 && !loading ? (
        <p style={{ color: "#4b5563" }}>No missing persons found.</p>
      ) : (
        <div style={gridStyle}>
          {filteredPeople.map((p) => (
            <PersonCard
              key={p.id}
              person={{
                id: p.id,
                name: p.full_name,
                last_seen_location: p.last_seen_location,
                status: p.status,
                image_url: p.photo_url,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Styles unchanged
const wrapperStyle = {
  position: "relative",
  width: "180px",
};

const placeholderLabelStyle = {
  position: "absolute",
  top: "50%",
  left: "12px",
  transform: "translateY(-50%)",
  fontSize: "0.9rem",
  color: "#374151",
  pointerEvents: "none",
};

const selectStyle = {
  width: "100%",
  padding: "0.7rem",
  fontSize: "0.9rem",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  backgroundColor: "#f3f4f6",
  color: "transparent",
  cursor: "pointer",
  appearance: "none",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%236b7280' d='M5.25 7.5L10 12.25L14.75 7.5H5.25Z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "1.8rem",
  alignItems: "start",
};

export default MissingPersons;
