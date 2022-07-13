import { FastifyRequest } from "fastify"
import Articles,{ ArticleSchemaWithDocument , ArticleSchema } from "../models/Articles"
import { ArticleRequestBody, ArticleParams , ArticleWithRequestBodyAndParams } from '../types/handlers/article'

export const handlePostCreateNew = async (request: ArticleRequestBody ): Promise<ArticleSchemaWithDocument> =>{
    const { id } = request
    const{title,description,status} = request.body

    const article = await Articles.createNewArticle({
        title,
        description,
        status: status ?? 'active',
        author: id
    })
    return article
}

export const handleGetArticles = async (request: FastifyRequest ): Promise<ArticleSchema[]> =>{
    const article = await Articles.getArticles()
    return article
}

export const handleGetArticleById = async (request: ArticleParams ): Promise<ArticleSchema> =>{
    const { id } = request.params

    const artical = await Articles.getArticleById(id)
    return artical
}

// export const handlePatchUpdateArticleById = async (request: ArticleWithRequestBodyAndParams ): Promise<string> =>{
//     const { id } = request
//     const { id } = request.params
//     const {title,description,status} = request.body

//     await Articles.updatedArticleById(id,{
//         title,
//         description,
//         status: status ?? 'active',
//         author: id
//     })

//     return 'Update Successfuly'
// }

export const handleDeleteArticleById = async (request: ArticleParams ) =>{
    const {id} = request.params

    await Articles.softDeleteArticleById(id)

    return 'Delete Successfuly'
}

 
export default {
    handlePostCreateNew,
    handleGetArticles,
    handleGetArticleById,    
    handleDeleteArticleById

}
// handlePatchUpdateArticleById,