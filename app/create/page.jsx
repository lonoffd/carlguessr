"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

export default function CreatePage() {
  // State for URLs and coordinates
  const [urls, setUrls] = useState({ url1: "" });
  const [coords, setCoords] = useState({ x: null, y: null });
  const [isReadyToUpload, setIsReadyToUpload] = useState(false);

  // Handle changes in URL inputs
  const handleChange = (e) => {
    setUrls({
      ...urls,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image click to capture coordinates
  const handleImageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  // Check if the form is ready to submit
  const checkReadyToUpload = () => {
    return urls.url1 && coords.x !== null && coords.y !== null;
  };

  // Update upload button status
  useEffect(() => {
    setIsReadyToUpload(checkReadyToUpload());
  }, [urls, coords]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#f9f9f9",
        position: "relative", // Ensure absolute elements are positioned relative to this container
      }}
    >
      {/* Exit Button */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "80px",
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            width: "100px",
            backgroundColor: "#003069",
            color: "white",
          }}
          href="./"
        >
          Exit
        </Button>
      </div>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#003069",
          textAlign: "center",
          marginTop: 8,
          marginBottom: 4,
        }}
      >
        Create Your Challenges
      </Typography>

      {/* Description */}
      <Typography variant="body1" color="textSecondary" marginBottom={4}>
        Create your challenge for Carls by uploading a photo and dropping a pin
        to indicate where you took it.
      </Typography>

      {/* Input Fields */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {/* URL Inputs */}
        <TextField
          label="Enter URL 1"
          type="text"
          variant="outlined"
          fullWidth
          value={urls.url1}
          onChange={handleChange}
          name="url1"
        />
        {/* Campus Map Section */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            height: "360px",
            backgroundColor: "#e0e0e0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            cursor: "pointer",
            overflow: "hidden",
          }}
          onClick={handleImageClick}
        >
          <img
            src="/myMap.png"
            alt="Campus Map"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {coords.x !== null && coords.y !== null && (
            <div
              style={{
                position: "absolute",
                top: coords.y - 10, // Adjust to center the dot
                left: coords.x - 10, // Adjust to center the dot
                width: "20px",
                height: "20px",
                backgroundColor: "#FF0000",
                borderRadius: "50%",
                border: "2px solid #ffffff",
                boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                pointerEvents: "none", // Ensure the dot doesn't interfere with clicks
              }}
              title={`Pin: (${Math.round(coords.x)}, ${Math.round(coords.y)})`}
            ></div>
          )}
        </Box>

        {/* Upload Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#003069",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#002152",
            },
            width: "100%",
          }}
          disabled={!isReadyToUpload}
          onClick={() => {
            // Handle upload logic here
            console.log("Uploading with URL:", urls.url1, "Coordinates:", coords);
            // You can add your upload functionality here
          }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}