import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import { ISendMessageArgs } from "../types/arg.types"
import { IDialog } from "../types/dialog.types"



const SERVER_URL = 'http://localhost:80'


export const useChat = (dialogId: string) => {
    const [dialog, setDialog] = useState<IDialog | null>(null)

    const [socket, setSocket] = useState<Socket | null>(null)

    const [online, setOnline] = useState(false)

    useEffect(() => {
        if (dialogId) {
            const newSocket = io(SERVER_URL, {
                query: { dialogId }
            })

            setSocket(newSocket)

            return () => {
                newSocket.close()
            }
        }

    }, [dialogId, setSocket])



    useEffect(() => {
        if (!socket || !dialogId) return;

        socket.emit('message:get', { dialogId })

        socket.on("dialog", dialog => setDialog(dialog))

        socket.on("connect", () => {
            socket.emit("room:join", { dialogId })
        })

        socket.on("room:joined", (room) => {
            console.log(room, 'conn');
            setOnline(true)
        })

        socket.on('room:left', (room) => {
            console.log(room, 'left');
            setOnline(false)
        })

        return () => {
            socket.on("connect", () => {
                socket.emit("room:leave", { dialogId })
            })
            socket.disconnect()
        }

    }, [dialogId, socket])


    const sendMessage = (args: ISendMessageArgs) => {
        socket?.emit("message:send", args)
    }


    return { sendMessage, dialog, online }
}
