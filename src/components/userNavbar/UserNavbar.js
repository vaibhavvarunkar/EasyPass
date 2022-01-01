import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearUserInfo } from '../../redux/actions/UserActions';

const UserNavbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const Logout = (e) => {
        e.preventDefault()
        dispatch(clearUserInfo())
        localStorage.removeItem("token")
        navigate("/login")
    }
    return (
        <>
            <Navbar className='navbar1 navbar-dark' expand='lg'>
                <Container>
                    <Navbar.Brand>Easy-Pass</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link>
                                <NavLink to='/user/home' className="link-navbar">
                                    Home
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink to='/user/profile' className="link-navbar">
                                    Profile
                                </NavLink>
                            </Nav.Link>
                            <Nav.Link>
                                <NavLink onClick={(e) => Logout(e)} to='/user/profile' className="link-navbar">
                                    Logout
                                </NavLink>
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default UserNavbar
