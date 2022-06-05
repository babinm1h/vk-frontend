import React, { useEffect } from 'react';
import googleIcon from "../../../../public/googleIcon.png"
import Image from 'next/image';
import Header from '../../layouts/MainLayout/Header';
import { useRouter } from 'next/router';
import { useAuth } from '../../../hooks/useAuth';


const Auth = () => {
    const { user } = useAuth()
    const { push } = useRouter()

    const onGoogleClick = () => {
        push(process.env.SERVER_URL + "/auth/google/login")
    }

    useEffect(() => {
        if (user) push('/')
    }, [user])

    return (
        <>
            <Header />

            <div className="w-full h-full flex items-center justify-center text-xs">
                <div className="authBlock">

                    <div className="flex-1">
                        <button className="flex gap-2 items-center px-5 py-2 shadow-blackSm transition-all hover:bg-gray-200 active:scale-[.98] text-[16px]"
                            onClick={onGoogleClick}>
                            <span className="w-6 h-6 relative">
                                <Image src={googleIcon} layout='fill' objectFit='cover' alt="google"
                                    className='w-5 h-5' />
                            </span>
                            <span className="">
                                Вход через Google
                            </span>
                        </button>
                    </div>


                    <div className="flex-1 flex flex-col gap-5">
                        <button className="blueBtn"
                            onClick={() => push('/auth/login')}>
                            Войти
                        </button>
                        <button className="blueBtn bg-green-600"
                            onClick={() => push('/auth/register')}>
                            Зарегестрироваться
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Auth;