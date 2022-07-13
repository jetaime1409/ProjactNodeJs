import  { 
    AuthLoiginBodyRequest,
    AuthRegisterBodyRequest ,
    AuthLoginBodyResponse,
    AuthRefreshTokenResponse
    } from '../types/handlers/auth'
import Users from '../models/Users'
import { usersSchemaWithDocument } from '../models/Users/schema'
import { FastifyRequest } from 'fastify'


export const handleLogin = async (request: AuthLoiginBodyRequest): Promise<AuthLoginBodyResponse> =>{
    const { username , password } = request.body
    const user = await Users.userLogin(username , password)
    return user

}

export const handleRegister = async (request: AuthRegisterBodyRequest): Promise<usersSchemaWithDocument> =>{
    const { 
        username ,
        password,
        email,
        name,
        surname
    } = request.body

    const user = await Users.createNewUser({
        username ,
        password,
        email,
        name,
        surname
    })

    return user
}

export const handleRefreshToken = async (request: FastifyRequest): Promise<AuthRefreshTokenResponse> =>{
    const { id } = request

    const accessToken = Users.genAccessToken(id)
    const response: AuthRefreshTokenResponse ={
        accessToken
    }


    return response
}

export default {    
    handleLogin,
    handleRegister,
    handleRefreshToken
}