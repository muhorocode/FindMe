import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import MissingPersons from "./pages/MissingPersons";
import PersonDetails from "./pages/PersonDetails";
import Report from "./pages/Report";
import Search from "./pages/Search";
import Login from "./pages/Login"; // only login page remains

function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main
        style={{
          width: "100%",
          padding: "2rem clamp(1rem, 4vw, 3rem)",
          background: "#fafafa",
          minHeight: "calc(100vh - 120px)",
          boxSizing: "border-box",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Missing persons */}
          <Route path="/missing-persons" element={<MissingPersons />} />
          <Route path="/person/:id" element={<PersonDetails />} />

          {/* Report page */}
          <Route path="/report" element={<Report />} />

          {/* Search page */}
          <Route path="/search" element={<Search />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          width: "100%",
          padding: "1rem 2rem",
          textAlign: "center",
          borderTop: "1px solid #e5e7eb",
          fontSize: "14px",
          color: "#6b7280",
          background: "#fafafa",
          boxSizing: "border-box",
        }}
      >
        © {new Date().getFullYear()} FindMe
      </footer>
    </Router>
  );
}

export default App;
