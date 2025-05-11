import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const quotes = [
  "Stay focused. Stay organized. You got this.",
  "Plan your work, then work your plan.",
  "Your future is created by what you do today.",
  "Small steps every day lead to big results.",
  "Discipline is the bridge between goals and achievement.",
];

function Home() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  }, []);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title animate">🗂️ Task Manager</h1>
        <p className="home-quote fade-in">{quote}</p>
        <div className="home-buttons">
          <Link to="/tasks" className="home-btn">🚀 Get Started</Link>
          <Link to="/login" className="home-btn secondary">🔐 Login / Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
