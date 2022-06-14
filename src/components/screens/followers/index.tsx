import React, { useState } from 'react';
import { useFollowersPage } from '../../../hooks/useFollowersPage';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Loader from '../../Loader';
import SearchFollowersForm from '../../UI/forms/SearchFollowersForm';
import FollowedUser from './FollowedUser';


const Followers = () => {

    const { data, isLoading, handleChange, refetch, searchQuery, searchedFollowers } = useFollowersPage()

    return (
        <MainLayout title='Подписчики'>

            <section className="whiteBlock w-full">
                <SearchFollowersForm searchQuery={searchQuery} handleChange={handleChange} refetch={refetch} />
                {isLoading
                    ? <div className='w-full mt-10 text-center'><Loader /></div>
                    : searchedFollowers
                        ? searchedFollowers.map(f => <FollowedUser user={f} key={f._id} />)
                        : data && data.length > 0
                            ? data.map(u => <FollowedUser user={u} key={u._id} />)
                            : <h1 className='text-gray-500 text-xl font-semibold text-center'>
                                У вас нет подписчиков
                            </h1>}
            </section>

        </MainLayout>
    );
};

export default Followers;