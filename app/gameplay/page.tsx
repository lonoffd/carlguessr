"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ClickTracker from "./click-tracker";

type ChallengeData = {
  x: number;
  y: number;
  imageUrl: string;
};

export default function GamePage() {
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [clicks, setClicks] = useState<{ x: number; y: number }[]>([]);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [targetCoords, setTargetCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Hardcoded round data
  const hardcodedChallenges: { [key: number]: ChallengeData } = {
    1: {
      x: 120,
      y: 180,
      imageUrl: "willis.png",
    },
    2: {
      x: 280,
      y: 245,
      imageUrl: "James.png",
    },
    3: {
      x: 143,
      y: 150,
      imageUrl: "Sayles.png",
    },
  };

  // Set round data based on current round
  useEffect(() => {
    const roundData = hardcodedChallenges[currentRound];
    if (roundData) {
      setTargetCoords({ x: roundData.x, y: roundData.y });
      setImageUrl(roundData.imageUrl);
    }
  }, [currentRound]);

  // Calculate distance between two points
  const calculateDistance = (
    clickCoords: { x: number; y: number },
    targetCoords: { x: number; y: number }
  ): number => {
    const dx = clickCoords.x - targetCoords.x;
    const dy = clickCoords.y - targetCoords.y;
    return Math.sqrt(dx * dx + dy * dy); // Pythagorean theorem
  };

  // Calculate score based on distance
  const calculateScore = (distance: number): number => {
    const maxScore = 1000;
    const minScore = 100;
    const maxDistance = 400; // Maximum possible distance in a 400x400 square
    return Math.max(
      minScore,
      maxScore - Math.floor((distance / maxDistance) * maxScore)
    );
  };

  // Handle map clicks (prevent clicks after confirmation)
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (confirmed) return; // Prevent click handling if confirmed

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    setCoords({ x, y });

    // Temporarily store clicks
    setClicks((prevClicks) => {
      const updatedClicks = [...prevClicks];
      updatedClicks[attempts] = { x, y };
      return updatedClicks;
    });
  };

  // Confirm user's click
  const handleConfirmClick = () => {
    if (attempts < 3) {
      setConfirmed(true);
      const distance = calculateDistance(coords, targetCoords);
      const newScore = calculateScore(distance);
      setScore((prevScore) => prevScore + newScore);
      setAttempts((prevAttempts) => prevAttempts + 1);
    }
  };

  // Handle next round button click
  const handleNextRound = () => {
    if (attempts < 3) {
      setCurrentRound((prevRound) => prevRound + 1);
      setConfirmed(false); // Reset confirmed state for the next round
    }
  };

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
        fontWeight="bold"
        marginBottom={2}
        color="#003069"
      >
        {attempts < 3 ? `Round ${currentRound}/3` : `Your score is: ${score}`}
      </Typography>

      {/* Brief Rule */}
      <Typography variant="body1" color="textSecondary" marginBottom={4}>
        Guess the location of the photo by placing a pin on the campus map
      </Typography>

      {/* Main Content */}
      <Box
        sx={{
          width: "90%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {/* Game Image Section */}
        <Paper
          elevation={3}
          sx={{
            flex: 2,
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e0e0e0",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Game Target"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          ) : (
            <Typography color="textSecondary">Loading Image...</Typography>
          )}
        </Paper>

        {/* Campus Map Section */}
        <Box
          sx={{
            flex: 1,
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
              position: "relative",
              backgroundColor: "#e0e0e0",
            }}
          >
            <ClickTracker
              coords={coords}
              onClick={handleMapClick}
              clicks={clicks}
              confirmed={confirmed}
              targetCoords={targetCoords} // Updated to use current round's target
            />
          </Paper>

          {/* Confirm Button */}
          {attempts < 3 && !confirmed && (
            <Button
              variant="contained"
              sx={{
                width: "100px",
                backgroundColor: "#003069",
                color: "white",
                marginTop: 3,
              }}
              onClick={handleConfirmClick}
            >
              Confirm
            </Button>
          )}

          {/* Next Round Button */}
          {confirmed && attempts < 3 && (
            <Button
              variant="contained"
              sx={{
                width: "100px",
                backgroundColor: "#003069",
                color: "white",
                marginTop: 3,
              }}
              onClick={handleNextRound}
            >
              Next Round
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
