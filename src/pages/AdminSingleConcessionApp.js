import axios from 'axios';
import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import UserNavbar from '../components/userNavbar/UserNavbar';
import { API_ROOT } from '../constants';
import { getApprovedConcessionReq, getConcessionReq } from '../redux/actions/AdminActions';

const AdminSingleConcessionApp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate()
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };


    useLayoutEffect(() => {
        authenticate();
    }, []);
    const dispatch = useDispatch()


    const location = useLocation();

    const approveConcesssionReq = async () => {
        setIsLoading(true)
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const body = {
            "email": location.state.req.email
        }
        try {
            const res = await axios.post(
                `${API_ROOT}/profile/adminapprove`,
                body,
                config
            )
            console.log(res);
            if (res.data.status === "Successfully Verified!") {
                navigate("/admin/all-concession-applications")
                setIsLoading(false)
                dispatch(getConcessionReq(res.data.unApproovedProfiles))
                dispatch(getApprovedConcessionReq(res.data.approoveddProfiles))
                alert("Successfully Verified!")
            }
        }
        catch (err) {
            alert(err)
        }

        setIsLoading(false)
    }
    return (
        <>
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
                                                    value={location.state.req.nameAsPerIdCard}
                                                    type='text'
                                                    placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Application Status</Form.Label>
                                                <Form.Control
                                                    value={location.state.req.applications.currentApplication.applicationStatus}
                                                    type='text'
                                                    placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Application Date</Form.Label>
                                                <Form.Control
                                                    value={moment(location.state.req.applications.currentApplication.appliedOn).format('LL')}
                                                    type='text'
                                                    placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Selected Travel Option</Form.Label>
                                                <Form.Control
                                                    value={location.state.req.applications.currentApplication.travelOption}
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
                                                    value={location.state.req.applications.currentApplication.startLocation}
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
                                                    value={location.state.req.applications.currentApplication.endLocation}
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
                                            <img className='address-doc' src={location.state.req.applications.currentApplication.addressProof}></img>
                                        </Form>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1rem" }}>
                                        <Button onClick={() => approveConcesssionReq()} variant='success' size='lg'>Approve</Button>
                                    </div>
                                    <br></br>
                                </>
                                :
                                <h1>You're Not Authorized To View The Content.</h1>
                        }
                    </>
            }
        </>
    )
};

export default AdminSingleConcessionApp;
