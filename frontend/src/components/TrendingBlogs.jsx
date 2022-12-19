import React,{useEffect} from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogList } from '../features/blogSlice'

const TrendingBlogs = () => {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(blogList())
    }, [dispatch])
    
    return (
        <section className='bg-dark py-4 text-light'>
            <Container>
                <h2 className='text-center text-warning'>Trending Blogs</h2>
                <hr className='text-warning'/>
                <Row className='g-3'>
                    <Col md={4}>
                        <Card className="h-100 p-3 rounded">
                            <Link to={`/blogs/1/`} className='text-decoration-none text-dark'>
                                <Card.Img variant="top" src="" alt='blog' />
                                <Card.Body>
                                    <Card.Title as="div">
                                        <strong>This is tile</strong>
                                    </Card.Title>
                                    <Card.Text as="div">
                                        <div className="my-3">
                                            this is description
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TrendingBlogs