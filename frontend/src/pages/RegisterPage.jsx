import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col, Container, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../features/userSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'


const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    // console.log(redirect)
    const { loading, success_reg, error } = useSelector(state => state.user)

    useEffect(() => {
        if (success_reg) {
            navigate(`/login${redirect}`)
        }
    }, [success_reg, navigate, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register({ username,email, password }))
    }

    return (
        <section className='bg-dark py-4 text-light'>
            <Container>
                <Row className='justify-content-center'>
                    <Col md={5}>
                        <h2 className='text-center pb-3 text-warning'>Register</h2>
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
                                controlId="email"
                                label="Email"
                                className="mb-3 text-dark"
                            >
                                <Form.Control required type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="password"
                                label="Password"
                                className="mb-3 text-dark"
                            >
                                <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </FloatingLabel>

                            <Button variant="success" className='w-100' type="submit">
                                Register
                            </Button>
                        </Form>
                        <h6 className='py-3'>Already Have an Account?  <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-decoration-none text-info ms-1'> Sign In</Link></h6>
                    </Col>

                </Row>
            </Container>
        </section>

    )
}

export default RegisterPage