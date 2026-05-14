import React, { useState } from "react";
import API from "../api";

function Register() {
  // State to hold form data
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/register", form);
      console.log(res.data);
      alert("Registered successfully");
       alert("Registered successfully");
      setForm({ email: "", password: "" });
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Registration failed");
    }
  };

// }

//     await API.post("/register", form);
   
//   };

//   const handleRegister = async () => {
//   try {
//     const res = await axios.post(
//       `${API_URL}/api/auth/register`,
//       {
//         name,
//         email,
//         password,
//       }
//     );

//     console.log(res.data);

//   } catch (err) {
//     console.log(err);
//   }
// };

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
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
            value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        {/* Submit button */}
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
}

export default Register;
