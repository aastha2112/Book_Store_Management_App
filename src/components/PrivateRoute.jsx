import React from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  return (
    <>
      {token == null ? (
        navigate("/login")
      ) : (
        <PrivateRoute>{children}</PrivateRoute>
      )}
    </>
  );
}
