import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { UsersSchema } from '../../types/models/Users'
import { AuthLoginBodyResponse } from '../../types/handlers/auth'
import Users, {usersSchemaWithDocument} from './schema'
import customError from '../../utils/custom-error'
import authError from '../../errors/auth'
import config from '../../config'

const genPassword = (password: string): string =>{
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password , salt)

    return hashPassword
}

const comparePassword = (password: string, existsPassword: string): boolean=>{
    const isPasswordCorrect = bcrypt.compareSync(password, existsPassword)
    if(!isPasswordCorrect){
        throw customError(authError.AuthInvalidPassword)
    }
    return true
}

export const genAccessToken =(userId: string): string =>{
    const token = jwt.sign({}, config.secret.accessToken ,{
        expiresIn:60*5,
        audience:String(userId)
    })

    return token
}

const mapUserResponseObject = (userId: string, user: usersSchemaWithDocument, accessToken?: string):AuthLoginBodyResponse =>{
    const response: AuthLoginBodyResponse= {
        id: userId,
        username: user.username,
        email: user.email,
        name: user.name, 
        surname: user.surname,
        accessToken

    }
    return response
}

export const createNewUser = async (doc: UsersSchema):Promise<usersSchemaWithDocument> =>{
    doc.password = genPassword(doc.password)

    const user = new Users(doc)

    return user.save()
}

export const userLogin = async (username: string, password: string):Promise<AuthLoginBodyResponse> =>{
    const user = await Users.findOne({
        username
    })

    if(!user){
        throw customError(authError.AuthInvalidUsername)
    }

    comparePassword(password, user.password)

    const userId = user._id

    const accessToken = genAccessToken(userId)

    const response: AuthLoginBodyResponse= {
        id: userId,
        username: user.username,
        email: user.email,
        name: user.name, 
        surname: user.surname,
        accessToken

    }

    return response
}

export const getUserById = async(userId: string): Promise<AuthLoginBodyResponse> =>{
    const user = await Users.findById(userId)

    const response: AuthLoginBodyResponse = mapUserResponseObject(userId,user!)

    return response
}




export default {
    createNewUser,
    userLogin,
    getUserById,
    genAccessToken
}