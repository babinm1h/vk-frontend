

export const errorCatch = (err: any): string => {
    if (err.response && err.response.data) {
        return err.response.data.message
    }
    return err.message
}