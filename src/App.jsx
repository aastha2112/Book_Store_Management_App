import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Books from "./components/Books";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BooksDetails from "./components/BooksDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/bookDetails/:id" element={<BooksDetails />} />
      </Routes>
    </>
  );
}

export default App;
