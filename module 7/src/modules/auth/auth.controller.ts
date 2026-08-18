import type { Request, Response } from "express";
import { authService } from "./auth.service";



//create user profile
const loginUser = async (req: Request, res: Response) => {




    try {

        const result = await authService.loginUserFromDB(req.body)



        res.status(200).json({

            message: "Token Generate Successfully",
            success: true,
            data: result
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: err.message,
            "error": err
        })

    }

}







export const authController = {
    loginUser,

}