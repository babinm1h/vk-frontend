import { $authInstance, $instance } from "."
import { IDialog } from "../types/dialog.types"


export class DialogsService {


    static async create(userTo: string): Promise<IDialog> {
        try {
            const { data } = await $authInstance.post(`/dialogs/${userTo}`)
            return data

        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async getAll(): Promise<IDialog[]> {
        try {
            const { data } = await $authInstance.get(`/dialogs`)
            return data

        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }

    static async getOne(dialogId: string): Promise<IDialog> {
        try {
            const { data } = await $authInstance.get(`/dialogs/single/${dialogId}`)
            return data

        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }
}   