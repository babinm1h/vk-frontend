import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Dialogs from '../../src/components/screens/dialogs';

const dialogsPage: NextPage = () => {

    return <Dialogs />
};

export default dialogsPage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isAuth = ctx.req.cookies['vkToken']

    if (!isAuth) {
        return {
            redirect: { destination: '/auth', permanent: false },
        }
    }

    return { props: {} }
}