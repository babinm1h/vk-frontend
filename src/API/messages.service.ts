import { $authInstance, $instance } from "."
import { IDialog } from "../types/dialog.types"


export class MessagesService {


    static async create(dialogId: string, text: string): Promise<IDialog> {
        try {
            const { data } = await $authInstance.post(`/messages`, { text, dialogId })
            return data

        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }

}   