"use client";
import { useState } from "react";
import Image from "next/image";

function CoordinateDisplay({ x, y, distance }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        left: "0px",
        color: "#ff5733",
        fontSize: "12px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <p>
        You clicked at: <strong>({x}, {y})</strong>
      </p>
      <p>
        Distance to target: <strong>{distance.toFixed(2)} pixels</strong>
      </p>
    </div>
  );
}

function ClickTracker() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [distance, setDistance] = useState(0);
  const [targetCoords] = useState({ x: 300, y: 300 }); // Adjust target for larger square
  const [clicks, setClicks] = useState([]); // Store all clicked coordinates
  const [attempts, setAttempts] = useState(0); // Track number of attempts
  const [confirmed, setConfirmed] = useState(false); // Track if the click is confirmed
  const [gameOver, setGameOver] = useState(false); // Track if the game is over

  const handleClick = (event) => {
    if (attempts >= 3) return; // Don't allow clicks after 3 attempts
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    setCoords({ x, y });

    // Temporarily replace the last click with the current point
    setClicks((prevClicks) => {
      const updatedClicks = [...prevClicks];
      updatedClicks[attempts] = { x, y };
      return updatedClicks;
    });
    setConfirmed(false);
  };

  const handleConfirmClick = () => {
    if (attempts < 3) {
      setConfirmed(true); // Confirm the click only if attempts are under 3

      const calculatedDistance = Math.sqrt(
        Math.pow(coords.x - targetCoords.x, 2) + Math.pow(coords.y - targetCoords.y, 2)
      );
      setDistance(calculatedDistance);

      // Lock in the current point as confirmed
      setClicks((prevClicks) => {
        const updatedClicks = [...prevClicks];
        updatedClicks[attempts] = coords;
        return updatedClicks;
      });

      setAttempts((prevAttempts) => prevAttempts + 1);
      if (attempts + 1 === 3) setGameOver(true);
    }
  };

  const resetGame = () => {
    setCoords({ x: 0, y: 0 });
    setAttempts(0);
    setClicks([]);
    setConfirmed(false);
    setGameOver(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        onClick={handleClick}
        style={{
          width: "600px",
          height: "600px",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          border: "2px solid #333",
        }}
      >
        <Image
          src="/map.png" // Path relative to the public folder
          alt="Map"
          width={600}
          height={600}
          style={{
            display: "block",
          }}
        />
        {/* Render all clicks as inverted and smaller triangles */}
        {clicks.map((click, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${click.x - 5}px`, // Adjusted for smaller size
              top: `${click.y - 5}px`, // Adjusted for smaller size
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent", // Smaller size
              borderRight: "5px solid transparent", // Smaller size
              borderTop: "10px solid #ff5733", // Inverted triangle
            }}
          />
        ))}
        {/* Only show CoordinateDisplay after confirming the click */}
        {confirmed && <CoordinateDisplay x={coords.x} y={coords.y} distance={distance} />}
      </div>
      <div style={{ marginTop: "20px" }}>
        {/* Confirm button */}
        <button
          onClick={handleConfirmClick}
          disabled={gameOver || confirmed || attempts >= 3}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#52c41a",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {attempts < 3 ? "Confirm Click" : "Game Over"}
        </button>
        {gameOver && (
          <p style={{ color: "red", marginTop: "20px" }}>Game Over! You've used all your attempts.</p>
        )}
      </div>

      {gameOver && (
        <button
          onClick={resetGame}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f56a00",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Restart Game
        </button>
      )}
    </div>
  );
}

export default ClickTracker;