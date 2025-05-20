import React, { createContext, useContext, useMemo, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { backend, isLoggedin } from "./Helper";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(`${backend}`, { 
    reconnection: false,
    transports: ["websocket"],
    withCredentials: true 
  }), []);

  useEffect(() => {
    if(!isLoggedin()) return
    socket.on("connect", async() => {
      try {
        const response = await axios.put(
          `${backend}/user/updateSocketId`,
          {socketId : socket.id},
          {withCredentials : true}
        )
      } catch (error) {
        console.error("error in updating socketId",error)
      }
      
    });

    // Cleanup when the component is unmounted
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket,isLoggedin]);

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketUser = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketUser must be used within a SocketUserProvider");
  }
  return context;
};