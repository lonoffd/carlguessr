'use client';

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { Box, Typography, Button, TextField } from "@mui/material";
import Link from "next/link";  // Import Link for navigation

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  // New state for password confirmation
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return; // Stop the sign-up process if passwords don't match
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign-up successful!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "#003069",
          textAlign: "center",
          marginBottom: 4,
          textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        Sign Up
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {/* Input Fields */}
      <Box sx={{ width: "300px", display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "100%" }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "100%" }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Box>

      {/* Sign Up Button */}
      <Button
        variant="contained"
        size="large"
        sx={{
          width: "200px",
          backgroundColor: "#003069",
          color: "white",
          marginTop: 3,
        }}
        onClick={handleSignUp}
      >
        Sign Up
      </Button>

      {/* Link to Sign In */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Already have an account?{" "}
          <Link href="/signin" style={{ color: "#003069", fontWeight: "bold" }}>
            Sign In here
          </Link>
        </Typography>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          padding: 2,
          borderTop: "1px solid #e0e0e0",
          marginTop: 4,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} CarlGuessr
        </Typography>
      </Box>
    </Box>
  );
}
