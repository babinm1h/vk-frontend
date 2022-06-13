import Link from 'next/link';
import React, { FC } from 'react';
import { NewspaperIcon, } from '../../../../../public/icons';
import { IUser } from '../../../../types/user.types';
import NavLinks from './NavLinks';


interface ISidebarProps {
    user: IUser | null
}

const Sidebar: FC<ISidebarProps> = ({ user }) => {

    return (
        <div className="w-48 md:block hidden">
            {user
                ? <NavLinks userId={user._id} />

                : <>
                    <div className='flex flex-col gap-3 border-b border-gray-300 pb-6' >
                        <Link href="/auth/register">
                            <a className='blueBtn'>Регистрация</a>
                        </Link>
                        <Link href="/auth/login">
                            <a className='blueBtn'>Вход</a>
                        </Link>
                    </div>
                    <nav className="flex flex-col mt-5">
                        <Link href="/" >
                            <a className="navItem">
                                <NewspaperIcon className='navIcon' />
                                <span className="">Новости</span>
                            </a>
                        </Link>
                    </nav>
                </>
            }
        </div>
    );
};

export default Sidebar;