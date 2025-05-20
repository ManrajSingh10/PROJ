import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/SideBar';
import { SocketProvider } from './SocketContext';
import FloatingChat from "./Components/Chat/FloatingChat"
import { useSelector } from 'react-redux';
import Notification from './Components/Notification';

const Layout = () => {
  const chatOpen = useSelector((state) => state.user.chatOpen)
  const message = useSelector((state) => state.user.message)
  return (
    <SocketProvider>
      <Header/>
      <main className=' mt-16'>
        {chatOpen && <FloatingChat/>}
        {message && <Notification/>}
        <Sidebar/>
        <Outlet />
      </main>
      {/* <Footer/> */}
    </SocketProvider>
  );
};

export default Layout;
