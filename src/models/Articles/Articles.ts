import customError from '../../utils/custom-error'
import articleErrors from '../../errors/article'
import Articles, {ArticleSchema,ArticleSchemaWithDocument} from './schema'


export type {
    ArticleSchemaWithDocument,
    ArticleSchema
}

export const createNewArticle = async (doc: ArticleSchema): Promise<ArticleSchemaWithDocument> =>{
const artical = new Articles(doc)

return artical.save()
}

export const getArticles = async (condition: any ={}): Promise<ArticleSchema[]> =>{
    const articles = await Articles
    .find({
        ...condition,
        status:'active'
    })
    .sort({
        createdAt: -1
    })
    .lean<ArticleSchema[]>()

    return articles
}

export const getArticleById = async (articleId: string): Promise<ArticleSchema> =>{
    try{
    const articles = await Articles
        .findOne({
            _id: articleId,
            status: 'active'
        })
        .lean<ArticleSchema>()

        return articles
    } catch (error) {
        if(error === 'ObjectId'){
            return customError(articleErrors.ArticleIdInvalid)

        }
            return customError(articleErrors.ArticleSomethingWentWrong)

    }
}

export const updatedArticleById = async (articleId: string, doc: ArticleSchema): Promise<boolean> =>{
    try{   
        const result = await Articles
            .updateOne({
                _id:articleId,
                status: {
                    $ne: 'deleted'
                }
            },{
                $set: {
                    ...doc
                }
            })

            if(!result.modifiedCount){
                return customError(articleErrors.ArticleCannotUpdate)

            }
            return true
    } catch (error){
        if (error === 'ObjactId'){
            return customError(articleErrors.ArticleIdInvalid)
        }
        return customError(articleErrors.ArticleSomethingWentWrong)
    }

}

export const softDeleteArticleById = async (articleId: string): Promise<boolean> =>{
    try{
        await Articles
            .findByIdAndUpdate(articleId,{
                $set:{
                    status: 'deleted'
                } 
            })
        return true
    } catch (error){
        return customError(articleErrors.ArticleSomethingWentWrong)

    }
}

export default {
    createNewArticle,
    getArticles,
    getArticleById,
    updatedArticleById,
    softDeleteArticleById
}