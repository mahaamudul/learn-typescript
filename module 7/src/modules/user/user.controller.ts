import type { Request, Response } from "express";
import { userService } from "./user.service";


//create a user
const createUser = async (req: Request, res: Response) => {

    const { name, email, password, age } = req.body;

    try {

        const result = await userService.createUserInDB(req.body)

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

//get all user 
const getAllUsers = async (req: Request, res: Response) => {
    try {

        const result = await userService.getAllUsersFromDB()

        res.status(200).json({
            message: "User fetch Successfully",
            success: true,
            data: (await result).rows
        });

    }
    catch (err: any) {
        res.status(500).json({
            message: err.message,
            success: false,
            "error": err
        });

    }

}


//get single user by ID
const getSingleUserByID=async (req: Request, res: Response)=>{
    const { id } = req.params
    console.log(id);
        try {
            const result=await userService.getSingleUserFromDB(id as string)
           
    
            if (result.rows.length === 0) {
                res.status(404).json({
                    message: "User Not found !",
                    success: false,
                    data: {}
                })
    
            }
    
    
    
            res.status(200).json({
                message: "Single User data",
                success: true,
                data: (await result).rows[0]
            })
        }
        catch (err: any) {
            res.status(500).json({
                message: err.message,
                success: false,
                "error": err
            })
        }
}

//update user 
const updateUser=async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;
    

    try {
        const result=await userService.updateUserInDB({name,password,age,is_active,id});

        if (result.rows.length === 0) {
            res.status(404).json({
                message: "User Not found !",
                success: false,
                data: {}
            })

        }

        res.status(200).json({
            message: "User Updated",
            success: true,
            data: result.rows[0]
        })
    }
    catch (err: any) {

        res.status(500).json({
            message: err.message,
            success: false,
            "error": err
        })

    }





}

// delete user 
const deleteUser=async (req: Request, res: Response) => {
    const { id } = req.params;


    try {
        const result=await userService.deleteUserFromDB(id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                message: "User Not found !",
                success: false,
                data: {}
            })

        }

        res.status(200).json({
            message: "User Deleted",
            success: true,
        })
    }
    catch (err: any) {

        res.status(500).json({
            message: err.message,
            success: false,
            "error": err
        })

    }





}






export const userController = {
    createUser,
    getAllUsers,
    getSingleUserByID,
    updateUser,
    deleteUser
}