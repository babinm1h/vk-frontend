import { NewspaperIcon, UserCircleIcon, ChatIcon } from '../../../../../public/icons';
import Link from 'next/link';
import React from 'react';

const NavLinks = () => {
    return (
        <nav className="flex flex-col">
            <Link href="/" >
                <a className="navItem">
                    <NewspaperIcon className='navIcon' />
                    <span className="">Новости</span>
                </a>
            </Link>
            <Link href="/profile" >
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
        </nav>
    );
};

export default NavLinks;