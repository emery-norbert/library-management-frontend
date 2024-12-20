import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }

    console.log({
        username,
        password,
      });

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      console.log("Login successful:", response.data);

      // Store token or user data securely
      const token = response.data; // Replace with actual token/response field
      if (rememberMe) {
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token);
      }

      // Redirect user
      alert("Login successful!");
      navigate("/boojs"); // Update with your dashboard route
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Invalid username or password. Please try again."
      );
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-8">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-6">Log in to your account</h1>
          <p className="text-gray-600 mb-6">Welcome back! Please enter your details.</p>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <TextField
              label="Username"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Password Input */}
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Remember Me Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me for 30 days"
            />

            {/* Login Button */}
            <button
            className="w-full bg-purple-700 text-white py-2 rounded-lg"
            type="submit"
          >
            Login
          </button>
          </form>

          <p className="text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gray-200">
        <div className="max-w-lg text-center p-8">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to our library, the heart of knowledge
          </h2>
          <p className="text-gray-600">
            Emery Norbert<br />
            Lead Designer, Layers<br />
            Web Development Agency
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;