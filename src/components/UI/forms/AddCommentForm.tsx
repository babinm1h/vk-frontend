import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { SendIcon } from '../../../../public/icons';
import { validate } from '../../../../utils/validate';
import { CommentsService } from '../../../API/comments.service';

interface IForm {
    text: string
}


interface IAddCommentFormProps {
    refetchAllComments: Function
    postId: string
}

const AddCommentForm: FC<IAddCommentFormProps> = ({ postId, refetchAllComments }) => {

    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IForm>({
        mode: "onChange"
    })

    const { mutate, isLoading } = useMutation(['create comment', postId],
        async (text: string) => await CommentsService.create(text, postId),
        {
            onSuccess: () => {
                reset()
                refetchAllComments()
            }
        }
    )


    const onSubmit: SubmitHandler<IForm> = ({ text }) => {
        mutate(text)
    }

    return (
        <div className="py-3 px-5">
            <form action="" className="gap-3 flex items-center" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                    placeholder='Написать комментарий...' {...register('text', validate(1, 400))}
                    autoComplete="off" />

                <button type="submit" className='disabled:text-gray-200 text-gray-400 rotate-90'
                    disabled={!isValid || isLoading}>
                    <SendIcon className='w-7 h-7' />
                </button>
            </form>
        </div>
    );
};

export default AddCommentForm;  