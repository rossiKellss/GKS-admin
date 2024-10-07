import { createRoot } from "react-dom/client";

// import router from "./router.jsx";
import RootProvider from "./router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <>
    <RootProvider />
  </>
);
