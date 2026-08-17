
import express, { type Application, type Request, type Response } from "express"
import config from "./config"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"


const app: Application = express()
const port = config.port

app.use(express.json())

app.use('/api/users', userRoute)




app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})



//get all users from db 
app.get('/api/users', async (req: Request, res: Response) => {
    try {

        const result = pool.query(`
            SELECT * FROM users
            `)

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
})


//get single users
app.get('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
            
            `, [id]);
        // console.log(result);

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

})


//update user

app.put('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;
    // console.log(name,password,age,is_active);
    // console.log(id);

    try {
        const result = await pool.query(`
        
        UPDATE users
        SET 

        name=COALESCE($1, name),
        password=COALESCE($2, password), 
        age=COALESCE($3, age), 
        is_active=COALESCE($4 ,is_active)

        WHERE id=$5
        RETURNING *
        
        `, [name, password, age, is_active, id])

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





})

// delete user
app.delete('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;


    try {
        const result = await pool.query(`
        DELETE FROM users WHERE id=$1
        
        RETURNING *
        
        `, [id])

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





})

export default app




