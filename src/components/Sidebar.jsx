import React from 'react'
import { MdDashboard } from "react-icons/md";


function Sidebar() {
  return (
    <div className='fixed left-0 top-0 w-[15%] h-full bg-white'>
        <div className='logo'>
           <p className='text-2xl px-2 py-2 text-green-600 text-center'>GAUN KO SABJI</p>

        </div>
        <div className='px-2 py-2 flex flex-col gap-1'>
            <button className='flex items-center justify-start gap-2 border-b w-full py-1 px-2  text-gray-600'><MdDashboard className='text-xl'/> Dashboard</button>

            <button className='flex items-center justify-start gap-2 border-b w-full py-1 px-2  text-gray-600'><MdDashboard className='text-xl'/> Dashboard</button>


           

        </div>

    </div>
  )
}

export default Sidebar;