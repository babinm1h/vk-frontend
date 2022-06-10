import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { PostsService } from '../../../API/posts.service';
import { UsersService } from '../../../API/users.service';
import { useAuth } from '../../../hooks/useAuth';
import CircleUser from '../../CircleUser';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Posts from '../../Post/Posts';
import AddPost from '../../UI/forms/AddPost';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
    const { user } = useAuth()
    const { query, push } = useRouter()


    const { data: userPosts, refetch } = useQuery(['fetch user posts', query.id],
        async () => await PostsService.getByUser(query.id as string),
        {
            enabled: !!query.id,
            select: data => data
        }
    )


    const { data, isLoading } = useQuery(['fetch profile', query.id],
        async () => await UsersService.getProfile(String(query.id)),
        {
            enabled: !!query.id,
            select: data => data
        }
    )

    if (isLoading) {
        return <div>load</div>
    }


    return (
        <MainLayout>
            <section className="flex gap-5 w-full">

                <div className="flex flex-col gap-5">
                    <div className="whiteBlock p-5 self-start">
                        {data && <div className="relative w-[200px] h-[200px]">
                            <Image src={data?.avatar} alt={data?.name} layout='responsive'
                                height={200} width={200} quality={90} className='rounded-md' priority />
                        </div>}

                        <div className="mt-5 w-full flex flex-col">
                            {user && user._id === query.id
                                ? <button className="rounded-md py-1 transition-colors text-gray-500 bg-[#55677d] flex justify-center bg-opacity-10 items-center hover:bg-opacity-20 text-[16px]" onClick={() => push('/profile/edit')}>
                                    Редактировать
                                </button>
                                : <>
                                    <button className='blueBtn mb-3'>Подписаться</button>
                                    <button className='blueBtn'>Написать сообщение</button>
                                </>}
                        </div>
                    </div>

                    {data && data.followers.length > 0 && <div className="whiteBlock p-5">
                        <div className="flex gap-2">
                            <span className="">Подписчики</span>
                            <span className="text-gray-400 font-semibold">{data?.followers.length}</span>
                        </div>
                        <ul className="flex flex-wrap gap-3">
                            {data.followers.map(u => <CircleUser user={u} key={u._id} />)}
                        </ul>
                    </div>}


                    {data && data.follows.length > 0 && <div className="whiteBlock p-5">
                        <div className="flex gap-2">
                            <span className="">Подписки</span>
                            <span className="text-gray-400 font-semibold">{data?.follows.length}</span>
                        </div>
                        <ul className="flex flex-wrap gap-3 mt-3">
                            {data.follows.map(u => <CircleUser user={u} key={u._id} />)}
                        </ul>
                    </div>}
                </div>


                <div className="flex flex-col gap-5 w-full self-start">
                    {data && <ProfileInfo profile={data} />}

                    {user && user._id === query.id && <AddPost refetch={refetch} />}

                    {userPosts && userPosts.length > 0 && <Posts data={userPosts} refetch={refetch} />}
                </div>

            </section>
        </MainLayout>
    );
};

export default Profile;
