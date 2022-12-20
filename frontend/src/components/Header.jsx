import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import Icon from '../images/icon.ico'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/userSlice'

const Header = () => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  const { userInfo } = useSelector(state => state.user)

  return (
    <Navbar bg="dark" variant="dark" expand='lg' sticky="top">
      <Container>
        <LinkContainer to={'/'}>
          <Navbar.Brand className='mx-auto header1'>
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

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to={'/blogs'}>
              <Nav.Link className='text-info'><i className='far fa-list-alt'></i> Blogs</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <Nav.Link className='text-danger' onClick={logoutHandler}><i className='fas fa-user-slash'></i> Logout</Nav.Link>
            ) : (
              <LinkContainer to={'/login'} className='color1'>
                <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header