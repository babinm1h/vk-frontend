import Image from 'next/image';
import React from 'react';
import { SearchIcon } from '../../public/icons';
import logo from "../../public/logo.png"

const Header = () => {
    return (
        <header className="w-full fixed top-0 left-0 right-0 z-[3] bg-white shadow">
            <div className="flex items-center gap-7 px-4 py-2">
                <div className="w-40 h-10 relative">
                    <Image alt='logo' layout='fill' objectFit='cover' src={logo} />
                </div>

                <div className="flex-grow flex">
                    <div className="bg-gray-200 self-start flex items-center py-1 px-3 rounded-lg gap-2">
                        <label htmlFor="search" className="">
                            <SearchIcon className='w-5 h-5 text-gray-500' />
                        </label>
                        <input type="text" id="search"
                            className="border-none border bg-transparent" placeholder='Поиск' />
                    </div>
                </div>

                <div className="w-10 h-10 border-gray-500 rounded-[50%] border">

                </div>
            </div>
        </header>
    );
};

export default Header;