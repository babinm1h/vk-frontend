import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Dialogs from '../../src/components/screens/dialogs';

const DialogsPage: NextPage = () => {

    return <Dialogs />
};

export default DialogsPage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isAuth = ctx.req.cookies['vkToken']

    if (!isAuth) {
        return {
            redirect: { destination: '/auth', permanent: false },
        }
    }

    return { props: {} }
}