'use client';

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, TextField } from "@mui/material";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      // Sign in the user using Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the /gameplay page after successful sign-in
      router.push("/gameplay");  // Corrected route to /gameplay
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Display error message
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
        Sign In
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
      </Box>

      {/* Sign In Button */}
      <Button
        variant="contained"
        size="large"
        sx={{
          width: "200px",
          backgroundColor: "#003069",
          color: "white",
          marginTop: 3,
        }}
        onClick={handleSignIn}
      >
        Sign In
      </Button>

      {/* Redirect to Sign Up */}
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="body2" color="textSecondary">
          {"Don't have an account?"}
          <Link href="/signup" style={{ color: "#003069", fontWeight: "bold" }}>
            Create one here
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

