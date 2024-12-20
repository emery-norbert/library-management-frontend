import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (!username || !email || !role || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        role,
        password,
      });

      console.log("Sign-up successful:", response.data);

      alert("Sign-up successful! Please log in.");
      navigate("/login"); // Redirect to login page after successful sign-up
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Error during sign-up. Please try again."
      );
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-8">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-6">Create an account</h1>
          <p className="text-gray-600 mb-6">Join us to get started with your journey!</p>

          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Username Input */}
            <TextField
              label="Username"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Email Input */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Role Selection */}
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>

            {/* Password Input */}
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Sign Up Button */}
            <button
                className="w-full bg-purple-700 text-white py-2 rounded-lg"
                type="submit"
            >
                Register
            </button>
          </form>

          <p className="text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gray-200">
        <div className="max-w-lg text-center p-8">
          <h2 className="text-3xl font-semibold mb-4">
            Join the journey with us
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

export default SignUpScreen;