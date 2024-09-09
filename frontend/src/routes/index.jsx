import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",  // Root route
    element: <App />,  // App contains Outlet
    children: [
      {
        path: "/",  // Or try path: "", this points to Home component
        element: <Home />
      }
    ]
  }
]);

export default router;
