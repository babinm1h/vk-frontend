import { IUser } from "./user.types"


export interface IMessage {
    createdAt: string
    _id: string
    text: string
    sender: IUser
}