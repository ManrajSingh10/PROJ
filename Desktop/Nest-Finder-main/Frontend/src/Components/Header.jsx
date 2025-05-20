import React, { useState } from 'react';
import { GiBirdHouse } from 'react-icons/gi';
import { Link, NavLink } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { toggleSideBar } from '../Redux/userSlice';
import { FaBuilding } from "react-icons/fa";

function Header() {
  // State to track whether the menu is open or closed on small screens
  const dispatch = useDispatch()

  // Function to toggle the menu
  const toggleSidebar = () => {
    dispatch(toggleSideBar())
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleSidebar} 
            aria-controls="navbar-sticky"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <Link to="/"  className="flex items-center space-x-3 rtl:space-x-reverse mx-auto md:m-0">
          <GiBirdHouse size={30} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          NestFinder
          </span>
        </Link>

        <div className='hidden lg:flex items-end ml-[800px]'>
          <FaBuilding size={10} />
          <FaBuilding size={12} />
          <FaBuilding size={14} />
          <FaBuilding size={16} />
          <FaBuilding size={18} />
          <FaBuilding size={20} />
          <FaBuilding size={22} />
          <FaBuilding size={25} />
          <FaBuilding size={22} />
          <FaBuilding size={20} />
          <FaBuilding size={18} />
          <FaBuilding size={16} />
          <FaBuilding size={14} />
          <FaBuilding size={12} />
          <FaBuilding size={10} />
        </div>
        
      </div>
    </nav>
  );
}

export default Header;
