import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const steps = [
  {
    icon: <ExploreIcon sx={{ fontSize: 32, color: "#E8175D" }} />,
    title: "Create your profile",
    desc: "Tell us your travel style, favorite destinations and languages. Your photo and bio are your presentation.",
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 32, color: "#E8175D" }} />,
    title: "Match with travelers",
    desc: "Swipe through compatible traveler profiles or explore trips by destination and dates.",
  },
  {
    icon: <FlightTakeoffIcon sx={{ fontSize: 32, color: "#E8175D" }} />,
    title: "Travel together",
    desc: "Once you connect, plan the adventure and create memories with like-minded people.",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const { darkMode } = useContext(AuthContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 24px",
        gap: 4,
      }}
    >
      {/* HERO */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "90vh",
          justifyContent: "center",
          gap: 3,
          textAlign: "center",
          backgroundImage: `linear-gradient(${darkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.5)"}, ${darkMode ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.5)"}), url('https://images.unsplash.com/photo-1534777367038-9404f45b869a?q=80&w=1740&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          borderRadius: "16px",
          padding: "40px 24px",
          width: "100%",
          margin: "0 -24px",
        }}
      >
        <img src={logo} style={{ width: "100px" }} alt="Tripnder logo" />
        <Typography variant="h4" fontWeight="bold">
          Find your perfect travel companion
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
            maxWidth: "320px",
          }}
        >
          Match with solo travelers going your way. No dating vibes — just great
          adventures.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => navigate("/signup")}
          sx={{ maxWidth: "320px", borderRadius: "50px", padding: "14px" }}
        >
          Start exploring →
        </Button>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={() => navigate("/login")}
          sx={{
            maxWidth: "320px",
            borderRadius: "50px",
            padding: "14px",
            borderColor: "white",
            color: "white",
          }}
        >
          Login
        </Button>
        <Typography
          variant="caption"
          sx={{ color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0,0,0,0.5)" }}
        >
          Free to join · No credit card needed
        </Typography>
      </Box>

      {/* HOW IT WORKS */}
      <Box sx={{ width: "100%", maxWidth: "400px", pb: 4 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 3, textAlign: "center" }}
        >
          How it works
        </Typography>
        {steps.map((step, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
              mb: 3,
              background: "var(--surface)",
              borderRadius: "16px",
              padding: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(232,23,93,0.1)",
                flexShrink: 0,
              }}
            >
              {step.icon}
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--text-secondary)" }}
              >
                {step.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* CTA FINAL */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          pb: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Ready to stop traveling alone?
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
          Join thousands of travelers who have already found their perfect
          adventure companion.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => navigate("/signup")}
          sx={{ maxWidth: "320px", borderRadius: "50px", padding: "14px" }}
        >
          Create my free profile →
        </Button>
      </Box>
    </Box>
  );
}

export default LandingPage;
