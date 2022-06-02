import React from 'react';
import Header from '../../Header';
import NewsPanel from '../../NewsPanel';
import Post from '../../Post';
import Sidebar from '../../Sidebar';
import AddPost from '../../UI/forms/AddPost';


const Home = () => {
    return (
        <div className="w-full h-full px-5">
            <Header />

            <div className="flex w-full mt-20 h-full">
                <Sidebar />

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
            </div>

        </div>
    );
};

export default Home;