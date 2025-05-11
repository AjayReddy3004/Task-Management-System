import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user }) {
  return (
    <div className="navbar">
      <Link to="/" className="logo">Task Manager</Link>
      <div className="nav-links">
        <Link to="/tasks">Tasks</Link>
        {user ? (
          <span className="user">👋 {user}</span>
        ) : (
          <Link to="/login">Login / Signup</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
