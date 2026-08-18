import { Router } from 'express';
import { profileController } from './profile.controller';


const router=Router()

//create user profile
router.post('/',profileController.createUserProfile);







export const profileRoute=router