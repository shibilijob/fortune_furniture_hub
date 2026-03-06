import React from 'react';
import {
  HomeIcon,
  CubeIcon,
  UsersIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ADMIN_API from '../../../api/ADMIN_API';
import { useContext } from 'react';
import { dataContext } from '../../../context/AppContext';


function SideBar() {
  const navigate=useNavigate()
  const menuItems = [
    { name: 'Dashboard',path:'/admin',icon: <HomeIcon className="w-5 h-5" /> },
    { name: 'Products', path:'/admin/products', icon: <CubeIcon className="w-5 h-5" /> },
    { name: 'Users', path:'/admin/users', icon: <UsersIcon className="w-5 h-5" /> },
    { name: 'Orders', path: '/admin/ordersList', icon: <ShoppingBagIcon className="w-5 h-5" /> }
  ];

  const { setUser } = useContext(dataContext);
  async function handleLogout() {
  try {
    await ADMIN_API.post("/logout")   
    setUser(null);
    localStorage.removeItem("user") 
    navigate("/")                    

  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 shadow-xl rounded-2xl p-5 flex flex-col">
      
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-2xl font-bold tracking-wide text-gray-100">
          🛍️ AdminPanel
        </h1>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex items-center gap-3 px-4 py-3 !rounded-lg text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <span className="group-hover:scale-110 transition-transform duration-200 text-white">
              {item.icon}
            </span>
            <span style={{textDecoration:'none'}} className="font-medium text-white ">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="fixed bottom-5 left-4 w-64 px-5 border-t border-gray-700 pt-4">
        <button onClick={handleLogout} className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 !rounded-full shadow-md hover:opacity-90">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
