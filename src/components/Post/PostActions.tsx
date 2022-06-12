import React, { FC, RefObject, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ChatIcon, HearthFilled, HeartIcon } from '../../../public/icons';
import { PostsService } from '../../API/posts.service';
import { useAuth } from '../../hooks/useAuth';

interface IPostActionsProps {
    postId: string
    likes: string[]
    likesCount: number
    commentsCount: number
}


const PostActions: FC<IPostActionsProps> = ({ postId, likes, likesCount, commentsCount }) => {
    const { user } = useAuth()
    const [isLiked, setIsLiked] = useState(user && likes.includes(user._id))
    const [likesCnt, setLikeCnt] = useState(likesCount)


    const { mutate: mutateLike, isLoading } = useMutation(['toggle like', postId],
        async () => await PostsService.like(postId),
        {
            onSuccess: () => {
                setIsLiked(!isLiked)
                if (isLiked) {
                    setLikeCnt(prev => prev - 1)
                } else {
                    setLikeCnt(prev => prev + 1)
                }
            }

        }
    )

    const onToggleLike = () => {
        mutateLike()
    }


    return (
        <div className="flex items-center gap-5 mt-3 border-b border-gray-300 px-5 py-3">
            <button className="postAction" onClick={onToggleLike} disabled={isLoading || !user}>
                {isLiked
                    ? <HearthFilled className='w-6 h-6 text-red-600' />
                    : <HeartIcon className='w-6 h-6' />}
                {likesCnt > 0 && <span className="font-semibold">{likesCnt}</span>}
            </button>

            <div className="postAction">
                <ChatIcon className='w-6 h-6 text-gray-500' />
                {commentsCount > 0 && <span className="font-semibold">{commentsCount}</span>}
            </div>
        </div>
    );
};

export default PostActions;