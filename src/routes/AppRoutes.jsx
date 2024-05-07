import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import PostAddPage from "../pages/PostAddPage";
import PostListPage from "../pages/PostListPage";
import PostDetailPage from "../pages/PostDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfileDetailPage from "../pages/ProfileDetailPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfileDetailPage />} />
        <Route path="/profile/changepassword" element={<ChangePasswordPage />} />
        <Route path="/new" element={<PostAddPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
