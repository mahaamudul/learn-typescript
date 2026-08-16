
import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/products.types";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {

    const url = req.url; //url
    const method = req.method; //method

    const urlParts = url?.split('/')
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null

    const products = readProduct()



    if (url === "/products" && method === "GET") {
        console.log("this is product");

        sendResponse(res, 200, true, "get all product data ", products)
        // res.writeHead(200, { "content-type": "application/json" });
        // res.end(JSON.stringify({ message: "this is products route ", data: products }))
    }
    else if (method === "GET" && id !== null) {
        const products = readProduct()

        const product = products.find((p: IProduct) => p.id === id);

        console.log(product);

        if (!product) {

            sendResponse(res, 404, false, "Product Not Found", null)

        }

        sendResponse(res, 200, true, "get single product data ", product)




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



        sendResponse(res, 200, true, "Product Inserted Successfully", newProduct)


    }

    else if (method === "PUT" && id !== null) {
        const body = await parseBody(req)
        const products = readProduct()
        const index = products.findIndex((p: IProduct) => p.id === id)
        console.log("id", index);

        if (index < 0) {
            sendResponse(res, 404, false, "Product Not Found", null)

        }
        products[index] = {
            id: products[index].id, ...body
        }

        insertProduct(products)

        sendResponse(res, 200, true, "Product Updated Successfully", products[index])

    }
    else if (method === "DELETE" && id !== null) {


        const products = readProduct() // products 

        const index = products.findIndex((p: IProduct) => p.id === id)

        console.log("id", index);

        if (index < 0) {
            sendResponse(res, 404, false, "Product Not Found", null)
        }

        const deleted=products.splice(index, 1);


        insertProduct(products)

        sendResponse(res, 200, true, "Product Deleted Successfully ", deleted)

    }




}