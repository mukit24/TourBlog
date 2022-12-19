import React from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ShowCase = () => {
    return (
        <div className="show-case">
            <Container>
                <Row className='justify-content-center text-center text-sm-start text-light pt-5'>
                    <Col md={6}>
                        <h1>Hello Guys,</h1>
                        <h1>Welcome To <span className='text-warning'>TourBlog</span></h1>
                        <h4 className='color1 mt-3'>Wanna plan for a Tour?</h4>
                        <h5 className='color2'>Here is TourBlog for giving you some exciting content.</h5>
                        <div className="d-flex pt-3 show-case-buttons">
                            <Link to={'/blogs'}>
                                <Button variant='outline-warning me-3'>Explore Blogs</Button>
                            </Link>

                            <Button variant='outline-light'>Join TourBlog</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ShowCase