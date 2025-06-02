import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Details from "../pages/Details";

const Layout = () => {
  return <Outlet />;
};

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/detail/:id", element: <Details /> },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
