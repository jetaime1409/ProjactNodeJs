import fastify, { FastifyServerOptions } from 'fastify'
import authRouters from './routers/auth'
import userRouters from './routers/user'
import articleRouters from './routers/article'

import { CustomError } from './utils/custom-error'

declare module 'fastify'{
    interface FastifyRequest{
        userId?: string
    }
}

const buildApp =  (options: FastifyServerOptions) =>{
    const app = fastify(options)

    app.get('/', async()=> 'welcom to my api' )
    app.register(authRouters ,{ prefix: '/auth' })
    app.register(userRouters ,{ prefix: '/users' })
    app.register(articleRouters ,{ prefix:'/articles'})


    app.setErrorHandler((error,reques,reply)=>{ 
       const customError: CustomError = error

        reply
        .status(customError.statusCode ||500)
        .send({
            error: {
                message: customError.message,
                code: customError.code,
                data: customError.data
            }
        })
    })
    

    return app
}

export default buildApp