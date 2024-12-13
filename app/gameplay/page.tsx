import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

export default function GamePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" marginBottom={2} color="#003069">
        Round 1/3
      </Typography>

      {/* Brief Rule */}
      <Typography variant="body1" color="textSecondary" marginBottom={4}>
        Guess the location of the photo by placing a pin on the campus map
      </Typography>

      {/* Main Content */}
      <Box
        sx={{
          width: "90%", // Use 90% of the screen width
          maxWidth: "1200px", // Cap width for larger screens
          display: "flex",
          justifyContent: "space-between", // Distribute space between items
          gap: 4, // Space between the image and map
        }}
      >
        {/* Game Image Section */}
        <Paper
          elevation={3}
          sx={{
            flex: 2, // Two-thirds of the available width
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e0e0e0",
          }}
        >
          <Typography color="textSecondary">Game Image</Typography>
        </Paper>

        {/* Campus Map Section */}
        <Box
          sx={{
            flex: 1, // One-third of the available width
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: 400,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e0e0e0",
            }}
          >
            <Typography color="textSecondary">Campus Map</Typography>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
