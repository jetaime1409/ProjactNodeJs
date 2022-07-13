import { FastifyRequest } from "fastify"
import customError from "../utils/custom-error"
import authErrors from '../errors/auth'
import * as jwt from 'jsonwebtoken'
import config from '../config'
import {AccessTokenDecoded} from '../types/hooks/auth'

const validateHeadersAuth = (request: FastifyRequest): string =>{
 const authToken:string = request.headers['authorization']!
    if(!authToken){
        customError(authErrors.AuthMissingHeaders)
    }

    const accessToken = authToken.split(' ')[1]
    if(!accessToken){
        customError(authErrors.AuthMissingHeaders)
    }

    return accessToken
}

export const verifyAccessToken = async (request: FastifyRequest): Promise<boolean>=>{
    const accessToken = validateHeadersAuth(request)
    const decoded:AccessTokenDecoded = Object(jwt.verify(accessToken, config.secret.accessToken))
    request.id = decoded.aud

    return true
}