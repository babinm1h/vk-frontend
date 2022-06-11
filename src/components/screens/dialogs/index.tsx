import React from 'react';
import { useQuery } from 'react-query';
import { DialogsService } from '../../../API/dialogs.service';
import { useAuth } from '../../../hooks/useAuth';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Loader from '../../Loader';
import Dialog from './Dialog';

const Dialogs = () => {
    const { user } = useAuth()

    const { data, isLoading, refetch } = useQuery('fetch dialogs', async () => await DialogsService.getAll(),
        {
            select: data => data,
            enabled: !!user
        }
    )

    return (
        <MainLayout>

            <section className="whiteBlock h-full w-full">
                {isLoading
                    ? <Loader />
                    : <ul className='flex flex-col'>
                        {data && data.map(d =>
                            <Dialog key={d._id} item={d} authId={user?._id || ''} />)}
                    </ul>}
            </section>

        </MainLayout>
    );
};

export default Dialogs;