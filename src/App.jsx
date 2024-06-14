import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Watch from "./pages/Watch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedHome from "./components/ProtectedHome";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          {" "}
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<ProtectedHome />} />
          <Route path="/watch" element={<Watch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
