import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Box, Typography, Avatar, Chip, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function ProfilePage() {
  const { user, setIsLoggedIn, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error));
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <Box sx={{ padding: "16px", maxWidth: "500px", margin: "0 auto" }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          py: 4,
          mb: 3,
          background: "var(--surface)",
          borderRadius: "20px",
          border: "1px solid var(--border)",
        }}
      >
        <Avatar
          src={profile?.avatar}
          sx={{ width: 100, height: 100, bgcolor: "#E8175D", fontSize: "2rem" }}
        >
          {profile?.firstName?.[0]}
          {profile?.lastName?.[0]}
        </Avatar>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold">
            {profile?.firstName} {profile?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
            {profile?.email}
          </Typography>
        </Box>
        {profile?.bio && (
          <Typography
            variant="body2"
            sx={{ color: "var(--text-secondary)", textAlign: "center", px: 3 }}
          >
            {profile.bio}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {profile?.travelStyle && (
            <Chip
              label={profile.travelStyle}
              size="small"
              icon={<FlightTakeoffIcon sx={{ fontSize: 14 }} />}
              sx={{ background: "rgba(232,23,93,0.15)", color: "#E8175D" }}
            />
          )}
          {profile?.budget && (
            <Chip
              label={profile.budget}
              size="small"
              icon={<AttachMoneyIcon sx={{ fontSize: 14 }} />}
              sx={{
                background: "rgba(255,255,255,0.1)",
                color: "var(--text-secondary)",
              }}
            />
          )}
          {profile?.languages?.map((lang) => (
            <Chip
              key={lang}
              label={lang}
              size="small"
              sx={{
                background: "rgba(255,255,255,0.05)",
                color: "var(--text-secondary)",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ACTIONS */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<EditIcon />}
          onClick={() => navigate("/editprofile")}
          sx={{ borderRadius: "50px", padding: "14px" }}
        >
          Edit profile
        </Button>
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: "50px",
            padding: "14px",
            borderColor: "#ff4458",
            color: "#ff4458",
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default ProfilePage;
