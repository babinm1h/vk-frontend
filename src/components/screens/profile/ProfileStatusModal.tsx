import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { errorCatch } from '../../../../utils/errorCatch';
import { UsersService } from '../../../API/users.service';

interface IForm {
    status: string
}

interface IProfileStatusProps {
    refetchProfile: Function
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    defaultValue: string | undefined
}

const ProfileStatusModal: FC<IProfileStatusProps> = ({ refetchProfile, setIsVisible, defaultValue }) => {
    const { error, isLoading, mutate } = useMutation(['change status'],
        async (status: string) => await UsersService.changeStatus(status),
        {
            onSuccess() {
                reset()
                refetchProfile()
                setIsVisible(false)
            },
        }
    )

    const { register, handleSubmit, reset } = useForm<IForm>()

    const onSubmit: SubmitHandler<IForm> = ({ status }) => {
        mutate(status)
    }

    return (
        <div className='absolute w-full p-5 shadow-blackSm whiteBlock top-0 right-0'>
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className="border rounded-md border-gray-300 w-full py-1 px-2"
                    {...register("status")} autoComplete='off' defaultValue={defaultValue} />
                <button className="blueBtn mt-3" type='submit' disabled={isLoading}>Сохранить</button>
                {!!error && <div className='text-red-600 mt-2'>{errorCatch(error)}</div>}
            </form>
        </div>
    );
};

export default ProfileStatusModal;