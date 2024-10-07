import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/Dashboard";
import List from "./components/List";
import Login from "./page/Login";
import Create from "./components/Create";
import Update from "./components/Update";
import { store } from "./components/app/store";
import { Provider } from "react-redux";
import AuthLayout from "./components/AuthLayout";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/list",
        element: <List />,
      },
      {
        path: "/update/:id",
        element: <Update />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
]);

const RootProvider = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
export default RootProvider;
// export default router;
