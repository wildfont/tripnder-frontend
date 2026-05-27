import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

function LoginPage() {
  const { setIsLoggedIn, setUser, darkMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const inputBg = darkMode ? "#2d2d2d" : "#f0f0f0";

  const textFieldSx = {
    "& .MuiInputLabel-root": { color: "var(--text-secondary)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#E8175D" },
    "& .MuiOutlinedInput-root": {
      color: "var(--text)",
      backgroundColor: inputBg,
      "& fieldset": { borderColor: "var(--border)" },
      "&:hover fieldset": { borderColor: "#E8175D" },
      "&.Mui-focused fieldset": { borderColor: "#E8175D" },
      "& input:-webkit-autofill": {
        WebkitBoxShadow: `0 0 0 100px ${inputBg} inset`,
        WebkitTextFillColor: "var(--text)",
      },
    },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
      );
      localStorage.setItem("authToken", response.data.authToken);
      setIsLoggedIn(true);
      setUser(response.data.payload);
      navigate("/explore");
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        padding: "0 24px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <img src={logo} style={{ width: "60px" }} alt="logo" />
          <Typography variant="h5" fontWeight="bold">
            Welcome back
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
            Log in to find your travel companion
          </Typography>
        </Box>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            sx={textFieldSx}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            sx={textFieldSx}
          />

          {errorMessage && (
            <Typography variant="body2" sx={{ color: "#E8175D" }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ borderRadius: "50px", padding: "14px", mt: 1 }}
          >
            Login
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "var(--text-secondary)" }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#E8175D", cursor: "pointer", fontWeight: 500 }}
          >
            Sign up
          </span>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;
