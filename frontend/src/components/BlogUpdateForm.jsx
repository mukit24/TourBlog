import React, { useState } from 'react'
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { blogDetails } from '../features/blogDetailsSlice';
import { updateBlog, resetOp } from '../features/blogOperationSlice';
import Loader from './Loader';
import Message from './Message';

const BlogUpdateForm = ({ blog }) => {
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(blog.title)
    const [description, setDescription] = useState(blog.content)

    const id = blog.id

    const handleClose = () => {
        dispatch(blogDetails(id));
        setShow(false)};
        
    const handleShow = () => {
        setShow(true)
        dispatch(resetOp());
    };

    const dispatch = useDispatch()
    const { loading, success } = useSelector(state => state.blogOperation)

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateBlog({ id, title, description }));
    }

    return (
        <>
            <Button variant="primary btn-sm" onClick={handleShow}>
                <i className='fas fa-edit'></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Your Blog</Modal.Title>
                </Modal.Header>

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
                            <Message variant='success text-center m-2'>Blog is Successfully Updated</Message>
                        )}
                        <Button variant="success" className='w-100' type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BlogUpdateForm