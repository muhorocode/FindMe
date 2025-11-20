// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/authContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import MissingPersons from "./pages/MissingPersons";
import Report from "./pages/Report";
import MyReports from "./pages/MyReports";
import PersonDetails from "./pages/PersonDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const { isAuthenticated, initialLoading } = useAuth();

  // Prevent flicker while checking token
  if (initialLoading) return <div>Loading…</div>;

  // Wrapper for private routes
  function ProtectedRoute({ children }) {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
  }

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/missing-persons" element={<MissingPersons />} />

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-reports"
          element={
            <ProtectedRoute>
              <MyReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/person/:id"
          element={
            <ProtectedRoute>
              <PersonDetails />
            </ProtectedRoute>
          }
        />

        {/* 404 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
