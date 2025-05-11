import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import TaskManager from "./components/TaskManager";
import LoginSignup from "./components/LoginSignup";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskManager user={user} />} />
        <Route path="/login" element={<LoginSignup onLogin={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
