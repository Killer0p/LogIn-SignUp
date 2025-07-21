import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import OtpVerification from "./components/Auth/OtpVerification";
import ResetPassword from "./components/Auth/ResetPassword";
import Landing from "./components/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
