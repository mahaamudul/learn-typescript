
import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/products.types";
import { parseBody } from "../utility/parseBody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    
    const url = req.url; //url
    const method = req.method; //method

    const urlParts = url?.split('/')
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null

    const products = readProduct()
    


    if (url === "/products" && method === "GET") {
        console.log("this is product");
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "this is products route ", data: products }))
    }
    else if (method === "GET" && id !== null) {
        const products = readProduct()

        const product = products.find((p: IProduct) => p.id === id);
        console.log(product);
        if(!product){
            res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "product not found ", data: null }))

        }

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "this is single product route ", data: product }))


    }
    else if (method === "POST" && url === "/products") {

        const products = readProduct()



        const body = await parseBody(req)
        const newProduct = {
            id: Date.now(),
            ...body
        }
        products.push(newProduct)
        insertProduct(products)




        res.writeHead(200, { "content-security-policy": "application/json" });
        res.end(
            JSON.stringify({ message: "products inserterd succesfully", data: newProduct })
        )

    }

    else if (method === "PUT" && id !== null) {
        const body = await parseBody(req)
        const products = readProduct()
        const index = products.findIndex((p: IProduct) => p.id === id)
        console.log("id", index);

        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: "product not found,",
                data: null

            }))
        }
        products[index] = {
            id: products[index].id, ...body
        }

        insertProduct(products)
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "product updated,",
            data: products[index]

        }))
    }
    else if (method === "DELETE" && id !== null) {
        // const body = await parseBody(req)

        const products = readProduct() // products 
        const index = products.findIndex((p: IProduct) => p.id === id)
        console.log("id", index);

        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({
                message: "product not found,",
                data: null

            }))
        }

         products.splice(index, 1);


        insertProduct(products)
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "deleted succesfully,",
            data: products[index]

        }))
    }




}