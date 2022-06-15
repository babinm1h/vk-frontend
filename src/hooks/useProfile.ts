import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import { DialogsService } from "../API/dialogs.service"
import { PostsService } from "../API/posts.service"
import { UsersService } from "../API/users.service"


export const useProfile = (userId: string) => {
    const { push } = useRouter()

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


    const { mutate: followMutate, isLoading: isFollowing } = useMutation(['follow', userId],
        async () => await UsersService.toggleFollow(userId),
        {
            onSuccess() {
                refetch()
            }
        }
    )

    const { mutate: dialogMutate, } = useMutation(['create dialog', userId],
        async () => await DialogsService.create(userId),
        {
            onSuccess: (data) => {
                push(`/conversations/${data._id}`)
            }
        }
    )

    return {
        isLoading, data, userPosts,
        refetch, IsPostsLoading, refetchPosts,
        followMutate, isFollowing, dialogMutate
    }
}