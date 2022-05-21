import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearApprovedConcessionReq, clearConcessionReq, clearVerificationReq, clearVerifiedProfiles } from '../../redux/actions/AdminActions';
import { clearUserInfo, clearUserProfileInfo } from '../../redux/actions/UserActions';

const UserNavbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userType = useSelector((state) => state.userReducer.userInfo.type);
    const Logout = (e) => {
        e.preventDefault()
        dispatch(clearUserInfo())
        dispatch(clearUserProfileInfo())
        dispatch(clearVerificationReq())
        dispatch(clearVerifiedProfiles())
        dispatch(clearConcessionReq())
        dispatch(clearApprovedConcessionReq())
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
                        {
                            userType === "student" ?

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
                                        <NavLink onClick={(e) => Logout(e)} to="/login" className="link-navbar">
                                            Logout
                                        </NavLink>
                                    </Nav.Link>

                                </Nav>
                                :
                                null
                        }
                        {
                            userType === "college admin" ?
                                <Nav className='ms-auto'>
                                    <Nav.Link>
                                        <NavLink to='/admin/home' className="link-navbar">
                                            Home
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <NavLink to='/admin/profile' className="link-navbar">
                                            Profile
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <NavLink onClick={(e) => Logout(e)} to="/login" className="link-navbar">
                                            Logout
                                        </NavLink>
                                    </Nav.Link>

                                </Nav>
                                :
                                null
                        }
                        {
                            userType === "train admin" ?
                                <Nav className='ms-auto'>
                                    <Nav.Link>
                                        <NavLink to='/admin/train/home' className="link-navbar">
                                            Home
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <NavLink to='/admin/train/profile' className="link-navbar">
                                            Profile
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <NavLink onClick={(e) => Logout(e)} to="/login" className="link-navbar">
                                            Logout
                                        </NavLink>
                                    </Nav.Link>

                                </Nav>
                                :
                                null
                        }
                        {
                            userType === "bus admin" ?
                                <Nav className='ms-auto'>
                                    <Nav.Link>
                                        <NavLink to='/admin/bus/home' className="link-navbar">
                                            Home
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <NavLink to='/admin/bus/profile' className="link-navbar">
                                            Profile
                                        </NavLink>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <NavLink onClick={(e) => Logout(e)} to="/login" className="link-navbar">
                                            Logout
                                        </NavLink>
                                    </Nav.Link>

                                </Nav>
                                :
                                null
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default UserNavbar
