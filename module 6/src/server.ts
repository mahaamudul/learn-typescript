import { createServer, IncomingMessage, Server } from "node:http";
import { routeHandler } from "./routes/routes";
import config from "./config";

const server:Server=createServer((req:IncomingMessage,res)=>{
    
    //call route handler
    routeHandler(req,res)
    
})

server.listen(config.port,()=>{
    console.log(`Server is running on port:${config.port}`);
})