import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import ShowCase from '../components/ShowCase'
import TrendingBlogs from '../components/TrendingBlogs'
import { blogListTrending } from '../features/blogListSlice'

const HomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(blogListTrending())
    }, [dispatch])

    return (
        <>
            <ShowCase />
            <TrendingBlogs />
        </>
    )
}

export default HomePage