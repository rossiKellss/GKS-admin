import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLazyCheckAuthQuery } from "@/app/apiAuthSlice";

function Dashboard() {
  const navigate=useNavigate();
  // const isLoggedIn=useSelector(state=>state?.auth?.token);
  const [checkAuth]=useLazyCheckAuthQuery();

  
  useEffect(()=>{
    const isLoggedIn=async()=>{
      try{
        const res=await checkAuth().unwrap();
        if(!res.success){
          navigate('/login')
        }

  
      }catch(err){
        console.log(err);
  
      }

    }
    isLoggedIn();
    
   
    
    

  },[]);
  
  return (
    <section className="main flex bg-background">
        <div className="relative sideBarWrapper w-[15%] ">
          <Sidebar />
          
        </div>
        <div className="contentRight w-[85%]">
          
          <Outlet/>
        </div>
      </section>
  )
}

export default Dashboard