import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { errorCatch } from '../../../../utils/errorCatch';
import { validate } from '../../../../utils/validate';
import { AuthService, IAuthResponse } from '../../../API/auth.service';
import { useAuth } from '../../../hooks/useAuth';
import { ILoginArgs } from '../../../types/arg.types';
import FormControl from './controls/FormControl';


interface IForm {
    email: string
    password: string
}

const LoginForm = () => {
    const { push } = useRouter()
    const { loginFullfilled, loginError, logError } = useAuth()

    const { mutate, isLoading } = useMutation<IAuthResponse, Error, ILoginArgs>('login',
        async (args: ILoginArgs) => await AuthService.login(args),
        {
            onSuccess: (data) => {
                push("/")
                loginFullfilled(data.user)
            },

            onError: (err) => {
                loginError(errorCatch(err))
            }
        }
    )

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IForm>()

    const onSubmit: SubmitHandler<IForm> = ({ email, password }) => {
        mutate({ email, password })
    }

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
            <FormControl register={register("email", validate(5, 50))} id="email" type="email"
                label='Введите email' error={errors.email} />

            <FormControl register={register("password", validate(5, 30))} id="password" type="password"
                label='Придумайте пароль' error={errors.password} />

            {logError && <div className='text-red-600 mb-2'>{logError}</div>}

            <div className="flex items-center gap-5">
                <button className="blueBtn">Войти</button>
                <div className="flex gap-2">Нет аккаунта?
                    <Link href="/auth/register">
                        <span className="text-primaryBlue cursor-pointer">Зарегестрироваться</span>
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;