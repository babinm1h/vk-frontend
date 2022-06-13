import { NewspaperIcon, UserCircleIcon, ChatIcon, UsersIcon } from '../../../../../public/icons';
import Link from 'next/link';
import React, { FC } from 'react';



const NavLinks: FC<{ userId: string }> = ({ userId }) => {
    return (
        <nav className="flex md:flex-col items-center md:items-start">
            <Link href="/" >
                <a className="navItem">
                    <NewspaperIcon className='navIcon' />
                    <span className="">Новости</span>
                </a>
            </Link>
            <Link href={`/profile/${userId}`} >
                <a className="navItem">
                    <UserCircleIcon className='navIcon' />
                    <span className="">Моя страница</span>
                </a>
            </Link>
            <Link href="/dialogs" >
                <a className="navItem">
                    <ChatIcon className='navIcon' />
                    <span className="">Сообщения</span>
                </a>
            </Link>
            <Link href="/followers" >
                <a className="navItem">
                    <UsersIcon className='navIcon' />
                    <span className="">Подписчики</span>
                </a>
            </Link>
        </nav>
    );
};

export default NavLinks;