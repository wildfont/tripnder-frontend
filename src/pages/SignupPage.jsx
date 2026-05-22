import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [budget, setBudget] = useState("");
  

  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleTravelStyleChange = (e) => setTravelStyle(e.target.value);
  const handleBudgetChange = (e) => setBudget(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      travelStyle: travelStyle,
      budget: budget,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        body,
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
      }
    }
  };

  return (
    <div>
      <h1>Signup Form</h1>

      <form onSubmit={handleSignup}>
        <TextField
          type="text"
          variant="outlined"
          size="small"
          label="firstName"
          name="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />

        <TextField
          type="text"
          variant="outlined"
          size="small"
          label="lastName"
          name="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
        <br />

        <TextField
          type="text"
          variant="outlined"
          size="small"
          label="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <TextField
          type="password"
          variant="outlined"
          size="small"
          label="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

<br />

        <TextField
          type="text"
          variant="outlined"
          size="small"
          label="travelStyle"
          name="travelStyle"
          value={travelStyle}
          onChange={handleTravelStyleChange}
        />

        <TextField
          type="text"
          variant="outlined"
          size="small"
          label="budget"
          name="budget"
          value={budget}
          onChange={handleBudgetChange}
        />

        <br />

        <Button type="submit">Signup</Button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Signup;
