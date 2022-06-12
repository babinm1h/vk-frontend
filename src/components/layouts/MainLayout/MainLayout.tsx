import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface IMainLayout {
    title: string
}

const MainLayout: FC<PropsWithChildren<IMainLayout>> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title || "VK"}</title>
                <meta name="description" content={`VK Clone Social Media`} />
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={"vk, vkontacte, вк, вконтакте, social media,"} />
            </Head>

            <Header />
            <div className="flex w-full mt-16 h-full sm:p-5 gap-3">
                <Sidebar />

                {children}

            </div>
        </>
    );
};

export default MainLayout;