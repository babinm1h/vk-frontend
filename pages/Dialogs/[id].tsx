import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import SingleDialog from '../../src/components/screens/singleDialog';
import { getTokenCookie } from '../../utils/auth.helper';

const DialogPage: NextPage = () => {
    return <SingleDialog />
};

export default DialogPage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isAuth = ctx.req.cookies['vkToken']

    if (!isAuth) {
        return {
            redirect: { destination: '/auth', permanent: false },
        }
    }

    return { props: {} }
}