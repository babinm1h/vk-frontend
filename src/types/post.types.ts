import { IComment } from "./comment.types"
import { IUser } from "./user.types"


export interface IPost {
    text: string
    image: string
    user: IUser
    likes: string[]
    likesCount: number
    createdAt: string
    _id: string
}