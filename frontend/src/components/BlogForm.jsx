import React, { useState } from 'react'
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { create, resetOp } from '../features/blogOperationSlice';
import Loader from './Loader';
import Message from './Message';

const BlogForm = () => {
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => {
        dispatch(resetOp());
        setShow(true)
    };

    const { userInfo } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const { loading, success } = useSelector(state => state.blogOperation)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(create({ title, description }));
        setTitle('');
        setDescription('');
    }

    return (
        <>
            <div className="text-center">
                <Button variant="outline-info btn-sm" onClick={handleShow}>
                    <i className='fas fa-pen me-1'></i> Write Your Blog
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Write Your Blog</Modal.Title>
                </Modal.Header>
                {userInfo ? (
                    <Modal.Body>
                        <Form onSubmit={submitHandler}>

                            <FloatingLabel
                                controlId="title"
                                label="Title"
                                className="mb-3"
                            >
                                <Form.Control required type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel controlId="description" label="Description" className='mb-3'>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FloatingLabel>

                            {loading && <Loader />}
                            {success && (
                                <Message variant='success text-center m-2'>Blog is Successfully Created</Message>
                            )}
                            <Button variant="success" className='w-100' type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                ) :
                    (
                        <Message variant='danger text-center m-2'>You Have To <Link className='text-decoration-none' to={'/login?redirect=/blogs'}>Login</Link> First To Write A Blog</Message>
                    )}

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BlogForm