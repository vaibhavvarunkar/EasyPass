import React, { useLayoutEffect, useState } from 'react'
import moment from 'moment';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';

const SingleVerifiedStudent = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate()
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };


    useLayoutEffect(() => {
        authenticate();
    }, []);


    const location = useLocation();
    return (
        <div>
            {/* {console.log(location.state.req.profilePic)} */}
            {
                auth ? <>
                    <UserNavbar />
                    <div className='past-concession-letter-app'>
                        <Form className='past-form'>
                            {
                                location.state.req.profilePic !== undefined ? <>  <Form.Group className='mb-3' controlId='formBasicPassword'>
                                    <Form.Label>Profile Pic</Form.Label>
                                </Form.Group>
                                    <div>
                                        <img
                                            src={location.state.req.profilePic}
                                            alt='Id-Card'
                                            style={{ height: '200px', width: '200px', margin: 'auto' }}
                                        ></img>
                                    </div>
                                </>
                                    :
                                    null
                            }
                            <Form.Group>
                                <Form.Label>Student Name</Form.Label>
                                <Form.Control
                                    value={location.state.req.nameAsPerIdCard}
                                    type='text'
                                    placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Profile Verified</Form.Label>
                                <Form.Control
                                    value={location.state.req.profileVerifystatus}
                                    type='text'
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Application Date</Form.Label>
                                <Form.Control
                                    value={moment(location.state.req.profileVerifyDate).format('LL')}
                                    type='text'
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Student Email</Form.Label>
                                <Form.Control
                                    value={location.state.req.email}
                                    type='text'

                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>College Name</Form.Label>
                                <Form.Control
                                    value={location.state.req.collegeName}
                                    type='text'

                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Current Year Of Study</Form.Label>
                                <Form.Control
                                    value={location.state.req.currentYearOfStudy}
                                    type='text'

                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Uploaded College Id Proof</Form.Label>
                            </Form.Group>
                            <img className='address-doc' src={location.state.req.collegeId}></img>
                        </Form>
                    </div>
                    <br></br>
                </>
                    :
                    <h1>You're Not Authorized To View The Content.</h1>
            }
        </div>
    )
}

export default SingleVerifiedStudent