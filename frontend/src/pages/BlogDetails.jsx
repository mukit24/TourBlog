import React, { useEffect } from 'react'
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import BlogUpdateForm from '../components/BlogUpdateForm'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { blogDetails } from '../features/blogDetailsSlice'
import { deleteBlog } from '../features/blogOperationSlice'

const BlogDetails = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(blogDetails(params.id))
    }, [dispatch, params.id])

    const { loading, blog, error } = useSelector(state => state.blogDetails)
    const { userInfo } = useSelector(state => state.user)

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteBlog(blog.id))
        navigate('/blogs')
    }

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
                            {userInfo && (
                                userInfo.id === blog.author && (
                                    <div className='d-flex my-2 justify-content-center'>
                                    <Button type='button' onClick={handleDelete} variant='danger btn-sm me-2'><i className='fas fa-trash'></i></Button>
                                    <BlogUpdateForm blog={blog} />
                                    </div>
                                )
                            )}
                            <p className='fw-bold mb-1 '>Published At {blog.publishedAt}</p>
                            <div className=""><i className='far fa-heart fs-4'></i></div>
                            <h6 className='text-info'>{blog.love_count} People Love This Blog</h6>
                            
                            <p className='color2 text-start'>{blog.content}</p>
                        </Col>
                        {blog.comments && (
                            <Col md={4}>
                                <h5 className='color1 text-center'>Comments({blog.comments.length})</h5>
                                <ListGroup variant='flush'>
                                    {blog.comments.length !== 0 ? (
                                        blog.comments.map((comment) => (
                                            <ListGroup.Item className='bg-dark text-light' key={comment.id}>
                                                <small className='text-primary mb-1'>
                                                    <i className='fas fa-user me-2 '></i><strong>{comment.author_name}</strong>
                                                    <sub className='ms-1 text-light'>Published At {comment.createdAt.substring(0, 10)}</sub>
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
                        )}
                    </Row>
                )}

            </Container>
        </section>
    )
}

export default BlogDetails