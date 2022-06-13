import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Followers from '../../src/components/screens/followers';
import { getTokenCookie } from '../../utils/auth.helper';

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