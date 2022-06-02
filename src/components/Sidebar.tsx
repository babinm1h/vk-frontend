import React from 'react';
import { NewspaperIcon, UserCircleIcon, ChatIcon } from '../../public/icons';


const Sidebar = () => {
    return (
        <div className="w-44">
            <nav>
                <ul className="flex flex-col">
                    <li className="navItem">
                        <NewspaperIcon className='navIcon' />
                        <span className="">Новости</span>
                    </li>
                    <li className="navItem">
                        <UserCircleIcon className='navIcon' />
                        <span className="">Моя страница</span>
                    </li>
                    <li className="navItem">
                        <ChatIcon className='navIcon' />
                        <span className="">Сообщения</span>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;