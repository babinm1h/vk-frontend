import { useQuery } from "react-query"
import { PostsService } from "../API/posts.service"
import { UsersService } from "../API/users.service"


export const useProfile = (userId: string) => {
    const { data: userPosts, isLoading: IsPostsLoading, refetch: refetchPosts } = useQuery(['fetch user posts', userId],
        async () => await PostsService.getByUser(userId as string),
        {
            enabled: !!userId,
            select: data => data
        }
    )


    const { data, refetch, isLoading } = useQuery(['fetch profile', userId],
        async () => await UsersService.getProfile(String(userId)),
        {
            enabled: !!userId,
            select: data => data
        }
    )


    return { isLoading, data, userPosts, refetch, IsPostsLoading, refetchPosts }
}