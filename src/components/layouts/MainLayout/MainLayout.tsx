import React, { FC, PropsWithChildren } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface IMainLayout {

}

const MainLayout: FC<PropsWithChildren<IMainLayout>> = ({ children }) => {

    return (
        <>
            <Header />
            <div className="flex w-full mt-16 h-full p-5">
                <Sidebar />

                {children}

            </div>
        </>
    );
};

export default MainLayout;