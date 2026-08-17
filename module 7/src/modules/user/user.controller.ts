import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {

    const { name, email, password, age } = req.body;

    try {

        const result=await userService.createUserInDB(req.body)
        
        res.status(200).json({
            message: "User Created",
            data: result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: err.message,
            "error": err
        })

    }

}

export const userController={
    createUser
}