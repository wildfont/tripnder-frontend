import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function IsAnon(props) {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? props.children : <Navigate to="/explore" />;
}

export default IsAnon;
