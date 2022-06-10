import React, { FC } from 'react';
import { IUser } from '../../../types/user.types';

interface IProfileInfoProps {
    profile: IUser
}

const ProfileInfo: FC<IProfileInfoProps> = ({ profile }) => {
    return (
        <div className="whiteBlock p-5 flex-grow self-start w-full">
            <div className="border-b border-gray-300 pb-3">
                <h1 className="font-semibold text-xl mb-1">{profile.name}</h1>
                <button className="text-gray-400 bg-transparent">Установить статус</button>
            </div>

            <div className="border-b py-5 border-gray-300">
                ffa
            </div>

            <div className="py-3 leading-3 flex justify-center items-center gap-7 text-primaryBlue">
                <div className="profileCount">
                    <span className="text-lg">{profile.followers.length}</span>
                    <p className="">Подписчиков</p>
                </div>
                <div className="profileCount">
                    <span className="text-lg">{profile.follows.length}</span>
                    <p className="">Подписок</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;