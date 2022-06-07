import React from 'react';
import Header from '../../layouts/MainLayout/Header';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import NewsPanel from '../../NewsPanel';
import Post from '../../Post/Post';
import Sidebar from '../../layouts/MainLayout/Sidebar';
import AddPost from '../../UI/forms/AddPost';
import { useQuery } from 'react-query';
import { PostsService } from '../../../API/posts.service';
import { IPost } from '../../../types/post.types';


const Home = () => {

    const { data, isLoading, refetch } = useQuery<IPost[]>('fetch posts',
        async () => await PostsService.getAll(),
        {
            select: (data) => data
        }
    )

    if (isLoading) {
        return <div>loading</div>
    }

    return (
        <MainLayout>
            <div className="grid grid-cols-3 w-full">
                <div className="col-span-2 mx-5 flex flex-col gap-5">
                    <AddPost refetch={refetch} />
                    <ul className="flex flex-col gap-5 pb-5">
                        {data && data.map(i => <Post key={i._id} item={i} />)}
                    </ul>
                </div>

                <NewsPanel />
            </div>
        </MainLayout>
    );
};

export default Home;