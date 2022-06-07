import axios from "axios";
import Cookies from "js-cookie"

export const $instance = axios.create({
    baseURL: process.env.SERVER_URL,
    withCredentials: true
})


export const $authInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.SERVER_URL
})




$authInstance.interceptors.request.use((config) => {
    const token = Cookies.get('vkToken')
    if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

