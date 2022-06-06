import { IPost } from "./post.types"


export interface IUser {
    email: string
    name: string
    city: string
    isVerified: boolean
    avatar: string
    followers: string[] | IUser[]
    follows: string[]
    gender: "male" | 'female'
    birthDate: string
    password: string
    posts: IPost[]
    likes: string[]
    _id: string
}

