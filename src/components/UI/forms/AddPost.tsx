import React, { FC } from 'react';
import { CameraIcon } from '../../../../public/icons'
import { SubmitHandler, useForm } from "react-hook-form"
import { useAuth } from '../../../hooks/useAuth';
import Image from 'next/image';
import { useMutation } from 'react-query';
import { PostsService } from '../../../API/posts.service';
import { IPost } from '../../../types/post.types';
import { validate } from '../../../../utils/validate';
import { errorCatch } from '../../../../utils/errorCatch';

interface IForm {
    text: string
}

interface IAddPostProps {
    refetch: Function
}

const AddPost: FC<IAddPostProps> = ({ refetch }) => {
    const { user } = useAuth()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IForm>()

    const { mutate, isLoading, error } = useMutation<IPost, Error, string>('add post',
        async (text) => await PostsService.create(text),
        {
            onSuccess: () => {
                refetch()
                reset()
            }
        }
    )


    const onSubmit: SubmitHandler<IForm> = ({ text }) => {
        mutate(text)
    }

    if (!user) return <></>

    return (
        <div className="whiteBlock px-5 py-3">
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-3 border-b border-gray-300 mb-5">
                    <div className="relative h-10 w-10">
                        <Image src={user?.avatar} alt='user' layout='fill' className='rounded-[50%] ' />
                    </div>
                    <input type="text" className={`w-full h-20 text-[16px] ${error || errors.text && 'placeholder:text-red-600'}`}
                        {...register('text', validate(1, 500))}
                        placeholder='Что у вас нового?' autoComplete='off' />
                </div>

                <div className="flex items-center gap-5">
                    <button type="submit" className='blueBtn self-end' disabled={isLoading}>
                        Опубликовать
                    </button>
                    <label htmlFor="file" className="cursor-pointer">
                        <CameraIcon className='text-gray-400 w-6 h-6' />
                        <input type="file" id="file" className='hidden' />
                    </label>
                </div>

                {errors.text && <div className='text-red-600 my-1  text-xs'>{errors.text.message}</div>}
                {error && <div className='text-red-600 my-1 text-xs'>{errorCatch(error)}</div>}
            </form>
        </div>
    );
};

export default AddPost;