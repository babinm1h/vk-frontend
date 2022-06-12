

export interface IRegisterArgs {
    email: string
    password: string
    name: string
}

export interface ILoginArgs {
    email: string
    password: string
}


export interface IEditUserArgs {
    name: string
    city: string
    avatar: string
    birthDate: string
    gender: string
}


export interface ISendMessageArgs {
    text: string,
    senderId: string,
    dialogId: string
}