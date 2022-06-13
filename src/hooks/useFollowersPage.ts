import { useState } from "react"
import { useQuery } from "react-query"
import { UsersService } from "../API/users.service"
import { IUser } from "../types/user.types"


export const useFollowersPage = () => {
    const [searchedFollowers, setSearchedFollowers] = useState<IUser[] | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const { data, isLoading } = useQuery('fetch followers', async () => await UsersService.getFollowers(), {
        select: data => data,
    })

    const { refetch } = useQuery(["search followers", searchQuery],
        async () => await UsersService.searchFollowers(searchQuery),
        {
            select: data => data,
            onSuccess: (data) => {
                setSearchedFollowers(data)
            },
            enabled: false,
            retry: 0
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    };


    return { handleChange, refetch, searchedFollowers, searchQuery, data, isLoading }
}