import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { SearchIcon } from '../../../../public/icons';
import { PostsService } from '../../../API/posts.service';
import { IPost } from '../../../types/post.types';
import Posts from '../../Post/Posts';



const SearchSection = () => {
    const [searchedPosts, setSearcedPosts] = useState<IPost[]>([])
    const [searchQuery, setSearchQuery] = useState<string>("")

    const { isLoading, refetch } = useQuery<IPost[], Error>(['search posts', searchQuery],
        async () => await PostsService.search(searchQuery),
        {
            onSuccess: (data) => {
                setSearcedPosts(data)
            },
            enabled: false
        }
    )

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.length < 1) return
        refetch()
    }

    return (
        <>
            <div className="whiteBlock py-3 px-5 ">
                <form action="" className="flex items-center gap-3" onSubmit={handleSearch}>
                    <button type="submit" disabled={isLoading || !searchQuery.length}>
                        <SearchIcon className='w-5 h-5 text-gray-400' />
                    </button>
                    <input type="text" className="bg-transparent w-full" placeholder='Поиск новостей'
                        onChange={onSearchChange} />
                </form>
            </div>

            <section className="whiteBlock">
                {searchedPosts.length > 0
                    ? <div className="whiteBlock">
                        <Posts data={searchedPosts} refetch={refetch} />
                    </div>

                    : <div className='whiteBlock py-20 flex flex-col items-center justify-center'>
                        <h2 className='text-gray-400 text-lg'>Ни одной новости не найдено</h2>
                    </div>}
            </section>
        </>
    );
};

export default SearchSection;