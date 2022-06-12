import { IPost } from "./post.types"


export interface IUser {
    email: string
    name: string
    country?: string
    isVerified: boolean
    avatar: string
    followers: IUser[]
    follows: IUser[]
    gender?: string
    birthDate?: string
    password: string
    posts: IPost[]
    likes: string[]
    _id: string
    status?: string
}

