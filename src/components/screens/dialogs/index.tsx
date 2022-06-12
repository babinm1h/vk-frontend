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
        <MainLayout title="Диалоги">

            <section className="whiteBlock h-full w-full">
                {isLoading
                    ? <Loader />
                    : <ul className='flex flex-col'>
                        {data && data.length > 0 ? data.map(d =>
                            <Dialog key={d._id} item={d} authId={user?._id || ''} />)

                            : <h1 className='text-gray-500 text-xl text-center mt-5'>У вас нет диалогов</h1>}
                    </ul>}
            </section>

        </MainLayout>
    );
};

export default Dialogs;