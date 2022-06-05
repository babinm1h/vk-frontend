import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { errorCatch } from '../../../../utils/errorCatch';
import { validate } from '../../../../utils/validate';
import { AuthService, IAuthResponse } from '../../../API/auth.service';
import { useAuth } from '../../../hooks/useAuth';
import { IRegisterArgs } from '../../../types/arg.types';
import FormControl from './FormControl';


interface IForm {
    name: string
    email: string
    password: string
}

const RegisterForm = () => {
    const { push } = useRouter()
    const { registerFullfilled, registerError, regError } = useAuth()

    const { mutate, isLoading } = useMutation<IAuthResponse, Error, IRegisterArgs>('register',
        async (args: IRegisterArgs) => await AuthService.register(args),
        {
            onSuccess: (data) => {
                push('/')
                registerFullfilled(data!.user)
            },
            onError: (err) => {
                registerError(errorCatch(err))
            }
        }
    )

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IForm>()

    const onSubmit: SubmitHandler<IForm> = ({ email, name, password }) => {
        mutate({ email, password, name })
    }

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
            <FormControl register={register("email", validate(5, 50))} id="email" type="email"
                label='Введите email' error={errors.email} />

            <FormControl register={register("name", validate(5, 45))} id="name" type="text"
                label='Введите свое имя' error={errors.name} />

            <FormControl register={register("password", validate(5, 30))} id="password" type="password"
                label='Придумайте пароль' error={errors.password} />

            {regError && <div className='text-red-600 mb-2'>{regError}</div>}

            <div className="flex items-center gap-5">
                <button className="blueBtn">Зарегестрироваться</button>
                <div className="flex gap-2">Есть аккаунт?
                    <Link href="/auth/login">
                        <span className="text-primaryBlue cursor-pointer">Войти</span>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;