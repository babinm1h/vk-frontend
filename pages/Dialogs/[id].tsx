import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import SingleDialog from '../../src/components/screens/singleDialog';

const dialogPage: NextPage = () => {
    return <SingleDialog />
};

export default dialogPage;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isAuth = ctx.req.cookies['vkToken']

    if (!isAuth) {
        return {
            redirect: { destination: '/auth', permanent: false },
        }
    }

    return { props: {} }
}