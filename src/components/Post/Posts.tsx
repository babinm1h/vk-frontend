import React, { FC } from 'react';
import { IPost } from '../../types/post.types';
import Post from './Post';


interface IPostsProps {
    data: IPost[]
    refetch: Function
}

const Posts: FC<IPostsProps> = ({ data, refetch }) => {

    return (
        <ul className="flex flex-col gap-5 pb-5">
            {data.map(i => <Post key={i._id} item={i} refetchPosts={refetch} />)}
        </ul>
    );
};

export default Posts;