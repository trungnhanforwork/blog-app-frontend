import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  // console.log(localStorage.getItem("token"));
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
