import { IPost } from "./post.types"
import { IUser } from "./user.types"



export interface IComment {
    user: IUser
    text: string
    post: IPost
    createdAt: string
    _id: string
}