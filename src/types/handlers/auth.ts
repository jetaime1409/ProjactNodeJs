import { FastifyRequest } from "fastify";

export type AuthLoiginBodyRequest = FastifyRequest<{
    Body:{
        username: string
        password: string
    }
}>

export type AuthRegisterBodyRequest = FastifyRequest<{
    Body:{
        username: string
        password: string
        email: string
        name: string
        surname: string

    }
}>

export interface AuthLoginBodyResponse{
    id: string
    username: string
    email: string
    name: string | null
    surname: string | null
    accessToken?: string

}

export interface AuthRefreshTokenResponse {
    accessToken: string
}



