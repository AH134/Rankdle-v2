import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./pages/Root/Root";
import Error from "./pages/Error/Error";
import Games, { loader as gameLoader } from "./pages/Game/Games";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: rootLoader,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            path: "games/:name",
            element: <Games />,
            errorElement: <Error />,
            loader: gameLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
