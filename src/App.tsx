import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routeConfigs } from "./configs";
import { AuthProvider } from "contexts";

export const App = () => {
  const router = createBrowserRouter(routeConfigs);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};
