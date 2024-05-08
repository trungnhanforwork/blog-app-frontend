import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostAddPage from "./pages/PostAddPage";
import PostPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PostEditPage from "./pages/PostEditPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfileDetailPage />} />
      <Route path="/profile/changepassword" element={<ChangePasswordPage />} />
      <Route path="/new" element={<PostAddPage />} />
      <Route path="/post/:id" element={<PostDetailPage />} />
      <Route path="/posts" element={<PostPage />} />
      <Route path="/post/edit/:id" element={<PostEditPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
