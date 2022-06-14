import { useQuery } from "react-query"
import { CommentsService } from "../API/comments.service"


export const usePostComments = (postId: string) => {
    const { refetch: refetchComments, isLoading, data } = useQuery(['fetch first comments', postId],
        async () => await CommentsService.getFirstByPost(postId),
        {
            enabled: !!postId,
            select: data => data,
            retry: 0
        }
    )

    const { refetch: refetchAllComments, isLoading: isAllLoading, data: allComments } = useQuery(
        ['fetch first comments', postId],
        async () => await CommentsService.getAllByPost(postId),
        {
            enabled: false,
            select: data => data,
        }
    )

    return { refetchAllComments, refetchComments, isAllLoading, allComments, isLoading, data }
}