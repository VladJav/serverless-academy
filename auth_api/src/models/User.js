import {pool} from "../db/connect.js";
import {genSalt, hash} from "bcrypt";

export class UserModel{
    async create( {email, password} ){
        const salt = await genSalt(10);
        const hashPassword = await hash(password, salt);

        const { rows: [ user ] } = await pool.query('INSERT INTO USERS(email, password) VALUES ($1, $2) RETURNING *', [email, hashPassword]);
        return user;
    }
    async findById(id){
        const { rows: [ user ]} = await pool.query('SELECT * FROM USERS WHERE id=$1', [id])
        return user;
    }

    async findByEmail(email){
        const { rows: [ user ]} = await pool.query('SELECT * FROM USERS WHERE email=$1', [email])
        return user;
    }
}