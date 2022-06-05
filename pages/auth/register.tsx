import React from 'react';
import Header from '../../src/components/layouts/MainLayout/Header';
import logo from "../../public/logo.png"
import Image from 'next/image';
import RegisterForm from '../../src/components/UI/forms/RegisterForm';

const Register = () => {
    return (
        <>
            <Header />
            <div className="w-full h-full flex items-center justify-center">
                <div className="authBlock flex-col">
                    <div className="w-44 h-10 relative">
                        <Image src={logo} layout='fill' objectFit='cover' alt='logo' />
                    </div>
                    <h1 className="font-bold text-2xl mb-10 mt-1">Регистрация</h1>

                    <RegisterForm />
                </div>
            </div>
        </>
    );
};

export default Register;