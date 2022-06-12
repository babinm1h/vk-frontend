import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { ChevronLeftIcon } from '../../../../public/icons';
import { DialogsService } from '../../../API/dialogs.service';
import { useAuth } from '../../../hooks/useAuth';
import { useChat } from '../../../hooks/useChat';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Loader from '../../Loader';
import DialogForm from '../../UI/forms/DialogForm';
import Message from './Message';

const SingleDialog = () => {
    const { query, push } = useRouter()
    const { user } = useAuth()

    const handleGoBack = () => {
        push('/dialogs')
    }

    const { dialog, sendMessage, online, deleteMessage } = useChat(query.id as string)

    const userTo = dialog && dialog.users.filter(u => u._id !== user?._id)[0]

    if (!user) return <></>


    return (
        <MainLayout title="Сообщения">
            <section className='whiteBlock w-full h-full ml-5 overflow-hidden'>
                {!dialog
                    ? <Loader />

                    : <div className="h-full flex flex-col">
                        {userTo && <div className="p-2 border-b border-gray-300 flex items-center justify-between">
                            <button className="text-gray-400 font-semibold flex items-center gap-1"
                                onClick={handleGoBack}>
                                <ChevronLeftIcon className='w-6 h-6' />
                                Назад
                            </button>

                            <span className="font-semibold">{userTo.name}</span>
                            <div className="">{online ? "online" : "offline"}</div>

                            <div className="w-8 h-8 relative">
                                <Image src={userTo.avatar} alt="user" layout='fill' objectFit='cover'
                                    className='rounded-[50%]' />
                            </div>
                        </div>}

                        <ul className="flex-grow h-full flex-auto overflow-y-scroll p-5 gap-5 flex flex-col ">
                            {dialog && dialog.messages.map(m => <Message item={m} key={m._id}
                                deleteMessage={deleteMessage} authId={user._id} />)}
                        </ul>
                        <DialogForm dialogId={query.id as string} sendMessage={sendMessage}
                            userId={user._id} />
                    </div>}

            </section>
        </MainLayout>
    );
};

export default SingleDialog;