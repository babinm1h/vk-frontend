import React, { FC } from 'react';
import { IUser } from '../types/user.types';
import CircleUser from './CircleUser';


interface IUsersBlockProps {
    title: string
    users: IUser[]
}

const UsersBlock: FC<IUsersBlockProps> = ({ title, users }) => {


    return (
        <div className="whiteBlock p-5">
            <div className="flex gap-2">
                <span className="">{title}</span>
                <span className="text-gray-400 font-semibold">{users.length}</span>
            </div>
            <ul className="grid grid-cols-3 gap-2">
                {users.map(u => <CircleUser user={u} key={u._id} />)}
            </ul>
        </div>
    );
};

export default UsersBlock;