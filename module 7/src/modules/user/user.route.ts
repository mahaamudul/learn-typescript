import { Router} from "express";
// import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router=Router()

//create user
router.post('/',userController.createUser);

//get all users 
router.get('/',auth()as any,userController.getAllUsers);

//get single user by ID
router.get('/:id',userController.getSingleUserByID);

//update a user
router.put('/:id',userController.updateUser);

//delete user
router.delete('/:id',userController.deleteUser);





export const userRoute=router