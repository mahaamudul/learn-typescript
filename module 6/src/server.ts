import { createServer, IncomingMessage, Server } from "node:http";

const server:Server=createServer((req:IncomingMessage,res)=>{
    console.log(req.url);
    console.log(req.method);

    const url=req.url;
    const method=req.method;


    if (url==="/" && method==="GET"){
        console.log("this is root");
        res.writeHead(200,{"content-type":"application/json"});
         res.end(JSON.stringify({message:"this is root dir "}))
    }
    else if (url?.startsWith("/products")){
        res.writeHead(200,{"content-type":"application/json"});
         res.end(JSON.stringify({message:"this is product route "}))
    }
    else {
        res.writeHead(404,{"content-type":"application/json"});
        res.end(JSON.stringify({message:"page not found "}))
    }
})

server.listen(5000,()=>{
    console.log("Server is running on port 5000");
})