import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <section className="main flex bg-background">
        <div className="relative sideBarWrapper w-[15%] ">
          <Sidebar />
          
        </div>
        <div className="contentRight w-[85%]">
          
          <Outlet/>
        </div>
      </section>
    </>
  );
}

export default App;
