import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function IsPrivate(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return isLoggedIn ? props.children : <Navigate to="/login" />;
}

export default IsPrivate;
