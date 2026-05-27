import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AuthContext } from "../context/AuthContext";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const countryFlags = {
  "Spain": "🇪🇸",
  "Japan": "🇯🇵",
  "Italy": "🇮🇹",
  "France": "🇫🇷",
  "Germany": "🇩🇪",
  "USA": "🇺🇸",
  "UK": "🇬🇧",
  "Portugal": "🇵🇹",
  "Mexico": "🇲🇽",
  "Argentina": "🇦🇷",
  "Brazil": "🇧🇷",
  "Australia": "🇦🇺",
  "Canada": "🇨🇦",
  "Thailand": "🇹🇭",
  "China": "🇨🇳",
  "India": "🇮🇳",
  "Morocco": "🇲🇦",
  "Greece": "🇬🇷",
  "Netherlands": "🇳🇱",
  "Sweden": "🇸🇪",
  "Norway": "🇳🇴",
  "Denmark": "🇩🇰",
  "Switzerland": "🇨🇭",
  "Austria": "🇦🇹",
  "Belgium": "🇧🇪",
  "Poland": "🇵🇱",
  "Czech Republic": "🇨🇿",
  "Hungary": "🇭🇺",
  "Romania": "🇷🇴",
  "Turkey": "🇹🇷",
  "Egypt": "🇪🇬",
  "South Africa": "🇿🇦",
  "Kenya": "🇰🇪",
  "Colombia": "🇨🇴",
  "Peru": "🇵🇪",
  "Chile": "🇨🇱",
  "South Korea": "🇰🇷",
  "Vietnam": "🇻🇳",
  "Indonesia": "🇮🇩",
  "Philippines": "🇵🇭",
  "New Zealand": "🇳🇿",
  "Ireland": "🇮🇪",
  "Croatia": "🇭🇷",
  "Iceland": "🇮🇸",
};

function DestinationsPage() {
  const { darkMode } = useContext(AuthContext);
  const [destinations, setDestinations] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState("");
  const [dateFrom, setDateFrom] = useState(dayjs());
  const [dateTo, setDateTo] = useState(dayjs());
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("authToken");

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

  const datePickerSx = {
    "& .MuiInputLabel-root": { color: "var(--text-secondary)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#E8175D" },
    width: "100%",
    "& .MuiOutlinedInput-root": {
      color: "var(--text)",
      backgroundColor: inputBg,
      "& fieldset": { borderColor: "var(--border)" },
      "&:hover fieldset": { borderColor: "#E8175D" },
      "&.Mui-focused fieldset": { borderColor: "#E8175D" },
    },
    "& .MuiSvgIcon-root": { color: "var(--text-secondary)" },
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/destinations`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setDestinations(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/destinations/${editingId}`,
          { city, country, flag, dateFrom, dateTo },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setDestinations(
          destinations.map((d) => (d._id === editingId ? response.data : d)),
        );
        setEditingId(null);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/destinations`,
          { city, country, flag, dateFrom, dateTo },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setDestinations([...destinations, response.data]);
      }
      setCity("");
      setCountry("");
      setFlag("");
      setDateFrom(dayjs());
      setDateTo(dayjs());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/destinations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDestinations(destinations.filter((d) => d._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (destination) => {
    setEditingId(destination._id);
    setCity(destination.city);
    setCountry(destination.country);
    setFlag(destination.flag);
    setDateFrom(dayjs(destination.dateFrom));
    setDateTo(dayjs(destination.dateTo));
  };

  return (
    <Box sx={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        My Destinations
      </Typography>

      {destinations.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <FlightTakeoffIcon
            sx={{ fontSize: 48, color: "var(--text-secondary)" }}
          />
          <Typography
            variant="body1"
            sx={{ color: "var(--text-secondary)", mt: 1 }}
          >
            No destinations yet. Add your first trip!
          </Typography>
        </Box>
      ) : (
        destinations.map((destination) => (
          <Card
            key={destination._id}
            sx={{
              mb: 2,
              background: "var(--surface)",
              borderRadius: "16px",
              border: "1px solid var(--border)",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6">
                  {destination.flag} {destination.city}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  {destination.country}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  {dayjs(destination.dateFrom).format("DD/MM/YYYY")} →{" "}
                  {dayjs(destination.dateTo).format("DD/MM/YYYY")}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  onClick={() => handleEdit(destination)}
                  size="small"
                  sx={{ minWidth: 0, color: "var(--text-secondary)" }}
                >
                  <EditIcon fontSize="small" />
                </Button>
                <Button
                  onClick={() => handleDelete(destination._id)}
                  size="small"
                  sx={{ minWidth: 0, color: "#ff4458" }}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}

      <Box
        sx={{
          mt: 3,
          p: 3,
          background: "var(--surface)",
          borderRadius: "16px",
          border: "1px solid var(--border)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          {editingId ? "Edit destination" : "Add destination"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={textFieldSx}
            />
            <TextField
              fullWidth
              label="Country"
              value={country}
              onChange={(e) => {
                const val = e.target.value;
                setCountry(val);
                if (countryFlags[val]) setFlag(countryFlags[val]);
              }}
              sx={textFieldSx}
            />
          </Box>
          <TextField
            fullWidth
            label="Flag emoji 🏳️"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            sx={textFieldSx}
          />
          <DatePicker
            label="Date from"
            value={dateFrom}
            onChange={(v) => setDateFrom(v)}
            format="DD/MM/YYYY"
            sx={datePickerSx}
          />
          <DatePicker
            label="Date to"
            value={dateTo}
            onChange={(v) => setDateTo(v)}
            format="DD/MM/YYYY"
            sx={datePickerSx}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ borderRadius: "50px", padding: "14px" }}
          >
            {editingId ? "Update destination" : "Add destination"}
          </Button>
          {editingId && (
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setEditingId(null);
                setCity("");
                setCountry("");
                setFlag("");
                setDateFrom(dayjs());
                setDateTo(dayjs());
              }}
              sx={{ borderRadius: "50px" }}
            >
              Cancel
            </Button>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default DestinationsPage;
