import React, { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validate } from '../../../../utils/validate';
import { useAuth } from '../../../hooks/useAuth';
import EditControl from './controls/EditContol';
import EditSelect from './controls/EditSelect';
import countryList from 'react-select-country-list'
import { useUploadImage } from '../../../hooks/useUploadImg';
import Image from 'next/image';
import { UploadIcon } from '@heroicons/react/outline';
import { useMutation } from 'react-query';
import { UsersService } from '../../../API/users.service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { errorCatch } from '../../../../utils/errorCatch';

interface IForm {
    name: string
    country: string
    gender: string
}

const EditProfileForm = () => {
    const { user, refetchAuth } = useAuth()
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IForm>()

    const options = useMemo(() => countryList().getData().map(c => c.label), [])

    const { mutate, isLoading, error, isSuccess } = useMutation('edit profile',
        async (fd: FormData) => await UsersService.editUser(fd),
        {
            onSuccess: () => {
                refetchAuth()
                resetFiles()
                reset()
            },
        }
    )

    const { preview, img, resetFiles, handleImg } = useUploadImage()

    const onSubmit: SubmitHandler<IForm> = ({ name, country, gender }) => {

        const fd = new FormData()
        if (img) fd.append('avatar', img)
        if (startDate) fd.append('birthDate', String(startDate))
        fd.append('name', name)
        fd.append('gender', gender)
        fd.append('country', country)
        mutate(fd)
    }


    if (!user) return <></>

    return (
        <div className="p-5">
            <form action="" className="max-w-[500px] w-full" onSubmit={handleSubmit(onSubmit)}>
                <EditControl error={errors.name} label='Имя' id='name' value={user.name}
                    register={register("name", validate(2, 45))} type="text" />

                <EditSelect options={['Мужчина', 'Женщина']} id='gender' label="Пол"
                    error={errors.gender} register={register('gender')} value={user.gender} />

                <EditSelect options={options} id='country' label="Страна" error={errors.country}
                    register={register("country")} value={user.country} />

                <div className="flex items-center gap-3 mt-5">
                    <span className="editLabel">Дата рождения</span>
                    <div className="editControl w-full">
                        <DatePicker onChange={(date: Date) => setStartDate(date)} selected={startDate}
                            className='w-full' />
                    </div>
                </div>

                <div className="flex items-center gap-5 mt-5">
                    <div className="w-20 h-20 relative">
                        <Image src={preview ? preview : user.avatar} layout="fill"
                            objectFit='cover' alt="user avatar" priority />
                    </div>

                    <label htmlFor="ava" className="flex items-center gap-1 font-semibold text-primaryBlue">
                        <UploadIcon className='w-5 h-5' />
                        Изменить аватар
                    </label>
                    <input type="file" id="ava" hidden onChange={handleImg} />
                </div>

                <div className="pt-5 mt-10 border-gray-300 border-t">
                    <button type="submit" className='blueBtn' disabled={isLoading}>
                        Сохранить
                    </button>
                    {!!error && <div className="py-2 px-2 bg-red-300 rounded-lg mt-2">
                        {errorCatch(error)}
                    </div>}
                    {isSuccess && <div className="py-1 px-2 bg-green-200 rounded-lg mt-3">
                        Профиль обновлен
                    </div>}
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;