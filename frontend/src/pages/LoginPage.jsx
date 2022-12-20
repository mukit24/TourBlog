import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Container, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../features/userSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'


const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    // console.log(redirect)
    const { loading, userInfo, error } = useSelector(state => state.user)

    useEffect(() => {
        if (userInfo) {
            navigate(`${redirect}`)
        }
    }, [userInfo, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ username, password }))
    }

    return (
        <section className='bg-dark py-4 text-light'>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={5}>
                        <h2 className='text-center pb-3 text-warning'>Sign In</h2>
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>

                            <FloatingLabel
                                controlId="username"
                                label="Username"
                                className="mb-3 text-dark"
                            >
                                <Form.Control required type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </FloatingLabel>


                            <FloatingLabel
                                controlId="password"
                                label="Password"
                                className="mb-3 text-dark"
                            >
                                <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FloatingLabel>

                            <Button variant="success" className='w-100' type="submit">
                                Sign In
                            </Button>
                        </Form>
                        <h6 className='py-3'>New User?  <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-decoration-none text-info ms-1'> Register</Link></h6>
                    </Col>

                </Row>
            </Container>
        </section>

    )
}

export default LoginPage