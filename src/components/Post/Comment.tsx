import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { IComment } from '../../types/comment.types';

interface ICommentProps {
    item: IComment
}

const Comment: FC<ICommentProps> = ({ item }) => {
    return (
        <div className="">
            <div className="flex gap-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                    <Image src={item.user.avatar} alt="user" layout='fill' objectFit='cover'
                        className='rounded-[50%]' />
                </div>

                <div className="">
                    <Link href={`/profile/${item.user._id}`}>
                        <a className="text-primaryBlue hover:underline font-semibold">
                            {item.user.name}
                        </a>
                    </Link>
                    <p className="">{item.text}</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;