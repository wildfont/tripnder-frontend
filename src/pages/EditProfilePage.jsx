import axios from "axios";
import { useContext, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [travelStyle, setTravelStyle] = useState(user?.travelStyle || "");
  const [budget, setBudget] = useState(user?.budget || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
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

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          multiline
          rows={3}
        />
        <FormControl>
          <InputLabel>Travel style</InputLabel>
          <Select
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            label="Travel style"
          >
            <MenuItem value="Backpacker">Backpacker</MenuItem>
            <MenuItem value="Comfort">Comfort</MenuItem>
            <MenuItem value="Luxury">Luxury</MenuItem>
            <MenuItem value="Adventure">Adventure</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Budget</InputLabel>
          <Select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            label="Budget"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit">Save changes</Button>
        <Button onClick={() => navigate("/profile")}>Cancel</Button>
      </form>
    </div>
  );
}

export default EditProfilePage;
