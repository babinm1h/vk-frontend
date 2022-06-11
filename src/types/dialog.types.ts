import { IMessage } from "./message.type"
import { IUser } from "./user.types"


export interface IDialog {
    _id: string
    users: IUser[]
    latestMessage?: IMessage
    messages: IMessage[]
}