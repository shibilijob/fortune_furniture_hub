import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fortunLogo from '/logo.png';
import cartIcon from '/cart.svg';
import { dataContext } from '../../context/AppContext';
import { FaUserCircle } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { HiMenu, HiX } from 'react-icons/hi';
import API from '../../api/API';


function NavBar() {
  // const [count, setCount] = useState(0);
  const [menu, setMenu] = useState('home');
  const [showPop, setShowPop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const { user, setUser, cartCount, setSearchText } =
    useContext(dataContext);

  async function handleLogout() {
    try {
      await API.post("/user/logout")   
      setUser(null);
      localStorage.removeItem("user") 
      setShowPop(false);
      navigate("/")                    

    } catch (error) {
      console.log(error)
    }
  }

  function handleSearch(e) {
    const text = e.target.value;
    setSearchText(text);
    if (text.trim() !== '') navigate('/allProducts');
  }

  const navItemStyle = (name) =>
    `relative cursor-pointer pb-1 transition-all duration-300 ${
      menu === name ? 'text-amber-700' : 'text-gray-700'
    }`;

  const underlineStyle =
    "absolute left-0 bottom-0 h-[3px] bg-amber-700 rounded-full transition-all duration-300 w-full";

  return (
    <div className="sticky top-0 z-50 bg-white shadow-[0_1px_9px_goldenrod]">

      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-3">

        {/* Logo */}
        <img
          className="w-[150px] cursor-pointer"
          onClick={() => navigate('/')}
          src={fortunLogo}
          alt="fortune"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-[18px] font-medium">
          <li
            className={navItemStyle('home')}
            onClick={() => {
              setMenu('home');
              navigate('/');
            }}
          >
            Home
            {menu === 'home' && <span className={underlineStyle}></span>}
          </li>

          <li
            className={navItemStyle('Shop')}
            onClick={() => {
              setMenu('Shop');
              navigate('/productPage');
            }}
          >
            Shop
            {menu === 'Shop' && <span className={underlineStyle}></span>}
          </li>

          <li
            className={navItemStyle('About')}
            onClick={() => {
              setMenu('About');
              navigate('/aboutPage');
            }}
          >
            About Us
            {menu === 'About' && <span className={underlineStyle}></span>}
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <div className="hidden md:flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search Products ..."
              className="border h-[38px] border-gray-400 rounded-xl px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={handleSearch}
            />
            <CiSearch size={22} />
          </div>

          {/* Login */}
          {user ? (
            <div className="hidden md:flex items-center gap-2 font-semibold text-amber-700">
              <FaUserCircle
                className="cursor-pointer"
                onClick={() => setShowPop(!showPop)}
                size={22}
              />
              <span>Hi, {user.name}</span>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition"
            >
              Log in
            </button>
          )}

          {/* Cart */}
          <div className="relative cursor-pointer">
            <img
              className="w-[32px]"
              src={cartIcon}
              alt="cart"
              onClick={() =>
                user ? navigate('/CartPage') : navigate('/login')
              }
            />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden cursor-pointer">
            {mobileOpen ? (
              <HiX size={26} onClick={() => setMobileOpen(false)} />
            ) : (
              <HiMenu size={26} onClick={() => setMobileOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-white border-t shadow-md text-lg font-medium">
          <span onClick={() => { setMenu('home'); navigate('/'); setMobileOpen(false); }}>Home</span>
          <span onClick={() => { setMenu('Shop'); navigate('/productPage'); setMobileOpen(false); }}>Shop</span>
          <span onClick={() => { setMenu('About'); navigate('/aboutPage'); setMobileOpen(false); }}>About Us</span>

          {!user ? (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Log in
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Popup */}
      {showPop && (
        <div
          className="fixed inset-0 flex justify-end pr-5 pt-20"
          onClick={() => setShowPop(false)}
        >
          <div
            className="flex flex-col items-center bg-amber-50 rounded-lg shadow-lg p-4 w-60"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="font-semibold text-gray-800 mb-3">
              Hi, {user?.username}
            </h5>

            <button
              onClick={handleLogout}
              className="w-full mb-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg shadow hover:opacity-90"
            >
              Logout
            </button>

            <button
              onClick={() => navigate('/Orders')}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg shadow hover:opacity-90"
            >
              Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
