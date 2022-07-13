import { FastifyRequest } from "fastify"
import Users from '../models/Users'
import { getUserById  } from "../models/Users/Users"


export const handleUserProfile = async (request: FastifyRequest ) =>{
    const { id } = request

const user = await getUserById(id)

    return user
}


 
export default {
    handleUserProfile
}