import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMsg } from '../Redux/userSlice';
import 'animate.css'; 

const Notification = () => {
  const message = useSelector((state) => state.user.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(changeMsg(''));
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null; 

  return (
    <div
      className={`fixed top-12 left-1/2 transform -translate-x-1/2 max-w-xs sm:max-w-sm md:max-w-md w-full p-4 rounded-lg shadow-xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white z-50 animate__animated animate__fadeIn`}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold">{message}</span>
        <button
          className="text-2xl font-bold text-white hover:text-gray-200 focus:outline-none"
          onClick={() => dispatch(changeMsg(''))}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
