import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import BlogCard from '../components/BlogCard'
import BlogForm from '../components/BlogForm'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { blogList } from '../features/blogListSlice'

const Blogs = () => {
    const dispatch = useDispatch();
    const { loading, blogs, error } = useSelector(state => state.blogList)
    const {success} = useSelector(state => state.blogOperation)

    useEffect(() => {
        dispatch(blogList())
    }, [dispatch, success])

    return (
        <section className='bg-dark py-4 text-light'>
            <Container>
                <h2 className='text-center text-warning'>All Blogs</h2>
                <BlogForm />
                <hr className='text-warning' />
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Row className='g-3'>
                        {blogs.map((blog) => (
                            <Col md={4} key={blog.id}>
                                <BlogCard blog={blog} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
    )
}

export default Blogs