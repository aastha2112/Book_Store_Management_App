import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  let token = localStorage.getItem("token");
  console.log(token);
  return (
    <div className="navbar">
      <h2>Book Store Management</h2>
      <div className="navLinks">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/books"}>Books</NavLink>
        {token == null ? (
          <NavLink to={"/login"}>Login</NavLink>
        ) : (
          <button
            className="logoutBtn"
            onClick={() => localStorage.removeItem("token")}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
