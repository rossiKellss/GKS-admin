import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/Dashboard";
import List from "./components/List";

import Create from "./components/Create";
import Update from "./components/Update";
import { store } from "./components/app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path: "/",
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
]);

export default router;
