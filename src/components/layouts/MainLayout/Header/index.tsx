import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ChevronDownIcon } from '../../../../../public/icons';
import logo from "../../../../../public/logo.png"
import { removeTokenCookie } from '../../../../../utils/auth.helper';
import { useAuth } from '../../../../hooks/useAuth';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import SearchBlock from './SearchBlock';
import UserDropdown from './UserDropdown';

const Header = () => {
    const router = useRouter()
    const { user, logout } = useAuth()
    const { isVisible, ref, setIsVisible } = useOutsideClick(false)

    const toggleDropDown = () => {
        setIsVisible(!isVisible)
    }

    const onLogoClick = () => {
        router.push("/")
    }

    const handleLogout = () => {
        removeTokenCookie()
        logout()
    }

    return (
        <header className="w-full fixed top-0 left-0 right-0 z-[3] bg-white shadow">
            <div className="flex items-center gap-7 px-4 py-2">
                <div className="w-40 h-10 relative cursor-pointer sm:block hidden" onClick={onLogoClick}>
                    <Image alt='logo' layout='fill' objectFit='cover' src={logo} priority />
                </div>

                <div className="flex-grow flex">
                    <SearchBlock />
                </div>

                {user
                    ? <div className="relative">
                        <div className="" ref={ref}>
                            <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropDown}>
                                <div className="w-10 h-10 rounded-[50%] border relative">
                                    <Image src={user.avatar} alt="user" layout='fill' objectFit='cover'
                                        className='rounded-[50%]' />
                                </div>
                                <ChevronDownIcon className='w-5 h-5 text-gray-300' />
                            </div>

                            {isVisible &&
                                <UserDropdown user={user} handleLogout={handleLogout} />}
                        </div>

                    </div>
                    : <Link href='/auth'>
                        <span className="blueBtn cursor-pointer">Войти</span>
                    </Link>}
            </div>
        </header>
    );
};

export default Header;