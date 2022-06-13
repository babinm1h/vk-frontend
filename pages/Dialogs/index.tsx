import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Dialogs from '../../src/components/screens/dialogs';
import { getTokenCookie } from '../../utils/auth.helper';

const dialogs: NextPage = () => {



    return <Dialogs />
};

export default dialogs;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isAuth = ctx.req.cookies['vkToken']

    if (!isAuth) {
        return {
            redirect: { destination: '/auth', permanent: false },
        }
    }

    return { props: {} }
}