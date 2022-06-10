import { $authInstance, $instance } from "."
import { IPost } from "../types/post.types"


export class PostsService {

    static async create(formData: FormData) {
        try {
            const { data } = await $authInstance.post('/posts', formData)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async delete(postId: string) {
        try {
            const { data } = await $authInstance.delete(`/posts/${postId}`)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async editPost(postId: string, text: string) {
        try {
            const { data } = await $authInstance.put(`/posts/edit/${postId}`, { text })
            return data
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


    static async getByUser(userId: string): Promise<IPost[]> {
        try {
            const { data } = await $instance.get(`/posts/for/profile/${userId}`)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async like(postId: string) {
        try {
            const { data } = await $authInstance.put(`/posts/like/${postId}`)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async search(searchQuery: string): Promise<IPost[]> {
        try {
            const { data } = await $instance.get("/posts/search", { params: { searchQuery } })
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }
}