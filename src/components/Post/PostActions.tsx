import React, { FC } from 'react';
import { ChatIcon, HeartIcon } from '../../../public/icons';

interface IPostActionsProps {
    likesCount: number
    commentsCount: number
}

const PostActions: FC<IPostActionsProps> = ({ likesCount, commentsCount }) => {


    return (
        <div className="flex items-center gap-5 mt-3 border-b border-gray-300 px-5 py-3">
            <div className="postAction">
                <HeartIcon className='w-6 h-6' />
                {likesCount > 0 && <span className="font-semibold">{likesCount}</span>}
            </div>
            <div className="postAction">
                <ChatIcon className='w-6 h-6 text-gray-500' />
                {commentsCount > 0 && <span className="font-semibold">{commentsCount}</span>}
            </div>
        </div>
    );
};

export default PostActions;