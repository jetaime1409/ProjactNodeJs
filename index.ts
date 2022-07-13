import { FastifyServerOptions } from 'fastify'
import buildApp from './src/app'
import config from './src/config'

const mongoose = require('mongoose');

const options: FastifyServerOptions = {
    logger:true
} 
const app = buildApp(options)

try{
    main().catch(err => console.log(err));
    async function main() {
        await app.listen(config.port)
    console.log(`app is running on port ${config.port}`)

        await mongoose.connect(config.mongodb.uri,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
    console.log('mongo has been connected')
    }

} catch (error){
    throw error
}







