import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import ShowCase from '../components/ShowCase'
import TrendingBlogs from '../components/TrendingBlogs'
import { blogList } from '../features/blogSlice'

const HomePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(blogList())
    }, [dispatch])

    return (
        <>
            <ShowCase />
            <TrendingBlogs />
        </>
    )
}

export default HomePage