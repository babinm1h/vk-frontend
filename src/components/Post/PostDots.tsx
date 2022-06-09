import React, { FC } from 'react';
import { useMutation, useQuery } from 'react-query';
import { DotsHorizontal } from '../../../public/icons';
import { PostsService } from '../../API/posts.service';


interface IPostDots {
    postId: string
    refetchPosts: Function
}

const PostDots: FC<IPostDots> = ({ postId, refetchPosts }) => {


    const { mutate, isLoading } = useMutation(['delete post', postId],
        async () => PostsService.delete(postId),
        {
            onSuccess: () => {
                refetchPosts()
            }
        }
    )

    const handleDelete = () => {
        mutate()
    }

    return (
        <div className='relative group'>
            <DotsHorizontal className='w-6 h-6 text-gray-400 cursor-pointer' />
            <div className="absolute shadow-bigShadow whiteBlock right-0 top-6 group-hover:opacity-100 opacity-0 transition-all">
                <ul className="">
                    <li className="py-2 px-5 hover:bg-gray-200 cursor-pointer transition-colors">
                        <button disabled={isLoading} onClick={handleDelete}>Удалить</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PostDots;