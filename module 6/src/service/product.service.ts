import path from "node:path"
import fs from 'fs'

const productFilePath=path.join(process.cwd(),"./src/database/db.json")

export const readProduct=()=>{
    // console.log(productFilePath);
    const products=fs.readFileSync(productFilePath,'utf-8');
    return JSON.parse(products)
}