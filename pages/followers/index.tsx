import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Followers from '../../src/components/screens/followers';

const followers: NextPage = () => {
    return <Followers />
};

export default followers;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isAuth = ctx.req.cookies['vkToken']

    if (!isAuth) {
        return {
            redirect: { destination: '/auth', permanent: false },
        }
    }

    return { props: {} }
}