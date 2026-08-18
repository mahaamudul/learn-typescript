import { pool } from "../../db"


//insert a user in DB
const createUserProfileInDB=async(payload:any)=>{
    const {user_id,bio,address,phone,gender}=payload
    console.log(
        user_id
    );

    // check exits user
    const user=await pool.query(
        `
        SELECT * FROM users WHERE id=$1
        `,[user_id]

    );
    if (user.rows.length===0){
        throw new Error("user not found")
    }

    const result=await pool.query(
        `
            INSERT INTO profiles (user_id,bio,address,phone,gender)  VAlUES($1,$2,$3,$4,$5) RETURNING *    
        `,[user_id,bio,address,phone,gender]
    )

    return result

    
}






export const profileService={
    createUserProfileInDB,
   
}