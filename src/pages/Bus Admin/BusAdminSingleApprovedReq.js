import React, { useLayoutEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import UserNavbar from '../../components/userNavbar/UserNavbar';
import moment from 'moment';

const BusAdminSingleApprovedReq = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [auth, setAuth] = useState(false);
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };


    useLayoutEffect(() => {
        authenticate();
    }, []);


    const location = useLocation();

    return (
        <div>
            {
                isLoading ?
                    <Loader />
                    :
                    <>
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
                                                <Form.Label>Student Email</Form.Label>
                                                <Form.Control
                                                    value={location.state.req.email}
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
                                                <Form.Label>Application Date College</Form.Label>
                                                <Form.Control
                                                    value={moment(location.state.req.appliedOn).format('LL')}
                                                    type='text'
                                                    placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Application Acceptance Date College</Form.Label>
                                                <Form.Control
                                                    value={moment(location.state.req.applicationAcceptedOn).format('LL')}
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
                                                <Form.Label>Paid Amount</Form.Label>
                                                <Form.Control
                                                    value={location.state.req.amount}
                                                    type='text'
                                                    placeholder='Chinchwad Railway Station / Talegaon Bus Stop'
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='exampleForm.ControlInput1'
                                            >
                                                <Form.Label>Paid Amount Status</Form.Label>
                                                <Form.Control
                                                    value={location.state.req.amountPaid === true ? "Paid" : "Pending"}
                                                    type='text'
                                                    placeholder='Chinchwad Railway Station / Talegaon Bus Stop'
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='exampleForm.ControlInput1'
                                            >
                                                <Form.Label>Payment ID</Form.Label>
                                                <Form.Control
                                                    value={location.state.req.paymentId}
                                                    type='text'
                                                    placeholder='Chinchwad Railway Station / Talegaon Bus Stop'
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='exampleForm.ControlInput1'
                                            >
                                                <Form.Label>Payment Date</Form.Label>
                                                <Form.Control
                                                    value={moment(location.state.req.paymentPaidOn).format("LL")}
                                                    type='text'
                                                    placeholder='Chinchwad Railway Station / Talegaon Bus Stop'
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='exampleForm.ControlInput1'
                                            >
                                                <Form.Label>Pass Approved Date</Form.Label>
                                                <Form.Control
                                                    value={moment(location.state.req.passGivenDateS).format("LL")}
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
                                <h1>You're Not Authorized To View The Content.</h1>
                        }
                    </>
            }
        </div>
    )
}

export default BusAdminSingleApprovedReq