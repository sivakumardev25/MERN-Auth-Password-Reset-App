import React, { useState } from "react";
import API from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/forgot-password", { email });
    alert("Reset link sent to email");
  };
  console.log("CLIENT_URL:", process.env.CLIENT_URL);

  return (
    <div className="card p-4">
      <h3>Forgot Password</h3>
      {/* Reset password form */}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Submit button */}
        <button className="btn btn-warning">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
