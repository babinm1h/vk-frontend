import { $authInstance } from "."


export class CommentsService {

    static async create(text: string, post: string) {
        try {
            const { data } = await $authInstance.post("/comments", { post, text })
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async delete(commentId: string, postId: string) {
        try {
            const { data } = await $authInstance.post(`/comments/${commentId}`, { postId })
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }
}