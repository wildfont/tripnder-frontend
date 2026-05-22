import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button } from '@mui/material'

function LoginPage() {
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        body,
      );

      localStorage.setItem("authToken", response.data.authToken);

      setIsLoggedIn(true);
      setUser(response.data.payload);

      console.log(response.data);

      navigate("/explore");
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
      <h1>Login Form</h1>

      <form onSubmit={handleLogin}>
        <TextField
        type="text"
        variant="outlined"
        size="small"
        label="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
        <br />

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

        <Button type="submit">Login</Button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
