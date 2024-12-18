'use client'; // Ensure it's treated as a client component

import React from "react";
import { Box, Typography, Button, IconButton, Avatar } from "@mui/material";
import Link from 'next/link';  // Use Next.js Link

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Top Navigation (User Icon) */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        <IconButton sx={{ color: "#003069" }} aria-label="User Profile">
          <Avatar sx={{ bgcolor: "#003069" }}>U</Avatar>
        </IconButton>
      </Box>

      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "#003069",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 2,
          textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        CarlGuessr
      </Typography>

      {/* Description */}
      <Typography
        variant="h6"
        sx={{
          color: "#003069",
          textAlign: "center",
          marginBottom: 4,
          maxWidth: "600px",
        }}
      >
        CarlGuessr is a browser-based geography game for Carleton campus inspired by GeoGuessr.
      </Typography>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Link href="/signin" passHref>
          <Button
            variant="contained"
            size="large"
            sx={{
              width: "200px",
              backgroundColor: "#003069",
              color: "white",
            }}
          >
            Play Game
          </Button>
        </Link>
        <Link href="/creategame" passHref>
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: "200px",
              borderColor: "#003069",
              color: "#003069",
            }}
          >
            Create Game
          </Button>
        </Link>
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
