import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { IDialog } from '../../../types/dialog.types';

interface IDialogProps {
    item: IDialog
    authId: string
}

const Dialog: FC<IDialogProps> = ({ item, authId }) => {
    const { push } = useRouter()
    const userTo = item.users.filter(u => u._id !== authId)[0]

    const onDialogClick = () => {
        push(`/dialogs/${item._id}`)
    }

    return (
        <li className="py-3 px-5 border-b border-gray-300 flex gap-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={onDialogClick}>
            <div className="w-14 h-14 relative">
                <Image src={userTo.avatar} layout='fill' objectFit='cover' alt="chat user"
                    className='rounded-[50%]' />
            </div>

            <div className="">
                <span className="font-semibold text-[16px]">{userTo.name}</span>
                <p className="text-gray-500 mt-1">
                    {item.latestMessage ? item.latestMessage.text : "Нет сообщений"}
                </p>
            </div>
        </li>
    );
};

export default Dialog;