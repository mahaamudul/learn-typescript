
import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/products.types";

export const productController=(req:IncomingMessage,res:ServerResponse)=>{
    const url=req.url;
    const method=req.method;
    const urlParts=url?.split('/')
    const id=urlParts && urlParts[1]==="products"?Number(urlParts[2]): null

    const products=readProduct()
    // console.log(products);


    if (url==="/products" && method==="GET"){
        console.log("this is product");
        res.writeHead(200,{"content-type":"application/json"});
         res.end(JSON.stringify({message:"this is products route ", data:products}))
    }
    else if (method==="GET" && id !== null){
    const products=readProduct()

        const product = products.find((p:IProduct) => p.id === id);
        console.log(product);

        res.writeHead(200,{"content-type":"application/json"});
         res.end(JSON.stringify({message:"this is single product route ", data:product}))


    }
}