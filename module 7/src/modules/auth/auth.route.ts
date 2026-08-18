import { Router } from 'express';
import { authController } from './auth.controller';



const router=Router()

//create user profile
router.post('/',authController.loginUser);



export const authRoute=router