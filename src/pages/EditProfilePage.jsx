import axios from "axios";
import { useContext, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
  const { user, setUser, darkMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [budget, setBudget] = useState("");

  const inputBg = darkMode ? "#2d2d2d" : "#f0f0f0";

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const p = response.data;
        setFirstName(p.firstName || "");
        setLastName(p.lastName || "");
        setBio(p.bio || "");
        setTravelStyle(p.travelStyle || "");
        setBudget(p.budget || "");
      })
      .catch((error) => console.log(error));
  }, [user]);

  const textFieldSx = {
    "& .MuiInputLabel-root": { color: "var(--text-secondary)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#E8175D" },
    "& .MuiOutlinedInput-root": {
      color: "var(--text)",
      backgroundColor: inputBg,
      "& fieldset": { borderColor: "var(--border)" },
      "&:hover fieldset": { borderColor: "#E8175D" },
      "&.Mui-focused fieldset": { borderColor: "#E8175D" },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        { firstName, lastName, bio, travelStyle, budget },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUser({ ...user, firstName, lastName, bio, travelStyle, budget });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return null;

  return (
    <Box sx={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Edit Profile
      </Typography>

      <Box
        sx={{
          p: 3,
          background: "var(--surface)",
          borderRadius: "20px",
          border: "1px solid var(--border)",
        }}
      >
        <form
          onSubmit={handleSubmit}
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
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            multiline
            rows={3}
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
              slotProps={{
                paper: {
                  sx: { backgroundColor: inputBg, color: "var(--text)" },
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
              slotProps={{
                paper: {
                  sx: { backgroundColor: inputBg, color: "var(--text)" },
                },
              }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ borderRadius: "50px", padding: "14px" }}
          >
            Save changes
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => navigate("/profile")}
            sx={{ borderRadius: "50px", padding: "14px" }}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default EditProfilePage;
