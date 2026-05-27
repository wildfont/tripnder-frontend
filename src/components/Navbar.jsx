import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setUser, darkMode, setDarkMode } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "light" : "dark",
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(135deg, #000000 0%, #E8175D 100%)" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            style={{ height: "40px", width: "auto" }}
            alt="logo"
          />
        </Typography>

        {isLoggedIn ? (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
            <Button color="inherit" onClick={toggleTheme}>
              {darkMode ? "☀️" : "🌙"}
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
            <Button color="inherit" onClick={toggleTheme}>
              {darkMode ? "☀️" : "🌙"}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
