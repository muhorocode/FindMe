import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={styles.logo}>FindMe</h1>
        </Link>

        {/* NAV LINKS */}
        <div style={styles.links}>
          <NavItem to="/" label="Home" current={location.pathname} />
          <NavItem to="/about" label="About" current={location.pathname} />
          <NavItem to="/missing-persons" label="Missing Persons" current={location.pathname} />
          <NavItem to="/report" label="Report" current={location.pathname} />
          <NavItem to="/login" label="Login" current={location.pathname} />
        </div>

      </div>
    </nav>
  );
}

/* --------------------------- NAV ITEM --------------------------- */
function NavItem({ to, label, current }) {
  
  // Special rule: home is active ONLY when exact "/"
  const isActive =
    to === "/"
      ? current === "/"
      : current === to || current.startsWith(to + "/");

  return (
    <Link
      to={to}
      style={{
        ...styles.link,
        ...(isActive ? styles.activeLink : {}),
      }}
    >
      {label}
    </Link>
  );
}

/* --------------------------- STYLES --------------------------- */
const styles = {
  nav: {
    width: "100%",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 1200,
  },
  inner: {
    width: "100%",
    maxWidth: "1300px",
    margin: "0 auto",
    padding: "0.8rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
  },
  links: {
    display: "flex",
    gap: 20,
    alignItems: "center",
  },
  link: {
    padding: "6px 10px",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 600,
    color: "#374151",
    borderRadius: 6,
  },
  activeLink: {
    background: "rgba(37, 99, 235, 0.12)",
    color: "#1f2937",
  },
};

export default Navbar;
