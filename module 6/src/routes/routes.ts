import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../controllers/product.controller";

export const routeHandler=(req:IncomingMessage,res:ServerResponse)=>{
    const url=req.url;
    const method=req.method;


    if (url==="/" && method==="GET"){
        console.log("this is root");
        res.writeHead(200,{"content-type":"application/json"});
         res.end(JSON.stringify({message:"this is root dir "}))
    }
    else if (url?.startsWith("/products")){
        productController(req,res)
    }
    else {
        res.writeHead(404,{"content-type":"application/json"});
        res.end(JSON.stringify({message:"page not found "}))
    }
};