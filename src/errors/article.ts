import { CustomErrorParams } from '../utils/custom-error'

export const ArticleSomethingWentWrong: CustomErrorParams ={
    message: 'Something went wrong',
    code: '000001',
    statusCode:400
}

export const ArticleIdInvalid: CustomErrorParams ={
    message: 'Object ID invalid',
    code: '000002',
    statusCode:400
}

export const ArticleCannotUpdate: CustomErrorParams ={
    message: 'Object ID invalid',
    code: '000002',
    statusCode:400
}

export default{
    ArticleIdInvalid,
    ArticleSomethingWentWrong,
    ArticleCannotUpdate
}