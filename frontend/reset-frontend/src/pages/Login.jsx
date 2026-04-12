import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function Login() {
    // State to hold form data
  const [form, setForm] = useState({ email: "", password: "" });

    // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/login", form);
    alert("Login Success");

    console.log(res.data);
  };

  return (
    <div className="card p-4">
      <h3>Login</h3>
      {/* Login form */}
          <form onSubmit={handleSubmit}>
              {/* Email and password input fields */}
        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {/* Login button */}
        <button className="btn btn-primary">Login</button>
      </form>

          {/* Forgot password and register links */}
      <Link to="/forgot-password">Forgot Password?</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
