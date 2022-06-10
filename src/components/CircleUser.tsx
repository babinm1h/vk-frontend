import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { IUser } from '../types/user.types';


const CircleUser: FC<{ user: IUser }> = ({ user }) => {
    const { push } = useRouter()

    const handleClick = () => {
        push(`/profile/${user._id}`)
    }

    return (
        <li className="flex flex-col items-center justify-center gap-1 group cursor-pointer"
            onClick={handleClick}>
            <div className="relative w-10 h-10">
                <Image src={user.avatar} layout='fill'
                    className='rounded-[50%]' alt='user' objectFit='cover' />
            </div>
            <span className="truncate w-16 text-ellipsis text-primaryBlue font-semibold group-hover:underline text-center">
                {user.name.split(" ")[0]}
            </span>
        </li>
    );
};

export default CircleUser;