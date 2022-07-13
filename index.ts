import { FastifyServerOptions } from 'fastify'
import buildApp from './src/app'
import config from './src/config'

import mongoose from 'mongoose';

const options: FastifyServerOptions = {
    logger:true
} 
const app =  buildApp(options)

try{
  
         app.listen(config.port)
    console.log(`app is running on port ${config.port}`)

        mongoose.connect(config.mongodb.uri)
    console.log('mongo has been connected')
    

} catch (error){
    throw error
}







