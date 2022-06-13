import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { PostsService } from "../API/posts.service"
import { IPost } from "../types/post.types"


export const useScrollPagination = () => {
    const [doRefetch, setDoRefetch] = useState(true)
    const [posts, setPosts] = useState<IPost[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState<number>(0)


    const { data, isLoading, refetch } = useQuery(['fetch posts', currentPage],
        async () => await PostsService.getAll(currentPage),
        {
            select: (data) => data,
            onSuccess(data) {
                setDoRefetch(false)
                setCurrentPage(prev => prev += 1)
                setTotalCount(data.totalCount)
                setPosts([...posts, ...data.posts])
            },
            enabled: false
        }
    )


    const { refetch: refetchAll } = useQuery(['fetch first page'],
        async () => await PostsService.getAll(1),
        {
            onSuccess(data) {
                setPosts(data.posts)
            },
            select: data => data,
            enabled: false
        }
    )


    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [totalCount, posts.length])


    useEffect(() => {
        if (!doRefetch) return;
        refetch()
    }, [doRefetch])


    const handleScroll = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && posts.length < totalCount) {
            setDoRefetch(true)
        }
    }


    return { posts, refetchAll, isLoading }
}