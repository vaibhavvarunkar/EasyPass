import axios from 'axios';
import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';
import "../styles/userPastConcessionApplication.css"
import { API_ROOT } from '../constants';
import Loader from '../components/loader/Loader';

const UserPastConcessionApplication = () => {
    const [details, setDetails] = useState([])
    const { id } = useParams();
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const application = useSelector(
        (state) => state.userReducer.profileInfo.applications.allApplications
    );
    const required_application = application.filter((app) => app._id === id);

    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };

    useLayoutEffect(() => {
        authenticate();
    }, []);

    const [showPaymentDetails, setShowPaymentDetails] = useState(false)

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


    return <div className='pass-div'>
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
                                        required_application[0].applicationStatus === "Approved" ?
                                            <>
                                                <Form.Group>
                                                    <Form.Label>Amount Paid</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].amountPaid === false ? "Pending" : "Paid"}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Amount</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].amount}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Application Date</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].appliedOn}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Application Approved Date</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].applicationAcceptedOn}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                            </>

                                            :
                                            null
                                    }
                                    {
                                        required_application[0].amountPaid === true ?
                                            <>
                                                <Form.Group>
                                                    <Form.Label>Payment ID</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].paymentId}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Payment Date</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].paymentPaidOn}
                                                        type='text'
                                                    />
                                                </Form.Group>
                                            </>

                                            :
                                            null

                                    }
                                    <Form.Group>
                                        <Form.Label>Application Status</Form.Label>
                                        <Form.Control
                                            value={required_application[0].applicationStatus}
                                            type='text'
                                            placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Application Date</Form.Label>
                                        <Form.Control
                                            value={moment(required_application[0].appliedOn).format('LL')}
                                            type='text'
                                            placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Selected Travel Option</Form.Label>
                                        <Form.Control
                                            value={required_application[0].travelOption}
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
                                            value={required_application[0].startLocation}
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
                                            value={required_application[0].endLocation}
                                            type='text'
                                            placeholder='Chinchwad Railway Station / Talegaon Bus Stop'
                                        />
                                    </Form.Group>
                                    <Form.Label>Start Location</Form.Label>
                                    <Form.Control
                                        value={required_application[0].startLocation}
                                        type='text'
                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                    />
                                    <Form.Group
                                        className='mb-3'
                                        controlId='exampleForm.ControlInput1'
                                    >
                                        <Form.Label>Uploaded Address Proof</Form.Label>
                                    </Form.Group>
                                    <img className='address-doc' src={required_application[0].addressProof}></img>
                                </Form>
                                <br></br>
                                {
                                    required_application[0].amountPaid === true && showPaymentDetails === false ?
                                        <div style={{ display: "flex", height: "100px", justifyContent: "center" }}>
                                            <Button onClick={() => paymentIdDetails(required_application[0].paymentId)} style={{ height: "50px" }}>View Payment Details</Button>
                                        </div>
                                        :
                                        null
                                }
                                <br></br>
                            </div>
                    }
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
                : <>
                    <h1>You Are Not Authorized To View The Page Content</h1>
                </>
        }</div>
};

export default UserPastConcessionApplication;
