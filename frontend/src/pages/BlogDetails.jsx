import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Button, Form, FloatingLabel, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BlogUpdateForm from '../components/BlogUpdateForm'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { blogDetails } from '../features/blogDetailsSlice'
import { createComment, deleteBlog, reactBlog, resetOp } from '../features/blogOperationSlice'

const BlogDetails = () => {
    const [comment, setComment] = useState('')

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, blog, error } = useSelector(state => state.blogDetails)
    const { react_success, react_error, success } = useSelector(state => state.blogOperation)
    const { userInfo } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(blogDetails(params.id))
        dispatch(resetOp())
    }, [dispatch, params.id, react_success, success])

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteBlog(blog.id))
        navigate('/blogs')
    }

    const handleReact = (e) => {
        e.preventDefault()
        if (!userInfo) {
            navigate(`/login?redirect=/blogs/${blog.id}`)
        } else {
            dispatch(reactBlog(blog.id))
        }
    }
    const id = blog.id
    const handleComment = (e) => {
        e.preventDefault();
        dispatch(createComment({id, comment}))
        setComment('')
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
                            {userInfo ? (<>
                                <Button variant='success btn-sm mb-2' onClick={handleReact}>React Love<i className='far fa-heart ms-1'> </i></Button>
                                {react_error && (
                                    <Message variant='danger'>{react_error}</Message>
                                )}
                                {react_success && (
                                    <Message variant='success'>Successfully Reacted On This Post</Message>
                                )}
                            </>

                            ) : (
                                <Button variant='success btn-sm mb-2' onClick={handleReact}>React Love<i className='far fa-heart ms-1'> </i></Button>
                            )}
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
                                    {userInfo ? (
                                        <ListGroup.Item className='bg-dark'>
                                        <Form onSubmit={handleComment}>
                                            <FloatingLabel
                                                controlId="comment"
                                                label="Comment"
                                                className="mb-3 text-dark"
                                            >
                                                <Form.Control required type="text" placeholder="Write Comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                                            </FloatingLabel>
                                            <Button variant='success btn-sm w-100' type='submit'>Submit</Button>
                                        </Form>

                                    </ListGroup.Item>
                                    ):(
                                        <ListGroup.Item className='bg-dark'>
                                            <Message variant='danger py-2'>Plaese <Link to={`/login?redirect=/blogs/${blog.id}`} className='text-decoration-none'>Login</Link>  To Write A Comment</Message>
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