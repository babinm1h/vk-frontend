import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { ChatIcon, HeartIcon } from '../../../public/icons';
import { getCreationDate } from '../../../utils/time';
import { IPost } from '../../types/post.types';
import Comment from './Comment';
import PostActions from './PostActions';

interface IPostProps {
    item: IPost
}

const Post: FC<IPostProps> = ({ item }) => {
    return (
        <div className="whiteBlock">
            <div className="flex px-5 py-3 gap-3 items-center">
                <div className="w-14 h-14 relative flex-shrink-0">
                    <Image src={item.user.avatar} alt="author" layout='fill' objectFit='cover'
                        className='rounded-[50%]' />
                </div>
                <div className="flex flex-col">
                    <Link href={`/profile/${item.user._id}`}>
                        <a className="text-primaryBlue hover:underline font-semibold">
                            {item.user.name}
                        </a>
                    </Link>
                    <span className="text-gray-400">{getCreationDate(item.createdAt)}</span>
                </div>
            </div>

            <div className="py-2 px-5">
                <p className="">{item.text}</p>
            </div>

            <PostActions likesCount={item.likesCount} commentsCount={item.commentsCount} />

            {item.comments.length > 0 && <div className="px-5 py-3">
                <ul className="flex flex-col gap-3">
                    {item.comments.map(c => <Comment key={c._id} item={c} />)}
                </ul>
            </div>}
        </div>
    );
};

export default Post;