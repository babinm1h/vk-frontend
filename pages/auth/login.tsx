import React from 'react';
import Header from '../../src/components/layouts/MainLayout/Header';
import Image from 'next/image';
import logo from "../../public/logo.png"
import LoginForm from '../../src/components/UI/forms/LoginForm';


const Login = () => {
    return (
        <>
            <Header />
            <div className="w-full h-full flex items-center justify-center">
                <div className="authBlock flex-col">
                    <div className="w-44 h-10 relative">
                        <Image src={logo} layout='fill' objectFit='cover' alt='logo' />
                    </div>
                    <h1 className="font-bold text-2xl mb-10 mt-1">Вход</h1>

                    <LoginForm />
                </div>
            </div>
        </>
    );
};

export default Login;