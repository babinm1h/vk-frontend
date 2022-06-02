import React from 'react';
import { CameraIcon } from '../../../../public/icons'
import { SubmitHandler, useForm } from "react-hook-form"

interface IForm {
    text: string
}

const AddPost = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IForm>()

    const onSubmit: SubmitHandler<IForm> = ({ text }) => {

    }

    return (
        <div className="whiteBlock p-5">
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-5 border-b border-gray-300 mb-5">
                    <div className="border-gray-300 border rounded-[50%] h-10 w-10"></div>
                    <input type="text" className="w-full h-20 text-[16px]" />
                </div>

                <div className="flex items-center gap-5">
                    <button type="submit" className='blueBtn self-end'>
                        Опубликовать
                    </button>
                    <label htmlFor="file" className="cursor-pointer">
                        <CameraIcon className='text-gray-400 w-6 h-6' />
                        <input type="file" id="file" className='hidden' />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default AddPost;