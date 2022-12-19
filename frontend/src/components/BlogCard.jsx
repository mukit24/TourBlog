import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const BlogCard = ({blog}) => {
    return (
        <Card className="h-100 p-3 rounded">
            <Link to={`/blogs/${blog.id}/`} className='text-decoration-none text-dark'>
                <Card.Img variant="top" src={blog.cover} alt='blog' />
                <Card.Body>
                    <Card.Title as="h6">
                        {blog.title}
                    </Card.Title>
                    <Card.Text as="div" className='text-primary'>
                        <i className='fas fa-user me-2'></i><strong>{blog.author_name}</strong>
                    </Card.Text>
                    <Card.Text as="div" className='my-2'>
                        <strong>{blog.love_count}</strong> People <i className='fas fa-heart text-danger me-1'></i> it
                    </Card.Text>
                    <Button variant='success btn-sm'>Details</Button>
                </Card.Body>
            </Link>
        </Card>
    )
}

export default BlogCard