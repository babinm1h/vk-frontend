import React, { useState } from 'react';
import Header from '../../layouts/MainLayout/Header';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import SidePanel from '../../SidePanel';
import Post from '../../Post/Post';
import Sidebar from '../../layouts/MainLayout/Sidebar';
import AddPost from '../../UI/forms/AddPost';
import { useQuery } from 'react-query';
import { PostsService } from '../../../API/posts.service';
import { IPost } from '../../../types/post.types';
import SearchSection from './SearchSection';
import Posts from '../../Post/Posts';
import Loader from '../../Loader';


const Home = () => {
    const [section, setSection] = useState(1)

    const { data, isLoading, refetch } = useQuery<IPost[]>('fetch posts',
        async () => await PostsService.getAll(),
        {
            select: (data) => data
        }
    )

    if (isLoading) {
        return <div className="w-full h-full text-center mt-10"><Loader /></div>
    }

    return (
        <MainLayout title="Новости">
            <div className="grid lg:grid-cols-3 w-full">
                <div className="col-span-2 sm:mx-5 flex flex-col gap-5">
                    {section === 1 ? <>
                        <AddPost refetch={refetch} />
                        {data && <Posts data={data} refetch={refetch} />}
                    </>
                        : <SearchSection />}
                </div>

                <SidePanel setSection={setSection} activeSection={section} />
            </div>
        </MainLayout>
    );
};

export default Home;