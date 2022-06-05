import React from 'react';
import Header from '../../layouts/MainLayout/Header';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import NewsPanel from '../../NewsPanel';
import Post from '../../Post';
import Sidebar from '../../layouts/MainLayout/Sidebar';
import AddPost from '../../UI/forms/AddPost';


const Home = () => {
    
    return (
        <MainLayout>
            <div className="grid grid-cols-3 w-full">
                <div className="col-span-2 mx-5 flex flex-col gap-5">
                    <AddPost />
                    <ul className="flex flex-col gap-5">
                        <Post />
                        <Post />
                        <Post />
                    </ul>
                </div>

                <NewsPanel />
            </div>
        </MainLayout>
    );
};

export default Home;