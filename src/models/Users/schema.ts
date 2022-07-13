import { Schema, Document , model } from 'mongoose'
import { UsersSchema } from '../../types/models/Users'
const collection = 'Users'

export interface usersSchemaWithDocument extends UsersSchema , Document{

}


const usersSchema = new Schema<usersSchemaWithDocument>({
    username: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    name: {
        type: 'string',
    },
    surname: {
        type: 'string',
    }
},{
    collection,
    versionKey: false,
    timestamps:true

})

export default model(collection,usersSchema)

