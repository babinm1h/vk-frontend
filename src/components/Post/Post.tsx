import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { getCreationDate } from '../../../utils/time';
import { CommentsService } from '../../API/comments.service';
import { useAuth } from '../../hooks/useAuth';
import { IPost } from '../../types/post.types';
import AddCommentForm from '../UI/forms/AddCommentForm';
import Comment from './Comment';
import CommentsList from './CommentsList';
import PostActions from './PostActions';
import PostDots from './PostDots';

interface IPostProps {
    item: IPost
    refetchPosts: Function
}

const Post: FC<IPostProps> = ({ item, refetchPosts }) => {
    const { user } = useAuth()

    const { refetch: refetchComments, isLoading, data } = useQuery(['fetch first comments', item._id],
        async () => await CommentsService.getFirstByPost(item._id),
        {
            enabled: !!item._id,
            select: data => data,
            retry: 0
        }
    )

    const { refetch: refetchAllComments, isLoading: isAllLoading, data: allComments } =
        useQuery(['fetch first comments', item._id],
            async () => await CommentsService.getAllByPost(item._id),
            {
                enabled: false,
                select: data => data,
            }
        )


    const handleShowMore = () => {
        refetchAllComments()
    }

    return (
        <div className="whiteBlock border">
            <div className="flex px-5 py-3 gap-3 items-center">
                <div className="w-14 h-14 relative flex-shrink-0">
                    <Image src={item.user.avatar} alt="author" layout='fill' objectFit='cover'
                        className='rounded-[50%]' />
                </div>
                <div className="flex flex-col flex-grow">
                    <Link href={`/profile/${item.user._id}`}>
                        <a className="text-primaryBlue hover:underline font-semibold">
                            {item.user.name}
                        </a>
                    </Link>
                    <span className="text-gray-400">{getCreationDate(item.createdAt)}</span>
                </div>
                {item.user._id === user?._id && <PostDots postId={item._id} refetchPosts={refetchPosts} />}
            </div>

            <div className="py-2 px-5">
                <p className="">{item.text}</p>
                {item.image && <div className="relative w-full h-[350px]">
                    <Image src={item.image} layout="fill" objectFit="contain" alt='pic' />
                </div>}
            </div>

            <PostActions postId={item._id} likes={item.likes} likesCount={item.likesCount}
                commentsCount={data?.count || 0} />

            {isLoading
                ? <div>load</div>

                : allComments?.comments && allComments.count > 0
                    ? <div className="px-5 py-3">
                        <CommentsList comments={allComments.comments} refetchComments={refetchComments}
                            postId={item._id} user={user} />
                    </div>

                    : data?.firstComments && data.firstComments.length > 0 && <div className="px-5 py-3">
                        <CommentsList comments={data.firstComments} refetchComments={refetchComments}
                            postId={item._id} user={user} />
                        {data.count > data.firstComments.length &&
                            <button className='text-primaryBlue hover:underline mt-2 font-semibold'
                                onClick={handleShowMore} disabled={isAllLoading}>
                                Показать следующие комментарии
                            </button>}
                    </div>}

            <AddCommentForm postId={item._id} refetchAllComments={refetchAllComments} />
        </div>
    );
};

export default Post;