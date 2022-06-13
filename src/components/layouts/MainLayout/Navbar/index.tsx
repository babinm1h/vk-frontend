import React, { FC } from 'react';
import NavLinks from '../Sidebar/NavLinks';

interface INavbarProps {
    userId: string | undefined
}

const Navbar: FC<INavbarProps> = ({ userId }) => {
    return (
        <div className='fixed bottom-0 right-0 left-0 bg-white z-[3] border-t border-gray-300 flex items-center justify-center md:hidden'>
            {userId ?
                <NavLinks userId={userId} />
                : ''}
        </div>
    );
};

export default Navbar;