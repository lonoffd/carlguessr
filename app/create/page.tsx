import React from "react";
import { Box, Typography, Button, TextField} from "@mui/material";

export default function CreatePage() {
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
      }}
    >
   
    {/* Exit Button */}
    <div
      style={{
        position: 'absolute',
        top: '80px',
        left: '80px',
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
      Create your challenge for Carls by uploading a photo and drop a pin to indicate where you took it.
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
        {/* Image Upload */}
        <TextField
          type="file"
          variant="outlined"
          fullWidth
          sx={{
            '& input[type="file"]': {
              padding: 1,
            },
          }}
        />

        {/* Campus Map Sections */}
        <Box
          sx={{
            width: "100%",
            height: "320px",
            backgroundColor: "#e0e0e0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px #003069",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#003069" }}
          >
            campus map
          </Typography>
        </Box>

        {/* Upload Button */}
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "#003069",
            color: "#ffffff",
            '&:hover': {
              backgroundColor: "#002152",
            },
            width: "100%",
          }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}
