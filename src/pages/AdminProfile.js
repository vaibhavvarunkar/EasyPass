import React, { useLayoutEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserNavbar from '../components/userNavbar/UserNavbar';

const AdminProfile = () => {
    const [auth, setAuth] = useState(false);
    const profileInfo = useSelector((state) => state.userReducer.userInfo);
    console.log(profileInfo);
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    useLayoutEffect(() => {
        authenticate()
    })
    return (
        <div>
            {
                auth ? <>
                    <UserNavbar />
                    <br></br>
                    <div className='admin-profile-page'>
                        <Form style={{ width: '90%', margin: 'auto' }}>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Account Verification Status</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={profileInfo.name}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={profileInfo.email}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>College Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Password'
                                    readOnly
                                    value={profileInfo.collegeName}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </>
                    :
                    <h1>You Are Not Authorized To View The Page Content</h1>
            }
        </div>
    )
}

export default AdminProfile
