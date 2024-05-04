import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import PostPage from "./pages/PostListPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostAddPage from "./pages/PostAddPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/posts" element={<PostPage />} />
      <Route path="/new" element={<PostAddPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
