import React, { useState } from "react";
import API from "../api";

function Register() {
  // State to hold form data
  const [form, setForm] = useState({ email: "", password: "" });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/register", form);
    alert("Registered successfully");
  };

  // const handleSubmit = async () => {
  //   try {
  //     const res = await API.post("/register", {
  //       data: form,
  //       // email,
  //       // password,
  //     });

  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="card p-4">
      <h3>Register</h3>
      {/* Registration form */}
      <form onSubmit={handleSubmit}>
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
        {/* Submit button */}
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;
