import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import MapIcon from "@mui/icons-material/Map";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

function BottomNav() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{ backgroundColor: "#1a1a1a" }}
      >
        <BottomNavigationAction icon={<ExploreIcon />} onClick={() => navigate("/explore")} sx={{ color: "white" }} />
        <BottomNavigationAction icon={<MapIcon />} onClick={() => navigate("/destinations")} sx={{ color: "white" }} />
        <BottomNavigationAction icon={<PeopleIcon />} onClick={() => navigate("/connections")} sx={{ color: "white" }} />
        <BottomNavigationAction icon={<PersonIcon />} onClick={() => navigate("/profile")} sx={{ color: "white" }} />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;