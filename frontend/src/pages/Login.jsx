import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem(
        "role",
        "admin"
      );

      navigate("/admin");

      return;
    }

    try {
      const response =
        await getStudents();

      const students =
        response.data;

      const student =
        students.find(
          (item) =>
            item.email === email &&
            item.password === password
        );

      if (student) {
        localStorage.setItem(
          "role",
          "student"
        );

        localStorage.setItem(
          "student",
          JSON.stringify(student)
        );

        navigate("/student");
      } else {
        setMessage(
          "Invalid email or password"
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Cannot connect to backend server"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <div className="logo-circle">
            CC
          </div>

          <h1>
            CampusConnect
          </h1>

          <p>
            Login to your account
          </p>

        </div>

        <form
          onSubmit={handleLogin}
        >

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

          </div>

          {message && (
            <p className="error-message">
              {message}
            </p>
          )}

          <button
            className="login-button"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;