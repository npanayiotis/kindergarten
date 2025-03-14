import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
// Change this import
import KindergartenDetails from "./pages/KindergartenDetails";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AboutUs from "./pages/AboutUs";
import { AuthProvider } from "./context/AuthContext.jsx";
import Search from "./pages/Search.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* Update this Route */}
          <Route path="search" element={<Search />} />
          <Route path="kindergartens/:id" element={<KindergartenDetails />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
