// src/pages/About.jsx

export default function About() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f7f8fa",
        padding: "4rem 1rem",
        boxSizing: "border-box",
      }}
    >
      {/* MAIN CONTENT WRAPPER */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* GRID LAYOUT: TEXT LEFT — IMAGE RIGHT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          {/* LEFT SIDE TEXT */}
          <div
            style={{
              background: "#ffffff",
              padding: "2.5rem",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                color: "#f97316",
                fontWeight: 600,
                marginBottom: "0.75rem",
                fontSize: "0.95rem",
              }}
            >
              Who We Are
            </p>

            <h1
              style={{
                fontSize: "2.6rem",
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.25,
                marginBottom: "1.2rem",
              }}
            >
              Together, We Help Bring Missing Loved Ones Home
            </h1>

            <p
              style={{
                color: "#4b5563",
                fontSize: "1.05rem",
                lineHeight: "1.7",
                marginBottom: "1.4rem",
              }}
            >
              FindMe is a community-driven platform that helps families,
              communities, and local authorities report, track, and find missing
              persons quickly and reliably. We make critical information visible
              in minutes — not days — so every second counts.
            </p>

            <p
              style={{
                color: "#4b5563",
                fontSize: "1.05rem",
                lineHeight: "1.7",
                marginBottom: "1.4rem",
              }}
            >
              To create a report, simply create an account and click the
              <strong> Report </strong>
              tab. Upload key details, a photo, and last-seen information — and
              your case becomes instantly accessible to the community.
            </p>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div
            style={{
              background: "#ffffff",
              padding: "1rem",
              borderRadius: "14px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            }}
          >
            <img
              src="https://media.istockphoto.com/id/1352766172/vector/multi-ethnic-group-of-hands-raising-up.jpg?s=612x612&w=0&k=20&c=uvBVBpnRDXNVb8Honf2W_xno-0hNxLPW-hyVWlCc1LU="
              alt="FindMe Community"
              style={{
                width: "100%",
                height: "360px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>

        {/* STATS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.4rem",
            marginTop: "1rem",
          }}
        >
          {/* Case Stats */}
          <div style={statBox}>
            <h3 style={statNumber}>150+</h3>
            <p style={statLabel}>Cases Reported</p>
          </div>

          <div style={statBox}>
            <h3 style={statNumber}>32</h3>
            <p style={statLabel}>People Found</p>
          </div>

          <div style={statBox}>
            <h3 style={statNumber}>25+</h3>
            <p style={statLabel}>Counties Involved</p>
          </div>

          <div style={statBox}>
            <h3 style={statNumber}>500+</h3>
            <p style={statLabel}>Community Helpers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- STAT BOX STYLES ------------------------- */

const statBox = {
  background: "#ffffff",
  padding: "1.6rem 1.2rem",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
};

const statNumber = {
  fontSize: "2rem",
  fontWeight: 700,
  color: "#111827",
  margin: 0,
};

const statLabel = {
  marginTop: "0.4rem",
  color: "#4b5563",
  fontSize: "0.95rem",
};
