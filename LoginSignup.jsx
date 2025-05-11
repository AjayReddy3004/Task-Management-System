import React, { useState } from "react";
import "./LoginSignup.css";

function LoginSignup({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/login" : "/api/signup";

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        if (isLogin) {
          onLogin(email);
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <input type="email" placeholder="Email" value={email} required onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        <p onClick={() => setIsLogin(!isLogin)} className="switch">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default LoginSignup;
