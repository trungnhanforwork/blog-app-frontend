import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import PostDetailPage from "../pages/PostDetailPage";
import PostPage from "../pages/PostListPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfileDetailPage from "../pages/ProfileDetailPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import PostAddPage from "../pages/PostAddPage";
import PostEditPage from "../pages/PostEditPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/list" element={<PostPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/post/add" element={<PostAddPage />} />
          <Route
            exact
            path="/profile/changepassword"
            element={<ChangePasswordPage />}
          />
          <Route exact path="/profile" element={<ProfileDetailPage />} />
          <Route exact path="/post/edit/:id" element={<PostEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
