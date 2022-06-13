import React, { FC } from 'react';
import { SearchIcon } from '../../../../public/icons';

interface ISearchFollowersFormProps {
    searchQuery: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    refetch: Function
}

const SearchFollowersForm: FC<ISearchFollowersFormProps> = ({ handleChange, refetch, searchQuery }) => {

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="px-5 py-3 border-b border-gray-200">
            <form action="" className="flex items-center gap-3" onSubmit={handleSearch}>
                <input type="text" className="px-2 py-1 border border-gray-300 w-full rounded-md"
                    onChange={handleChange} value={searchQuery} />
                <button type="submit">
                    <SearchIcon className='w-6 h-6 text-gray-400' />
                </button>
            </form>
        </div>
    );
};

export default SearchFollowersForm;