import type { Request, Response } from "express";
import { profileService } from "./profile.service";



//create user profile
const createUserProfile = async (req: Request, res: Response) => {




    try {

        const result = await profileService.createUserProfileInDB(req.body)



        res.status(200).json({

            message: "User Profile Created",
            success: true,
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







export const profileController = {
    createUserProfile,

}