import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { TrashIcon } from '../../../../public/icons';
import { getCreationDate } from '../../../../utils/time';
import { IMessage } from '../../../types/message.type';

interface IMessageProps {
    item: IMessage
    deleteMessage: (messageId: string) => void
    authId: string
}

const Message: FC<IMessageProps> = ({ item, deleteMessage, authId }) => {
    const { push } = useRouter()

    const goToProfile = () => {
        push(`/profile/${item.sender._id}`)
    }

    const handleDelete = () => {
        deleteMessage(item._id)
    }

    const isMyMessage = item.sender._id === authId;

    return (
        <li className="flex gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0 cursor-pointer" onClick={goToProfile}>
                <Image src={item.sender.avatar} alt="sender" className='rounded-[50%]' layout='fill'
                    objectFit='cover' />
            </div>

            <div className="w-full">
                <div className="flex gap-2 items-center">
                    <span className="text-primaryBlue hover:underline font-semibold cursor-pointer"
                        onClick={goToProfile}>
                        {item.sender.name}
                    </span>
                    <span className="text-gray-400 flex-grow">
                        {getCreationDate(item.createdAt)}
                    </span>
                    {isMyMessage && <TrashIcon className='group-hover:opacity-100 opacity-0 w-4 h-4 text-gray-400 mt-[2px] hover:text-gray-500 transition-all cursor-pointer' onClick={handleDelete} />}
                </div>
                <p className="">{item.text}</p>
            </div>
        </li>
    );
};

export default Message;