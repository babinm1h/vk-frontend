import { $authInstance, $instance } from "."


export class PostsService {

    static async create(text: string) {
        try {
            const { data } = await $authInstance.post('/posts', { text })
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async delete() {
        try {

        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async change() {
        try {

        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async getAll() {
        try {
            const { data } = await $instance.get("/posts")
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }
    
}