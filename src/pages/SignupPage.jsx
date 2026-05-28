import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Signup() {
  const { darkMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [budget, setBudget] = useState("");
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

  const selectSx = {
    color: "var(--text)",
    backgroundColor: inputBg,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E8175D" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E8175D",
    },
    "& .MuiSvgIcon-root": { color: "var(--text-secondary)" },
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
        travelStyle,
        budget,
      });
      navigate("/login");
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
        padding: "24px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mb: 1,
          }}
        >
          <img src={logo} style={{ width: "60px" }} alt="logo" />
          <Typography variant="h5" fontWeight="bold">
            Create account
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
            Join thousands of travelers worldwide
          </Typography>
        </Box>

        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={textFieldSx}
            />
            <TextField
              fullWidth
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={textFieldSx}
            />
          </Box>

          <TextField
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={textFieldSx}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={textFieldSx}
          />

          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "var(--text-secondary)",
                "&.Mui-focused": { color: "#E8175D" },
              }}
            >
              Travel style
            </InputLabel>
            <Select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              label="Travel style"
              sx={selectSx}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: { backgroundColor: inputBg, color: "var(--text)" },
                  },
                },
              }}
            >
              <MenuItem value="Backpacker">Backpacker</MenuItem>
              <MenuItem value="Comfort">Comfort</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
              <MenuItem value="Adventure">Adventure</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "var(--text-secondary)",
                "&.Mui-focused": { color: "#E8175D" },
              }}
            >
              Budget
            </InputLabel>
            <Select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              label="Budget"
              sx={selectSx}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: { backgroundColor: inputBg, color: "var(--text)" },
                  },
                },
              }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

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
            Create account
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "var(--text-secondary)" }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#E8175D", cursor: "pointer", fontWeight: 500 }}
          >
            Log in
          </span>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup;
