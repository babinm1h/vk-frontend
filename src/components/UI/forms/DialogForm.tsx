import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { SendIcon } from '../../../../public/icons';
import { errorCatch } from '../../../../utils/errorCatch';
import { validate } from '../../../../utils/validate';
import { MessagesService } from '../../../API/messages.service';
import { ISendMessageArgs } from '../../../types/arg.types';

interface IDialogFormProps {
    dialogId: string
    sendMessage: (args: ISendMessageArgs) => void
    userId: string
}

interface IForm {
    text: string
}

const DialogForm: FC<IDialogFormProps> = ({ dialogId, sendMessage, userId }) => {
    const { register, handleSubmit, reset } = useForm<IForm>()

    // const { isLoading, error, data, mutate } = useMutation('create message',
    //     async (text: string) => await MessagesService.create(dialogId, text),
    //     {
    //         onSuccess() {
    //             reset()
    //         }
    //     }
    // )

    const onSubmit: SubmitHandler<IForm> = ({ text }) => {
        sendMessage({ text, dialogId, senderId: userId })
        reset()
    }

    return (
        <div className="p-5 border-t border-gray-300 bg-gray-100"
            onSubmit={handleSubmit(onSubmit)}>
            <form action="" className="flex items-center gap-3">
                <input type="text" className="w-full border-gray-300 border p-2 rounded-lg"
                    placeholder='Напишите сообщение...' {...register('text', validate(1, 1000))} />
                <button className="" type='submit'>
                    <SendIcon className='text-gray-400 transition-colors hover:text-gray-500 w-7 h-7 rotate-90' />
                </button>
            </form>
            {/* {!!error && <div className='text-red-600 mt-1'>{errorCatch(error)}</div>} */}
        </div>
    );
};

export default DialogForm;