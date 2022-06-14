import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { getCreationDate } from '../../../utils/time';
import { useAuth } from '../../hooks/useAuth';
import { useModal } from '../../hooks/useModal';
import { usePostComments } from '../../hooks/usePostComments';
import { IPost } from '../../types/post.types';
import Loader from '../Loader';
import AddCommentForm from '../UI/forms/AddCommentForm';
import CommentsList from './CommentsList';
import PostActions from './PostActions';
import PostDots from './PostDots';
import PostModal from './PostModal';

interface IPostProps {
    item: IPost
    refetchPosts: Function
}

const Post: FC<IPostProps> = ({ item, refetchPosts }) => {
    const { user } = useAuth()
    const { push } = useRouter()
    const { isOpen, onClose, onOpen } = useModal()

    const { allComments, data, isAllLoading, isLoading, refetchAllComments, refetchComments }
        = usePostComments(item._id)


    const handleShowMore = () => {
        refetchAllComments()
    }

    const goToProfile = () => {
        push(`/profile/${item.user._id}`)
    }

    return (
        <div className="whiteBlock border">
            <div className="flex px-5 py-3 gap-3 items-center">
                <div className="md:w-14 md:h-14 relative flex-shrink-0 cursor-pointer h-10 w-10"
                    onClick={goToProfile}>
                    <Image src={item.user.avatar} alt="author" layout='fill' objectFit='cover'
                        className='rounded-[50%]' />
                </div>
                <div className="flex flex-col flex-grow">
                    <Link href={`/profile/${item.user._id}`}>
                        <a className="text-primaryBlue hover:underline font-semibold">
                            {item.user.name}
                        </a>
                    </Link>
                    <span className="text-gray-500">{getCreationDate(item.createdAt)}</span>
                </div>
                {item.user._id === user?._id && <PostDots postId={item._id} refetchPosts={refetchPosts} />}
            </div>

            <div className="py-2 px-5">
                <p className="">{item.text}</p>
                {item.image && <img src={item.image} alt="post image" className="w-full h-auto mt-2 object-cover cursor-pointer" onClick={onOpen} />}
            </div>

            <PostActions postId={item._id} likes={item.likes} likesCount={item.likesCount}
                commentsCount={data?.count || 0} />

            {isLoading
                ? <Loader />

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

            {user && <AddCommentForm postId={item._id} refetchAllComments={refetchAllComments} />}

            {isOpen && item.image && <PostModal img={item.image} onClose={onClose} />}
        </div>
    );
};

export default Post;