import { FastifyInstance } from "fastify"
import { handleUserProfile } from '../handlers/user'
import { verifyAccessToken } from '../hooks/auth'

const userRouters = async (app: FastifyInstance) =>{
    app.get('/profile',{
        preHandler:[
            verifyAccessToken
        ]   
    } ,handleUserProfile) 
        
    
}

export default userRouters