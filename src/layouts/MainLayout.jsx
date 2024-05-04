import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  // console.log(localStorage.getItem("token"));
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
