import {pool} from "../db/connect.js";

export class Token{
    async save({ userId, refreshToken, userAgent }){
        const token = await this.findById(userId);

        if(token){
            token.token = refreshToken;
            token.userAgent = userAgent;
            return await this.update(token);
        }

        const { rows: [ newToken ] } = await pool.query('INSERT INTO TOKENS(id, token, userAgent) VALUES ($1, $2, $3) RETURNING *', [userId, refreshToken, userAgent]);

        return newToken;
    }
    async update({id, token, userAgent}){
        const { rows: [updatedToken] } = await pool.query('UPDATE TOKENS SET token = $1, userAgent = $2 WHERE id=$3 RETURNING *', [token, userAgent, id]);
        return updatedToken;
    }
    async findById(id){
        const { rows: [ token ]} = await pool.query('SELECT * FROM tokens WHERE id=$1', [id])
        return token;
    }
}