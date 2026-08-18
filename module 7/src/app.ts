
import express, { type Application, type Request, type Response } from "express"
import config from "./config"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profile/profile.route"
import { authRoute } from "./modules/auth/auth.route"
import logger from "./middleware/logger"



const app: Application = express()

app.use(express.json())
app.use(logger)






app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})


// redirect to the user route 
app.use('/api/users', userRoute)

// redirect to the profile route 
app.use('/api/profile', profileRoute)

// redirect to auth route 
app.use('/api/auth', authRoute)

// logger middle ware










export default app




