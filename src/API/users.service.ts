import { $authInstance, $instance } from "."
import { IEditUserArgs } from "../types/arg.types"
import { IUser } from "../types/user.types"


export class UsersService {

    static async search(searchQuery: string): Promise<IUser[]> {
        try {
            const { data } = await $instance.get(`/user/search/users`, { params: { searchQuery } })
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }

    static async changeStatus(status: string) {
        try {
            const { data } = await $authInstance.post(`/user/change/status`, { status })
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }

    static async getProfile(userId: string): Promise<IUser> {
        try {
            const { data } = await $instance.get(`/user/${userId}`)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async editUser(formData: FormData): Promise<IUser> {
        try {
            const { data } = await $authInstance.put('/user/edit', formData)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async toggleFollow(followUserId: string): Promise<string> {
        try {
            const { data } = await $authInstance.patch(`/user/follow/${followUserId}`)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }
}   