import React, { FC, useState } from 'react';
import { formatDate } from '../../../../utils/time';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { IUser } from '../../../types/user.types';
import ProfileStatusModal from './ProfileStatusModal';

interface IProfileInfoProps {
    profile: IUser
    refetch: Function
    user: IUser | null
}

const ProfileInfo: FC<IProfileInfoProps> = ({ profile, refetch, user }) => {
    const { isVisible, ref, setIsVisible } = useOutsideClick(false)

    const onStatusClick = () => {
        if (user && user._id === profile._id) setIsVisible(true);
    }

    return (
        <div className="whiteBlock p-5 flex-grow self-start w-full">
            <div className="border-b border-gray-300 pb-3 relative" ref={ref}>
                <h1 className="font-semibold text-xl mb-1">{profile.name}</h1>
                {profile.status && profile.status.length > 0
                    ? <span onClick={onStatusClick}>{profile.status}</span>
                    : user && user._id === profile._id
                        ? <button className="text-gray-400 bg-transparent" onClick={onStatusClick}>
                            Установить статус
                        </button> : <></>}

                {isVisible && <ProfileStatusModal refetchProfile={refetch}
                    setIsVisible={setIsVisible} defaultValue={profile.status} />}
            </div>

            <div className="border-b py-5 border-gray-300 flex flex-col gap-3">
                {!profile.country && !profile.gender && !profile.birthDate &&
                    <div className='text-gray-400'>Нет информации</div>}

                {profile.country && <div className="flex items-center">
                    <span className="text-gray-500 w-32 font-semibold">Страна:</span>
                    <span className="text-primaryBlue">{profile.country}</span>
                </div>}

                {profile.gender && <div className="flex items-center">
                    <span className="text-gray-500 w-32 font-semibold">Пол:</span>
                    <span className="text-primaryBlue">{profile.gender}</span>
                </div>}

                {profile.birthDate && <div className="flex items-center">
                    <span className="text-gray-500 w-32 font-semibold">Дата рождения:</span>
                    <span className="text-primaryBlue">{formatDate(profile.birthDate)}</span>
                </div>}
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