import React from 'react'
import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap'
import Icon from '../images/icon.ico'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    const expand = false
    return (
        <Navbar bg="dark" variant="dark" expand={expand} sticky="top">
            <Container fluid>
                <LinkContainer to={'/'}>
                    <Navbar.Brand href="#" className='mx-auto header1'>
                        <img
                            src={Icon}
                            width="35"
                            height="35"
                            className="d-inline-block align-top me-2"
                            alt="logo"
                        />
                        TourBlog
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="start"
                    className='bg-dark text-light'
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <LinkContainer to={'/'}>
                                <Nav.Link>Home Page</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/projects'}>
                                <Nav.Link>Projects</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header