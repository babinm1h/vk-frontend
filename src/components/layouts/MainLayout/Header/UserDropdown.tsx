import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, MutableRefObject, useEffect, useRef } from 'react';
import { LogoutIcon } from '../../../../../public/icons';
import { IUser } from '../../../../types/user.types';


interface IUserDropdownProps {
    user: IUser
    handleLogout: () => void
}

const UserDropdown: FC<IUserDropdownProps> = ({ user, handleLogout }) => {
    const { push } = useRouter()

    const goToProfile = () => {
        push(`/profile/${user._id}`)
    }

    return (
        <div className="bg-white absolute top-[48px] border border-gray-200 right-0 z-[2] rounded-b-lg
        shadow-bigShadow">
            <div className="bg-gray-100 p-3 roudned-lg flex gap-3 items-center m-3 rounded-lg cursor-pointer"
                onClick={goToProfile}>
                <div className="w-12 h-12 relative">
                    <Image src={user.avatar} alt='user' layout='fill' objectFit='cover'
                        className='rounded-[50%]' />
                </div>
                <div className="font-semibold truncate max-w-[180px] text-ellipsis">
                    {user.name}
                </div>
            </div>

            <ul className="flex flex-col">
                <li className="flex items-center p-2 gap-2 hover:bg-gray-200 transition-colors"
                    onClick={handleLogout}>
                    <LogoutIcon className='navIcon' />
                    Выйти
                </li>
            </ul>
        </div>
    );
};

export default UserDropdown;