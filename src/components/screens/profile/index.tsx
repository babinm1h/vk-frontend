import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useProfile } from '../../../hooks/useProfile';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Posts from '../../Post/Posts';
import AddPost from '../../UI/forms/AddPost';
import ProfileInfo from './ProfileInfo';
import UsersBlock from '../../UsersBlock';
import Loader from '../../Loader';

const Profile = () => {
    const { user } = useAuth()
    const { query, push } = useRouter()

    const { IsPostsLoading, data, refetch,
        userPosts, isLoading, refetchPosts,
        dialogMutate, followMutate, isFollowing } = useProfile(query.id as string)

    const onToggleFollow = () => {
        followMutate()
    }

    const isInFollows = data?.followers.some(u => u._id === user?._id)

    const handleDialog = () => {
        dialogMutate()
    }

    if (isLoading) {
        return <div className='w-full h-full text-center mt-10'><Loader /></div>
    }

    return (
        <MainLayout title={data?.name || "Профиль"}>
            <section className="sm:flex gap-5 w-full">

                <div className="flex flex-col gap-5">
                    <div className="whiteBlock p-5 self-start w-full">
                        {data && <div className="relative lg:w-[200px] lg:h-[200px] h-[100px] w-[100px] mx-auto">
                            <Image src={data?.avatar} alt={data?.name} layout='fill'
                                className='rounded-md' priority objectFit='cover' />
                        </div>}

                        {user && <div className="mt-5 w-full flex flex-col">
                            {user && user._id === query.id
                                ? <button className="rounded-md py-1 transition-colors text-gray-500 bg-[#55677d] flex justify-center bg-opacity-10 items-center hover:bg-opacity-20 text-[16px]" onClick={() => push('/profile/edit')}>
                                    Редактировать
                                </button>
                                : <>
                                    {isInFollows
                                        ? <button className='blueBtn bg-gray-300 text-gray-600 mb-3'
                                            onClick={onToggleFollow} disabled={isFollowing}>
                                            Отписаться
                                        </button>
                                        : <button className='blueBtn mb-3' onClick={onToggleFollow}
                                            disabled={isFollowing}>
                                            Подписаться
                                        </button>}
                                    <button className='blueBtn' onClick={handleDialog}>
                                        Написать сообщение
                                    </button>
                                </>}
                        </div>}
                    </div>

                    {data && data.followers.length > 0 && <UsersBlock users={data.followers}
                        title="Подписчики" />}

                    {data && data.follows.length > 0 && <UsersBlock title="Подписки" users={data.follows} />}
                </div>


                <div className="flex flex-col gap-5 w-full self-start">
                    {data && <ProfileInfo profile={data} refetch={refetch} user={user} />}

                    {user && user._id === query.id && <AddPost refetch={refetchPosts} />}

                    {IsPostsLoading
                        ? <Loader />
                        : userPosts && userPosts.length > 0 && <Posts data={userPosts} refetch={refetchPosts} />
                    }
                </div>

            </section>
        </MainLayout>
    );
};

export default Profile;
