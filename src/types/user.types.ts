import { IPost } from "./post.types"


export interface IUser {
    email: string
    name: string
    city: string
    isVerified: boolean
    avatar: string
    followers: IUser[]
    follows: IUser[]
    gender: "male" | 'female'
    birthDate: string
    password: string
    posts: IPost[]
    likes: string[]
    _id: string
}

