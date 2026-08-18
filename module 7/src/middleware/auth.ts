import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { NextFunction, Request, Response } from "express"
import config from '../config'
import { pool } from '../db'

const auth=()=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        const token=req.headers.authorization
        

        if(!token){
            res.status(401).json({
                message:"Unauthorized User Access !",
                success:false
            })
        }

        // decode client jwt token 

        const decoded= jwt.verify(token as string,config.jwt_secret as string) as JwtPayload

        const userData=await pool.query(
            `
            SELECT * FROM users WHERE email=$1

            `,[decoded.email]
        )

        const user=userData.rows[0]

        if(userData.rows.length===0){
            res.status(401).json({

                message:"User Not Found!",
                success:false

            })
        }

        if(!user.is_active){
            res.status(403).json({

                message:"Forbidden !",
                success:false

            })

        }

        console.log(user);

        next();
    }
}

export default auth