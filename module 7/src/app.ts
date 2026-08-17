
import express, { type Application, type Request, type Response } from "express"
import config from "./config"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"


const app: Application = express()
const port = config.port

app.use(express.json())






app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})


// redirect to the user route 
app.use('/api/users', userRoute)









export default app




