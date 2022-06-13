import { NextPage } from 'next';
import React from 'react';
import SingleDialog from '../../src/components/screens/singleDialog';
import { getTokenCookie } from '../../utils/auth.helper';

const dialog: NextPage = () => {
    return <SingleDialog />
};

export default dialog;


export const getServerSideProps = async () => {
    const isAuth = getTokenCookie()

    if (!isAuth) {
        return {
            redirect: { destination: '/auth', permanent: false },
        }
    }
}