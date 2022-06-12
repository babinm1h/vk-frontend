import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { XIcon } from '../../../public/icons';
import { getCreationDate } from '../../../utils/time';
import { CommentsService } from '../../API/comments.service';
import { IComment } from '../../types/comment.types';
import { IUser } from '../../types/user.types';

interface ICommentProps {
    item: IComment
    user: IUser | null
    postId: string
    refetchComments: Function
}

const Comment: FC<ICommentProps> = ({ item, user, postId, refetchComments }) => {

    const { mutate, isLoading } = useMutation(['delete comment', item._id],
        async () => await CommentsService.delete(item._id, postId),
        {
            onSuccess: () => {
                refetchComments()
            }
        }
    )

    const handleDelete = () => {
        mutate()
    }


    return (
        <div className="">
            <div className="flex gap-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                    <Image src={item.user.avatar} alt="user" layout='fill' objectFit='cover'
                        className='rounded-[50%]' />
                </div>

                <div className="flex-grow">
                    <Link href={`/profile/${item.user._id}`}>
                        <a className="text-primaryBlue hover:underline font-semibold">
                            {item.user.name}
                        </a>
                    </Link>
                    <p className="">{item.text}</p>
                    <span className="text-gray-500 text-[13px]">{getCreationDate(item.createdAt)}</span>
                </div>

                {user && user._id === item.user._id &&
                    <button disabled={isLoading} onClick={handleDelete}>
                        <XIcon className='w-4 h-4 text-gray-300 hover:text-gray-400 transition-colors' />
                    </button>}
            </div>
        </div>
    );
};

export default Comment;