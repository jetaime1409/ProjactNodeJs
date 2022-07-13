import { FastifyInstance } from "fastify"
import articleHendlers from '../handlers/article'
import { verifyAccessToken } from '../hooks/auth'

const articleRouters = async (app: FastifyInstance) =>{
    const preHandler = [verifyAccessToken]

    app.post('/',{ preHandler } ,articleHendlers.handlePostCreateNew)
    app.get('/',{ preHandler } ,articleHendlers.handleGetArticle)
    app.get('/:id',{ preHandler } ,articleHendlers.handleGetArticleById)
    app.patch('/:id',{ preHandler } ,articleHendlers.handlePathUpdateArticleById)
    app.delete('/id',{ preHandler } ,articleHendlers.handleDeleteArticleById)
         
    
}

export default articleRouters