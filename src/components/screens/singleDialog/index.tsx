import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { ChevronLeftIcon } from '../../../../public/icons';
import { DialogsService } from '../../../API/dialogs.service';
import { useAuth } from '../../../hooks/useAuth';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Loader from '../../Loader';
import DialogForm from '../../UI/forms/DialogForm';
import Message from './Message';

const SingleDialog = () => {
    const { query, push } = useRouter()
    const { user } = useAuth()

    const { isLoading, data, refetch } = useQuery(['fetch dialog', query.id],
        async () => await DialogsService.getOne(query.id as string),
        {
            enabled: !!query.id,
            select: data => data,
            retry: false
        }
    )

    const handleGoBack = () => {
        push('/dialogs')
    }

    const userTo = data && data.users.filter(u => u._id !== user?._id)[0]

    return (
        <MainLayout>
            <section className='whiteBlock w-full h-full ml-5 overflow-hidden'>
                {isLoading
                    ? <Loader />

                    : <div className="h-full flex flex-col">
                        {userTo && <div className="p-2 border-b border-gray-300 flex items-center justify-between">
                            <button className="text-gray-400 font-semibold flex items-center gap-1"
                                onClick={handleGoBack}>
                                <ChevronLeftIcon className='w-6 h-6' />
                                Назад
                            </button>

                            <span className="font-semibold">{userTo.name}</span>

                            <div className="w-8 h-8 relative">
                                <Image src={userTo.avatar} alt="user" layout='fill' objectFit='cover'
                                    className='rounded-[50%]' />
                            </div>
                        </div>}

                        <ul className="flex-grow h-full flex-auto overflow-y-scroll p-5 gap-5 flex flex-col ">
                            {data && data.messages.map(m => <Message item={m} key={m._id} />)}
                        </ul>
                        <DialogForm dialogId={query.id as string} refetch={refetch} />
                    </div>}

            </section>
        </MainLayout>
    );
};

export default SingleDialog;