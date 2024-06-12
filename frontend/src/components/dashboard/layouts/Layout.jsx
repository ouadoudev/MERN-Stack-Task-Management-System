import {  Navigate, Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"


const Layout = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return <Navigate to="/" replace />;
  } else if (user.role== 'student') {
    return <Navigate to="/profile" replace />;
  }
  return (
    <main className=" relative overflow-hidden bg-gray-100">
      <div className="flex items-start justify-between">
        <div className="relative hidden h-screen my-4 ml-4  lg:block ">
            <Sidebar />
        </div>
  
   <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
           <Header />
           <Outlet />
      
        </div>
        </div>
   </main>
   
  )
}

export default Layout