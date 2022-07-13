import * as dotenv from 'dotenv'
const username = "admin";
const password = "WYCC29wqY7sTrFIR";
const cluster = "cluster0";
dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: 4000,
    mongodb:{
        uri: `mongodb+srv://${username}:${password}@${cluster}.estkibg.mongodb.net/?retryWrites=true&w=majority` || 'mongodb://loccalhost/nodeFinal'
    },
    secret:{
        accessToken:'YanawarutApi'
    }
}

export default config