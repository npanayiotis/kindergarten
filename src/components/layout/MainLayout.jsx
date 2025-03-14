import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import React from "react";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
