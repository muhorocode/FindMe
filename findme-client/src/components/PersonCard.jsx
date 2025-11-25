import { Link } from "react-router-dom";

function PersonCard({ person }) {
  // Backend fields
  const fullName = person.full_name || "Unknown";

  // Use photo_url first, then fall back to image_url (old field)
  const image = person.photo_url || person.image_url;

  const status = (person.status || "missing").toLowerCase();
  const lastSeen = person.last_seen_location || "Unknown";

  const badgeStyle = {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: 600,
    display: "inline-block",
    marginBottom: "0.5rem",
    color: status === "missing" ? "#b91c1c" : "#065f46",
    background: status === "missing" ? "#fee2e2" : "#d1fae5",
  };

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "160px",
          background: "#f3f4f6",
          borderRadius: "6px",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: "0.9rem",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={fullName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ) : (
          "Photo"
        )}
      </div>

      <h2
        style={{
          fontWeight: 600,
          fontSize: "1.1rem",
          marginBottom: "0.5rem",
          color: "#111827",
        }}
      >
        {fullName}
      </h2>

      <span style={badgeStyle}>{person.status || "Missing"}</span>

      <p
        style={{
          fontSize: "0.9rem",
          color: "#4b5563",
          marginBottom: "1rem",
        }}
      >
        <strong>Last Seen:</strong> {lastSeen}
      </p>

      <Link
        to={`/person/${person.id}`}
        style={{
          display: "inline-block",
          padding: "0.5rem 1rem",
          background: "#2563eb",
          color: "white",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "0.9rem",
        }}
      >
        View Details
      </Link>
    </div>
  );
}

export default PersonCard;
