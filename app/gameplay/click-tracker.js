"use client";
import {useRef, useEffect } from "react";
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

function ClickTracker({ coords, onClick, clicks, confirmed, targetCoords }) {
  const canvasRef = useRef(null);
  
  // Draw a line to connect current click to target after confirmation
  const drawLine = (ctx, startX, startY, endX, endY) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY); // Starting point
    ctx.lineTo(endX, endY); // Ending point (target coordinate)
    ctx.strokeStyle = "#FF0000"; // Red color
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    if (confirmed && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous lines

      // Draw the line from the latest click to the target coordinate
      drawLine(
        ctx,
        coords.x,
        coords.y,
        targetCoords.x,
        targetCoords.y
      );
    }
  }, [confirmed, coords, targetCoords]);

  return (
    <div
      style={{
        width: "400px", // Updated to match Game Image dimensions
        height: "400px", // Updated to match Game Image dimensions
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        border: "2px solid #333",
      }}
      onClick={onClick}
    >
      <Image
        src="/myMap.png" // Path relative to the public folder
        alt="Map"
        width={400} // Updated dimensions
        height={400} // Updated dimensions
        style={{
          display: "block",
          objectFit: "contain",
        }}
      />
      
      {/* Canvas to draw lines */}
      <canvas
        ref={canvasRef}
        width={400} // Same size as the image
        height={400} // Same size as the image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none", // Ensure the canvas doesn't block user clicks
        }}
      />
      
      {/* Render Target Coordinate Marker (only if confirmed) */}
      {confirmed && (
        <div
          style={{
            position: "absolute",
            left: `${targetCoords.x - 5}px`, // Adjust for center alignment
            top: `${targetCoords.y - 5}px`, // Adjust for center alignment
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "10px solid green", // Green triangle for the target
          }}
        />
      )}

      {/* Render All User Clicks */}
      {clicks.map((click, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${click.x - 5}px`, // Adjusted for triangle center
            top: `${click.y - 5}px`, // Adjusted for triangle center
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "10px solid #ff5733", // Red triangle for user clicks
          }}
        />
      ))}

      {/* Only Show Coordinate Display if Confirmed */}
      {confirmed && (
        <CoordinateDisplay
          x={coords.x}
          y={coords.y}
          distance={Math.sqrt(
            Math.pow(coords.x - targetCoords.x, 2) +
              Math.pow(coords.y - targetCoords.y, 2)
          )}
        />
      )}
    </div>
  );
}

export default ClickTracker;
