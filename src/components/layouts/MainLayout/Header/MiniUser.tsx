import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { IUser } from '../../../../types/user.types';

interface IMiniUserProps {
    user: IUser
}

const MiniUser: FC<IMiniUserProps> = ({ user }) => {

    const { push } = useRouter()

    const onUserClick = () => {
        push(`/${user._id}`)
    }

    return (
        <li className="flex items-center p-2 gap-3 hover:bg-gray-100 cursor-pointer"
            onClick={onUserClick}>
            <div className="w-8 h-8 relative">
                <Image className='rounded-[50%]' layout='fill' objectFit='cover'
                    src={user.avatar} alt="user" />
            </div>
            <div className="">
                <span className="font-bold text-primaryBlue">{user.name}</span>
            </div>
        </li>
    );
};

export default MiniUser;