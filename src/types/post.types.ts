import { IComment } from "./comment.types"
import { IUser } from "./user.types"


export interface IPost {
    text: string
    images?: string[]
    user: IUser
    comments: IComment[]
    likes: string[]
    likesCount: number
    commentsCount: number
    createdAt: string
    _id: string
}