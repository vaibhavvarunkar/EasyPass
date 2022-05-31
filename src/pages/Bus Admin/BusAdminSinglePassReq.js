import React, { useLayoutEffect, useState } from 'react'
import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import UserNavbar from '../../components/userNavbar/UserNavbar';
import axios from 'axios';
import { API_ROOT } from '../../constants';
import { getApprovedBusPassReqs, getBusPassReqs } from '../../redux/actions/AdminActions';

const BusAdminSinglePassReq = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [auth, setAuth] = useState(false);
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };


    useLayoutEffect(() => {
        authenticate();
    }, []);
    const dispatch = useDispatch()


    const location = useLocation();

    const navigate = useNavigate()

    const approveBusPass = async (email) => {
        setIsLoading(true)
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const body = {
            "email": email
        }
        try {
            const res = await axios.post(
                `${API_ROOT}/profile/buspassapprove`,
                body,
                config
            )
            console.log(res);
            if (res.data.status === 200) {
                alert("Successfully Approved!")
                dispatch(getBusPassReqs(res.data.unapprovedBusApps))
                dispatch(getApprovedBusPassReqs(res.data.approvedBusApps))
                setIsLoading(false)
                navigate("/admin/bus/bus-pass-requests")
            }
        }
        catch (err) {
            alert(err)
        }

        setIsLoading(false)
    }
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
                                                <Form.Label>Uploaded Address Proof</Form.Label>
                                            </Form.Group>
                                            <img className='address-doc' src={location.state.req.addressProof}></img>
                                        </Form>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem" }}>
                                            <Button onClick={() => approveBusPass(location.state.req.email)} variant="success">Approve Pass</Button>
                                        </div>
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

export default BusAdminSinglePassReq