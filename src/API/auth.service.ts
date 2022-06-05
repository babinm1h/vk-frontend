import { $authInstance, $instance } from ".";
import { setTokenCookie } from "../../utils/auth.helper";
import { ILoginArgs, IRegisterArgs } from "../types/arg.types";
import { IUser } from "../types/user.types";

export interface IAuthResponse {
    user: IUser
    token: string
}


export class AuthService {

    static async register(args: IRegisterArgs): Promise<IAuthResponse> {
        try {
            const { data } = await $instance.post<IAuthResponse>('auth/local/register', { ...args })
            setTokenCookie(data.token)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }

    static async login(args: ILoginArgs): Promise<IAuthResponse> {
        try {
            const { data } = await $instance.post<IAuthResponse>('auth/local/login', { ...args })
            setTokenCookie(data.token)
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


    static async getAuth(): Promise<IUser> {
        try {
            const { data } = await $authInstance.get('auth/local/get-auth')
            return data
        } catch (err: any) {
            throw Error(err.response?.data?.message)
        }
    }


}