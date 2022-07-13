import { FastifyRequest } from "fastify"
import Articles,{ArticleSchemaWithDocument} from '../models/Articles'
import { ArticleRequestBody , ArticleParams , ArticleWithRequestBodyAndParams } from '../types/handlers/article'

export const handlePostCreateNew = async (request: ArticleRequestBody ): Promise<ArticleSchemaWithDocument> =>{
    const { id } = request
    const{ title , description , status} = request.body

    const artical = await Articles.createNewArticle({
        title,
        description,
        status: status ?? 'active',
        author: id
    })

    return artical
}

export const handleGetArticle = async (request: FastifyRequest ) =>{
    return 'handleGetArticle'
}

export const handleGetArticleById = async (request: FastifyRequest ) =>{
    return 'handleGetArticleById'
}

export const handlePathUpdateArticleById = async (request: FastifyRequest ) =>{
    return 'handlePathUpdateArticleById'
}

export const handleDeleteArticleById = async (request: FastifyRequest ) =>{
    return 'handleDeleteArticleById'
}
 
export default {
    handlePostCreateNew,
    handleGetArticle,
    handleGetArticleById,
    handlePathUpdateArticleById,
    handleDeleteArticleById
}