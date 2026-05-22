import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function LandingPage() {
  const navigate = useNavigate()
  return (
    <div>
      <img src={logo} style={{width:"100px"}} alt="Tripnder logo" />
      <Typography>
        <h1>Find your perfect travel companion</h1>
        <h3>
          "Match with solo travelers going your way. No dating vibes <br />— just
          great adventures."
        </h3>
      </Typography>
      <Button onClick={() => navigate("/signup")}>Start exploring</Button>
      <Button onClick={() => navigate("/login")}>Login</Button>
    </div>
  );
}
export default LandingPage;
