import Cookies from "js-cookie"

export const setTokenCookie = (token: string) => {
    Cookies.set('vkToken', token)
}

export const removeTokenCookie = () => {
    Cookies.remove('vkToken')
}


export const getTokenCookie = () => {
    return Cookies.get("vkToken")
}