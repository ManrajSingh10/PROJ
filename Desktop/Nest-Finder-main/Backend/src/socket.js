import { Server } from "socket.io";
import User from "./Models/User.model.js";
import Message from "./Models/message.model.js";
import Chat from "./Models/chat.model.js";


const messageSaver = async(msg) => {
  try {
    const dbMsg = await Message.create(
      {
        msg : msg.msg,
        sender : msg.sender,
        reciever : msg.reciever,
        conversationId : msg.conversationId
      }
    ) 
    await Chat.findByIdAndUpdate(
      msg.conversationId,
      {
        $push: { messages: dbMsg._id }
      }
    )
    return dbMsg._id
  } catch (error) {
    console.error("Error in Updating message in database",error)
    return null
  }
}

export default function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected with ID: ${socket.id}`);
    
    socket.on("msg",async (msg) => {

      if(!msg.reciever) {
        socket.to(socket.id).emit("error","Reciever Id not Provided")
        console.error("Reciever Id not Provided")
        return
      }

      const recieverData = await User.findById(msg.reciever)

      if(!recieverData){
        socket.to(socket.id).emit("error","Reciever Not Found")
        console.error("Reciever Not Found")
        return
      }

      const msgId = await messageSaver(msg)

      if(!recieverData.isActive){
        socket.to(socket.id).emit("error","Reciever is Not Active")
        console.error("Reciever is not Active")
        return
      }
      socket.to(recieverData.socketId).emit("msg-backend",{msg,msgId})
             
    })
    
    
    socket.on("disconnect", async() => {
      try {
        const user = await User.findOneAndUpdate(
          { socketId: socket.id },
          { socketId: null, isActive: false }, 
          { new: true } 
        );

      } catch (error) {
        if (error.code === 'ECONNRESET') {
          console.error('Connection was reset by the client:', error);
        } else {
          console.error('Error in removing socketId:', error);
        }
      }

      console.log(`User disconnected: ${socket.id}`);
    });
  });
}