import type { IncomingMessage, ServerResponse } from "node:http";

export const productController=(req:IncomingMessage,res:ServerResponse)=>{
    const url=req.url;
    const method=req.method;


    if (url==="/products" && method==="GET"){
        console.log("this is product");
        res.writeHead(200,{"content-type":"application/json"});
         res.end(JSON.stringify({message:"this is products route "}))
    }
}