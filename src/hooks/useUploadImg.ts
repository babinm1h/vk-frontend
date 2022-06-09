import { useState } from "react"


export interface IUseUploadImageReturn {
    resetFiles: () => void;
    handleImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
    preview: string | null;
    img: File | null;
}

export const useUploadImage = (): IUseUploadImageReturn => {
    const [img, setImg] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (e.target.files && e.target.files[0]) {
            setImg(e.target.files[0])
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (ev) => {
            setPreview(ev.target?.result as string)
        }
    }

    const resetFiles = () => {
        setImg(null)
        setPreview(null)
    }

    return { resetFiles, handleImg, preview, img }
}