import { useQuery } from "react-query"
import { UsersService } from "../API/users.service"

export const useProfile = (id: string) => {
    const { } = useQuery('getProfile', () => UsersService.getProfile(id),
        {
            select: (data) => data
        }
    )
}