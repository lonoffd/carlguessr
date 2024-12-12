"use client";
import { useState } from "react";

// Component to display the click coordinates
function CoordinateDisplay({ x, y }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "-35px",
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
    </div>
  );
}

// Main component to handle click events
function ClickTracker() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [targetCoords] = useState({ x: 150, y: 150 }); // Predetermined point (center of the square)

    
  const handleClick = (event) => {
    // Only calculate the coordinates within the square area
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);
    setCoords({ x, y });
    console.log(`Click coordinates: (${x}, ${y})`); // Log to console

    // Calculate distance to the target point
    const distance = Math.sqrt(
        Math.pow(x - targetCoords.x, 2) + Math.pow(y - targetCoords.y, 2)
    );

    console.log(`Distance to target: ${distance.toFixed(2)} pixels`);
  };

  return (
    <div
      style={{
        display: "flex",              // Centers the square on the screen
        justifyContent: "center",     // Centers horizontally
        alignItems: "center",         // Centers vertically
        height: "100vh",              // Full viewport height to center the square
        backgroundColor: "#f0f0f0",   // Light gray background
      }}
    >
      <div
        onClick={handleClick}         // Attach the onClick event to the square
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "#d9f7be",
          border: "2px solid #52c41a",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <CoordinateDisplay x={coords.x} y={coords.y} />
      </div>
    </div>
  );
}

export default ClickTracker;