import { IUser } from "../types/user.types";

export enum AllActions {
    REGISTER_PENDING = 'AUTH/REGISTER_PENDING',
    REGISTER_FULLFILLED = 'AUTH/REGISTER_FULLFILLED',
    REGISTER_ERROR = 'AUTH/REGISTER_ERROR',

    LOGIN_PENDING = 'AUTH/LOGIN_PENDING',
    LOGIN_FULLFILLED = 'AUTH/LOGIN_FULLFILLED',
    LOGIN_ERROR = 'AUTH/LOGIN_ERROR',

    GETAUTH_PENDING = 'AUTH/GETAUTH_PENDING',
    GETAUTH_FULLFILLED = 'AUTH/GETAUTH_FULLFILLED',
    GETAUTH_ERROR = 'AUTH/GETAUTH_ERROR',

    LOGOUT = 'AUTH/LOGOUT'
}


export interface IState {
    user: null | IUser
    isInitializing: boolean
    isSubmitting: boolean
    logError: string
    regError: string
    refetchAuth: Function
}


export interface IRegisterPending {
    type: AllActions.REGISTER_PENDING
}
export interface IRegisterFullfilled {
    type: AllActions.REGISTER_FULLFILLED,
    payload: IUser
}
export interface IRegisterError {
    type: AllActions.REGISTER_ERROR,
    payload: string
}


export interface ILoginPending {
    type: AllActions.LOGIN_PENDING
}
export interface ILoginFullfilled {
    type: AllActions.LOGIN_FULLFILLED,
    payload: IUser
}
export interface ILoginError {
    type: AllActions.LOGIN_ERROR,
    payload: string
}

export interface IGetauthPending {
    type: AllActions.GETAUTH_PENDING
}
export interface IGetauthFullfilled {
    type: AllActions.GETAUTH_FULLFILLED,
    payload: IUser
}
export interface IGetauthError {
    type: AllActions.GETAUTH_ERROR,
    payload: string
}


export interface ILogout {
    type: AllActions.LOGOUT,
}



export type ActionTypes = ILogout | IGetauthError | IGetauthFullfilled | IGetauthPending |
    ILoginError | ILoginFullfilled | ILoginPending |
    IRegisterError | IRegisterFullfilled | IRegisterPending



export interface IActionCreators {
    loginFullfilled: (user: IUser) => void
    loginPending: () => void
    loginError: (err: string) => void

    registerFullfilled: (user: IUser) => void
    registerPending: () => void
    registerError: (err: string) => void

    getAuthFullfilled: (user: IUser) => void
    getAuthPending: () => void
    getAuthError: (err: string) => void

    logout: () => void
}


export type TAuthContext = IState & IActionCreators