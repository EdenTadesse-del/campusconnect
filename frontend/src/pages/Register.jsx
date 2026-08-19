import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    );

    navigate("/login");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="brand">
          <div className="brand-logo">C</div>

          <div>
            <h1>CampusConnect</h1>
            <p>Create your student account</p>
          </div>
        </div>

        <div className="auth-heading">
          <h2>Create account</h2>
          <p>
            Join the CampusConnect student community.
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Full name</label>

            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="primary-button"
          >
            Create Account
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?

          <Link to="/login">
            Sign in
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;