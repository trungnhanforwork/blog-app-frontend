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
import SearchResultsPage from "../pages/SearchResultsPage";
import PrivateRoute from "./PrivateRoute";

// const routes = [
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { path: "", element: <HomePage /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/signup", element: <SignUpPage /> },
//       { path: "/post/:id", element: <PostDetailPage /> },
//       { path: "/post/list", element: <PostPage /> },
//       { path: "*", element: <NotFoundPage /> },
//       {
//         path: "",
//         element: <PrivateRoute />,
//         children: [
//           { path: "/post/add", element: <PostAddPage /> },
//           { path: "/post/edit/:id", element: <PostEditPage /> },
//           { path: "/profile/changepassword", element: <ChangePasswordPage /> },
//           { path: "/profile", element: <ProfileDetailPage /> },
//         ],
//       },
//     ],
//   },
// ];

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {routes.map((route, index) => (
//         <Route key={index} path={route.path} element={route.element}>
//           {route.children &&
//             route.children.map((childRoute, childIndex) => (
//               <Route
//                 key={childIndex}
//                 path={childRoute.path}
//                 element={childRoute.element}
//               />
//             ))}
//         </Route>
//       ))}
//     </Routes>
//   );
// };

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/post/search" element={<SearchResultsPage />} />
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
