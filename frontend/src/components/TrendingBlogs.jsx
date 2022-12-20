import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import BlogCard from './BlogCard'

const TrendingBlogs = () => {
    const {blogs} = useSelector(state => state.blogList)

    return (
        <section className='bg-dark py-4 text-light'>
            <Container>
                <h2 className='text-center text-warning'>Trending Blogs</h2>
                <hr className='text-warning' />
                <Row className='g-3'>
                    {blogs.map((blog) => (
                        <Col md={4} key={blog.id}>
                            <BlogCard blog={blog}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default TrendingBlogs