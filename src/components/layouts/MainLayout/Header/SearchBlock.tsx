import React, { useCallback, useState } from 'react';
import { SearchIcon } from '../../../../../public/icons';
import { useQuery } from 'react-query';
import { UsersService } from '../../../../API/users.service';
import { useDebounce } from '../../../../hooks/useDebounce';
import MiniUser from './MiniUser';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';


const SearchBlock = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const deb = useDebounce(searchQuery, 500)

    const { ref, setIsVisible, isVisible } = useOutsideClick(false)

    const { data, isSuccess } = useQuery(["search users", deb], async () => await UsersService.search(deb), {
        enabled: !!deb,
        select: data => data
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="bg-gray-200 self-start flex items-center py-1 px-3 rounded-lg gap-2 relative">
            <SearchIcon className='w-4 h-4 text-gray-500' />
            <input type="text" id="search" autoComplete='off' onFocus={() => setIsVisible(true)}
                value={searchQuery}
                onChange={handleSearch}
                className="border-none border bg-transparent" placeholder='Поиск' />

            {isVisible && <ul ref={ref}
                className="absolute top-10 right-0 whiteBlock w-full flex flex-col">
                {data && data.length > 1
                    ? data.map(i => <MiniUser key={i._id} user={i} />)
                    : <div className='text-center text-gray-400 shadow-bigShadow py-5'>
                        Пользователи не найдены
                    </div>}
            </ul>}
        </div>
    );
};

export default SearchBlock;