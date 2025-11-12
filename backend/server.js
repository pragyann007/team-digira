import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import {Server} from "socket.io"
dotenv.config();


const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
      }
})



const port = process.env.PORT ; 

server.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})


