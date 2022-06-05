import React, { useRef, useState, useEffect, SetStateAction, Dispatch, MutableRefObject } from "react";

interface useOutsideClick {
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>,
    ref: MutableRefObject<any>
}

export const useOutsideClick = (initState: boolean): useOutsideClick => {
    const [isVisible, setIsVisible] = useState(initState)
    const ref = useRef<any>()

    const handleClick = (e: MouseEvent) => {
        if (e.which === 1 && ref.current && !ref.current.contains(e.target)) {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        if (isVisible) {
            document.body.addEventListener('mousedown', handleClick)
        }

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [isVisible])

    return { isVisible, setIsVisible, ref }
}