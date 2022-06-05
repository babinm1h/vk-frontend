import Image from 'next/image';
import React, { FC, MutableRefObject, useEffect, useRef } from 'react';
import { LogoutIcon } from '../../../../../public/icons';
import { IUser } from '../../../../types/user.types';


interface IUserDropdownProps {
    user: IUser
    dropRef: MutableRefObject<any>
    handleLogout: () => void
}

const UserDropdown: FC<IUserDropdownProps> = ({ user, dropRef, handleLogout }) => {

    return (
        <div className="bg-white absolute top-[48px] border border-gray-200 right-0 z-[2] rounded-b-lg
        shadow-bigShadow">
            <div className="bg-gray-100 p-3 roudned-lg flex gap-3 items-center m-3 rounded-lg">
                <div className="w-12 h-12 relative">
                    <Image src={user.avatar} alt='user' layout='fill' objectFit='cover'
                        className='rounded-[50%]' />
                </div>
                <div className="font-semibold truncate max-w-[180px] text-ellipsis">
                    {user.name}
                </div>
            </div>

            <ul className="flex flex-col">
                <li className="navItem" onClick={handleLogout}>
                    <LogoutIcon className='navIcon' />
                    Выйти
                </li>
            </ul>
        </div>
    );
};

export default UserDropdown;