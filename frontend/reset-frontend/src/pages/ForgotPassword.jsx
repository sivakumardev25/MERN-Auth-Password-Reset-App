import React, { useState } from "react";
import API from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await API.post("/forgot-password", { email });
      setSuccess(res.data.message || "Reset link sent to your email");
      alert("Reset link sent to your email");
      setEmail("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to send reset link";
      setError(errorMsg);
      alert("Error: " + errorMsg);
    }
  };

  return (
    <div className="card p-4">
      <h3>Forgot Password</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {/* Reset password form */}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Submit button */}
        <button className="btn btn-warning" type="submit">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
