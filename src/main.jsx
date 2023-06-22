import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Root, Error, Home, Game, Submit } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "games/:name",
            element: <Game />,
            loader: async ({ params }) => {
              return fetch(`http://localhost:3000/api/games/${params.name}`);
            },
          },
          {
            path: "submit",
            element: <Submit />,
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
