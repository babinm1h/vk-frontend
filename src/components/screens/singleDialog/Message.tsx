import Image from 'next/image';
import React, { FC } from 'react';
import { getCreationDate } from '../../../../utils/time';
import { IMessage } from '../../../types/message.type';

interface IMessageProps {
    item: IMessage
}

const Message: FC<IMessageProps> = ({ item }) => {
    return (
        <li className="flex gap-3 jus">
            <div className="relative w-10 h-10 flex-shrink-0">
                <Image src={item.sender.avatar} alt="sender" className='rounded-[50%]' layout='fill'
                    objectFit='cover' />
            </div>

            <div className="">
                <div className="flex gap-2">
                    <span className="text-primaryBlue hover:underline font-semibold">
                        {item.sender.name}
                    </span>
                    <span className="text-gray-400">{getCreationDate(item.createdAt)}</span>
                </div>
                <p className="">{item.text}</p>
            </div>
        </li>
    );
};

export default Message;