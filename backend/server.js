import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import {Server} from "socket.io"
import { connectDb } from "./config/db.js"
import { authRouter } from "./routes/auth.routes.js"
dotenv.config();
connectDb();

const app = express();

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
      }
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.send("hiiii ")
    
})






app.use("/api/auth",authRouter)
const port = process.env.PORT ; 

server.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})


