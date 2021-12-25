import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import './navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar1 = () => {
    return (
        <>
            <Navbar className='navbar1 navbar-dark' expand='lg'>
                <Container>
                    <Navbar.Brand>Easy-Pass</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link>
                                <NavLink to='/' className="link-navbar">
                                    Home
                                </NavLink>
                            </Nav.Link>

                            <Nav.Link>
                                <NavLink to='/about' className="link-navbar">
                                    About
                                </NavLink>
                            </Nav.Link>
                            <NavDropdown
                                className='link-navbar'
                                title='More'
                                id='basic-nav-dropdown'
                            >
                                <Nav.Link>
                                    <NavLink to='/login' className="link-navbar-login">
                                        Login
                                    </NavLink>
                                </Nav.Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navbar1;
