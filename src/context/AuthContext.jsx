import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const passedContext = {
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    user,
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIsLoggedIn(true);
        setUser(response.data.payload);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
