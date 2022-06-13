import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { IUser } from '../../../types/user.types';

interface IFollowedUserProps {
    user: IUser
}

const FollowedUser: FC<IFollowedUserProps> = ({ user }) => {

    const { push } = useRouter()

    const onUserClick = () => {
        push(`/profile/${user._id}`)
    }

    return (
        <li className="flex gap-3 px-5 py-2 cursor-pointer hover:bg-gray-200 transition-colors border-b border-gray-200"
            onClick={onUserClick} >
            <div className="relative w-16 h-16">
                <Image src={user.avatar} layout='fill' objectFit='cover' alt={user.name} className='rounded-[50%]' />
            </div>

            <span className="text-primaryBlue font-semibold hover:underline mt-2 text-[16px]">
                {user.name}
            </span>
        </li>
    );
};

export default FollowedUser;