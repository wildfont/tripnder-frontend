import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function LoadingScreen({ logo }) {
  const loadingMessages = [
    "Finding your travel companions...",
    "Checking available trips...",
    "Matching travel vibes...",
    "Packing your backpack...",
    "Almost ready...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 3,
        background: "linear-gradient(180deg, #0f0f0f 0%, #161616 100%)",
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={logo}
        alt="loading"
        sx={{
          width: 90,
          animation: "pulse 2s infinite ease-in-out",
          filter: "drop-shadow(0 0 12px rgba(255,255,255,0.15))",

          "@keyframes pulse": {
            "0%": {
              transform: "scale(1)",
              opacity: 0.85,
            },
            "50%": {
              transform: "scale(1.08)",
              opacity: 1,
            },
            "100%": {
              transform: "scale(1)",
              opacity: 0.85,
            },
          },
        }}
      />

      {/* Loading text */}
      <Typography
        variant="body2"
        sx={{
          color: "var(--text-secondary)",
          letterSpacing: 1,
          opacity: 0.8,
        }}
      >
        {loadingMessages[messageIndex]}
      </Typography>

      {/* Progress bar */}
      <Box
        sx={{
          width: 260,
          height: 6,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, #ffffff 0%, #bdbdbd 100%)",
            transformOrigin: "left",
            animation: "loadingBar 60s linear forwards",

            "@keyframes loadingBar": {
              from: {
                transform: "scaleX(0)",
              },
              to: {
                transform: "scaleX(1)",
              },
            },
          }}
        />
      </Box>

      {/* Small caption */}
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255,255,255,0.45)",
          letterSpacing: 1,
        }}
      >
        Loading experience...
      </Typography>
    </Box>
  );
}

export default LoadingScreen;
