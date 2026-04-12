import React, { useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

function ResetPassword() {
  // Extract token from URL parameters and set up state for new password
  const { token } = useParams();
  const [password, setPassword] = useState("");

  //   Handle form submission to reset password
  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post(`/reset-password/${token}`, {
      newPassword: password,
    });
    alert("Password reset successful");
  };

  return (
    <div className="card p-4">
      <h3>Reset Password</h3>
      {/* Reset password form */}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-danger">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
