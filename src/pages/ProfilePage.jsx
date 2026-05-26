import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user, setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <h1>
        {user?.firstName} {user?.lastName}
      </h1>
      <p>{user?.email}</p>
      <p>{user?.bio}</p>
      <p>Travel style: {user?.travelStyle}</p>
      <p>Budget: {user?.budget}</p>
      <Button onClick={() => navigate("/editprofile")}>Edit profile</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default ProfilePage;
