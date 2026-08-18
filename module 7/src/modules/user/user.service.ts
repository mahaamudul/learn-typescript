import bcrypt from "bcryptjs";
import { pool } from "../../db"
import type { IUser } from "./user.interface";


//insert a user in DB
const createUserInDB=async(payload:IUser)=>{

    const{name, email, password, age}=payload

    const hasPassword= await bcrypt.hash(password,10);

    const result = await pool.query(`
        INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) 
        RETURNING *
        `, [name, email, hasPassword, age]);

        delete result.rows[0].password;
        return result
}

//get all user from db
const getAllUsersFromDB=async()=>{
    const result = pool.query(`
                SELECT * FROM users
                `);
    return result
}

//get single user from DB
const getSingleUserFromDB=async(id:string )=>{
    console.log(id);
    const result = await pool.query(`
                SELECT * FROM users WHERE id=$1
                
                `,[id]);

    return result
}

//update user from db
const updateUserInDB=async(payload:any)=>{
    const { name, password, age, is_active,id} = payload;

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

        return result



}


// delete user from db 

const deleteUserFromDB=async(id:string)=>{
    const result = await pool.query(`
        DELETE FROM users WHERE id=$1
        
        RETURNING *
        
        `, [id])

        return result
}





export const userService={
    createUserInDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserInDB,
    deleteUserFromDB
}