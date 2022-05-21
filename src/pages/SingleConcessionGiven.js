import React, { useLayoutEffect, useState } from 'react'
import moment from 'moment';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';

const SingleConcessionGiven = () => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate()
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };


    useLayoutEffect(() => {
        authenticate();
    }, []);


    const location = useLocation();
    console.log(location);
    return (
        <div>
            {
                auth ?
                    <>
                        <UserNavbar />
                        <div className='past-concession-letter-app'>
                            <Form className='past-form'>
                                <Form.Group>
                                    <Form.Label>Student Name</Form.Label>
                                    <Form.Control
                                        value={location.state.req.name}
                                        type='text'
                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Application Status</Form.Label>
                                    <Form.Control
                                        value={location.state.req.applicationStatus}
                                        type='text'
                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Application Date</Form.Label>
                                    <Form.Control
                                        value={moment(location.state.req.appliedOn).format('LL')}
                                        type='text'
                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Selected Travel Option</Form.Label>
                                    <Form.Control
                                        value={location.state.req.travelOption}
                                        type='text'
                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                    />
                                </Form.Group>
                                <Form.Group
                                    className='mb-3'
                                    controlId='exampleForm.ControlInput1'
                                >
                                    <Form.Label>Start Location</Form.Label>
                                    <Form.Control
                                        value={location.state.req.startLocation}
                                        type='text'
                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                    />
                                </Form.Group>
                                <Form.Group
                                    className='mb-3'
                                    controlId='exampleForm.ControlInput1'
                                >
                                    <Form.Label>End Location</Form.Label>
                                    <Form.Control
                                        value={location.state.req.endLocation}
                                        type='text'
                                        placeholder='Chinchwad Railway Station / Talegaon Bus Stop'
                                    />
                                </Form.Group>
                                <Form.Group
                                    className='mb-3'
                                    controlId='exampleForm.ControlInput1'
                                >
                                    <Form.Label>Uploaded Address Proof</Form.Label>
                                </Form.Group>
                                <img className='address-doc' src={location.state.req.addressProof}></img>
                            </Form>
                        </div>
                        <br></br>
                    </>
                    :
                    <h1>You're Not Authorized To View The Content</h1>
            }
        </div>
    )
}

export default SingleConcessionGiven