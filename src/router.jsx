import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/Dashboard";
import List from "./components/List";

import Create from "./components/Create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path:"/create",
        element:<Create/>
      },
      {
        path:"/list",
        element:<List/>
      }
     
    ],
  },
  
 

]);

export default router;
