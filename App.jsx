import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskManager from "./components/TaskManager";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", padding: "1rem" }}>
        <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Link to="/" style={{ color: "cyan", textDecoration: "none" }}>🏠 Home</Link>
          <Link to="/tasks" style={{ color: "cyan", textDecoration: "none" }}>📝 Tasks</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskManager />} />
        </Routes>
      </div>
    </Router>
  );
}
