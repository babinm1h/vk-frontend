import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import SidePanel from '../../SidePanel';
import AddPost from '../../UI/forms/AddPost';
import SearchSection from './SearchSection';
import Posts from '../../Post/Posts';
import Loader from '../../Loader';
import { useScrollPagination } from '../../../hooks/useScrollPagination';
import { useAuth } from '../../../hooks/useAuth';


const Home = () => {
    const [section, setSection] = useState(1)
    const { isInitializing } = useAuth()

    const { posts, refetchAll } = useScrollPagination()


    if (isInitializing) {
        return <div className="w-full h-full text-center mt-10"><Loader /></div>
    }

    return (
        <MainLayout title="Новости">
            <div className="grid lg:grid-cols-3 w-full">
                <div className="col-span-2 sm:mx-5 flex flex-col gap-5">
                    {section === 1 ? <>
                        <AddPost refetch={refetchAll} />
                        {posts && <Posts data={posts} refetch={refetchAll} />}
                    </>
                        : <SearchSection />}
                </div>

                <SidePanel setSection={setSection} activeSection={section} />
            </div>
        </MainLayout>
    );
};

export default Home;