import React, { useLayoutEffect, useState } from 'react'
import moment from 'moment';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';
import { Button } from 'react-bootstrap';
import { API_ROOT } from '../constants'
import axios from 'axios';
import Loader from '../components/loader/Loader';

const SingleConcessionGiven = () => {
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false)
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
    const paymentIdDetails = async (pid) => {
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        setLoading(true)
        const body = {
            "paymentId": pid,
        }
        try {
            setLoading(true)
            const res = await axios.post(`${API_ROOT}/profile/payments`, body, config)
            console.log(res);
            if (res.data.status === 200) {
                setDetails(res.data.result)
                setShowPaymentDetails(true)
            }
        }
        catch (err) {
            alert(err)
        }
        setLoading(false)
    }
    return (
        <div>
            {
                auth ?
                    <>
                        <UserNavbar />
                        {
                            loading ? <Loader />
                                :
                                <div className='past-concession-letter-app'>
                                    <Form className='past-form'>
                                        {
                                            location.state.req.applicationStatus === "Approved" ?
                                                <>
                                                    <Form.Group>
                                                        <Form.Label>Amount Paid</Form.Label>
                                                        <Form.Control
                                                            value={location.state.req.amountPaid === false ? "Pending" : "Paid"}
                                                            type='text'
                                                            placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Amount</Form.Label>
                                                        <Form.Control
                                                            value={location.state.req.amount}
                                                            type='text'
                                                            placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Application Date</Form.Label>
                                                        <Form.Control
                                                            value={location.state.req.appliedOn}
                                                            type='text'
                                                            placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Application Approved Date</Form.Label>
                                                        <Form.Control
                                                            value={location.state.req.applicationAcceptedOn}
                                                            type='text'
                                                            placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                        />
                                                    </Form.Group>
                                                </>

                                                :
                                                null
                                        }
                                        {
                                            location.state.req.amountPaid === true ?
                                                <>
                                                    <Form.Group>
                                                        <Form.Label>Payment ID</Form.Label>
                                                        <Form.Control
                                                            value={location.state.req.paymentId}
                                                            type='text'
                                                            placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                        />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Payment Date</Form.Label>
                                                        <Form.Control
                                                            value={location.state.req.paymentPaidOn}
                                                            type='text'
                                                        />
                                                    </Form.Group>
                                                </>

                                                :
                                                null

                                        }
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
                                    <br></br>
                                    {
                                        location.state.req.amountPaid === true && showPaymentDetails === false ?
                                            <div style={{ display: "flex", height: "100px", justifyContent: "center" }}>
                                                <Button onClick={() => paymentIdDetails(location.state.req.paymentId)} style={{ height: "50px" }}>View Payment Details</Button>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                        }
                        <br></br>
                        {
                            showPaymentDetails ? <>
                                <div className='past-concession-letter-app'>
                                    <Form className='past-form'>
                                        <Form.Group>
                                            <Form.Label>Order ID</Form.Label>
                                            <Form.Control
                                                value={details.order_id}
                                                type='text'
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Contact</Form.Label>
                                            <Form.Control
                                                value={details.contact}
                                                type='text'
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                value={details.email}
                                                type='text'
                                            />
                                        </Form.Group>
                                    </Form>
                                    <br></br>
                                </div>
                            </> :
                                null
                        }
                    </>
                    :
                    <h1>You're Not Authorized To View The Content</h1>
            }
        </div>
    )
}

export default SingleConcessionGiven