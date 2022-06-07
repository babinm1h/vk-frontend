import { $authInstance } from "."
import { IGetAllByPost, IGetFirstByPost } from "../types/API.types"
import { IComment } from "../types/comment.types"


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
            const { data } = await $authInstance.delete(`/comments/${commentId}`, { data: { postId } })
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async getFirstByPost(postId: string): Promise<IGetFirstByPost> {
        try {
            const { data } = await $authInstance.get(`/comments/${postId}`)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async getAllByPost(postId: string): Promise<IGetAllByPost> {
        try {
            const { data } = await $authInstance.get(`/comments/all/${postId}`)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }
}