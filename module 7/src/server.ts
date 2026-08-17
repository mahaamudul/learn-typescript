
import express, { type Application, type Request, type Response } from "express"
import { Pool } from 'pg'
import config from "./config"


const app: Application = express()
const port = config.port

app.use(express.json())
const pool = new Pool({

    connectionString: config.connection_string

})

const initDb = async () => {
    try {

        await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        email VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(30),
        age INT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`);

        console.log("database created");

    }
    catch (err) {
        console.log(err);
    }
}
initDb()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.post('/api/users', async (req: Request, res: Response) => {
    const { name, email, password, age } = req.body;

    try {
        const result = await pool.query(`
        INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) 
        RETURNING *
        `, [name, email, password, age])
        res.status(200).json({
            message: "created",
            data: result.rows[0]
        })
    }
    catch (err: any) {
        res.status(500).json({
            message: err.message,
            "error": err
        })

    }
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




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})