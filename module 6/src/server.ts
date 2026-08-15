import { createServer, IncomingMessage, Server } from "node:http";
import { routeHandler } from "./routes/routes";

const server:Server=createServer((req:IncomingMessage,res)=>{
    
    //call route handler
    routeHandler(req,res)
    
})

server.listen(5000,()=>{
    console.log("Server is running on port 5000");
})