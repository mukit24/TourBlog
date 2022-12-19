import React, { useEffect } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { blogDetails } from '../features/blogDetailsSlice'

const BlogDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { loading, blog, error } = useSelector(state => state.blogDetails)
    console.log(blog)

    useEffect(() => {
        dispatch(blogDetails(params.id))
    }, [dispatch, params.id])

    return (
        <section className='bg-dark py-4 text-light'>
            <Container>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Row>
                        <Col md={8} className='text-center'>
                            <h4 className='color1 '>{blog.title}</h4>
                            <p className='text-primary mb-1'>
                                <i className='fas fa-user me-2 '></i><strong>{blog.author_name}</strong>
                            </p>
                            <p className='fw-bold mb-1 '>Published At {blog.createdAt.substring(0,10)}</p>
                            <div className=""><i className='far fa-heart fs-4'></i></div>
                            <h6 className='text-info'>{blog.love_count} People Love This Blog</h6>
                            <p className='color2 text-start'>{blog.content}</p>
                        </Col>
                        <Col md={4}>
                            <h5 className='color1 text-center'>Comments({blog.comments.length})</h5>
                            <ListGroup variant='flush'>
                                {blog.comments.length !== 0 ? (
                                    blog.comments.map((comment) => (
                                        <ListGroup.Item className='bg-dark text-light' key={comment.id}>
                                            <small className='text-primary mb-1'>
                                                <i className='fas fa-user me-2 '></i><strong>{comment.author_name}</strong>
                                                <sub className='ms-1 text-light'>Published At {comment.createdAt.substring(0,10)}</sub>
                                            </small>
                                            <p className='ms-4 mb-0 color2'>{comment.content}</p>
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item className='bg-dark'>
                                        <Message variant='info py-1'>No Comments Found</Message>
                                    </ListGroup.Item>

                                )}
                            </ListGroup>
                        </Col>
                    </Row>
                )}

            </Container>
        </section>
    )
}

export default BlogDetails