import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import EditProfile from '../../src/components/screens/profile/edit';

const edit: NextPage = () => {
    return <EditProfile />
};

export default edit;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const isAuth = ctx.req.cookies['vkToken']

    if (!isAuth) {
        return {
            redirect: { destination: '/auth', permanent: false },
        }
    }

    return { props: {} }
}