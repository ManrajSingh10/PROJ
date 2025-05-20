import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { createServer } from "http";
import setupSocketIO from "./socket.js";  

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
  })
);

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

app.get("/",(req,res)=>{
  res.send("hello man ")
})

const server = createServer(app);

setupSocketIO(server);

import router from "./Routes/user.route.js"
import propertyRouter from "./Routes/property.route.js"
import favoutiteRouter from "./Routes/favourite.route.js"
import chatRouter from "./Routes/chat.route.js"
import requestRouter from "./Routes/request.route.js"

app.use("/user",router)
app.use("/property",propertyRouter)
app.use("/favourite",favoutiteRouter)
app.use("/chat", chatRouter)
app.use("/request", requestRouter)


export default server