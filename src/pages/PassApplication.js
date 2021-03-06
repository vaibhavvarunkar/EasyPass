import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';
import { API_ROOT } from '../constants';
import Loader from '../components/loader/Loader';
import { userProfileInfo } from '../redux/actions/UserActions';

const PassApplication = () => {
    const [loading, setLoading] = useState(false)
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    useLayoutEffect(() => {
        authenticate();
    }, []);

    const navigateToNewApplication = () => {
        navigate("/user/travel-pass/applications/new-application")
    }

    const navigateToPastApplication = () => {
        navigate("/user/travel-pass/applications/past-applications")
    }
    const currentApplication = useSelector((state) => state.userReducer.profileInfo)
    console.log(currentApplication);

    const initPayment = (data) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        console.log(data);
        const options = {
            key: "rzp_test_kehCvQHYpkIrTO",
            amount: data.amount,
            currency: data.currency,
            description: "test",
            order_id: data.id,
            prefill: {
                'email': currentApplication.email,
            },
            handler: async (resp) => {
                try {
                    const res = await axios.post(`${API_ROOT}/profile/paymentVerify`, resp, config)
                    if (res.data.status === 200) {
                        alert("Payment Successful ! Check your mail for details or go to your applications.")
                        dispatch(userProfileInfo(res.data.response))
                    }
                }
                catch (err) {
                    alert(err);
                }
            },
            theme: {
                color: "#3399cc"
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const handlePayment = async () => {
        setLoading(true)
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const body = {
            amount: currentApplication.applications.currentApplication.amount
        }
        try {
            const res = await axios.post(`${API_ROOT}/profile/orders`, body, config)
            console.log(res);
            if (res.status === 200) {
                initPayment(res.data.data)
            }
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    return (
        <div>
            {auth ?
                <>
                    <UserNavbar />
                    {
                        loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <Loader style={{ alignSelf: "center" }} />
                        </div>
                            :
                            <>
                                {
                                    currentApplication.length === 0 ?
                                        <>
                                            <h1 style={{ textAlign: "center" }}>Please Create A Profile First</h1>
                                        </>
                                        :
                                        <>
                                            {
                                                currentApplication.profileVerifystatus === "Verified" ?
                                                    <>
                                                        <div className='admin-home-page'>
                                                            <Button style={{ backgroundColor: "Red", border: "none" }} className='admin-btn' onClick={() => navigateToNewApplication()}>1. Click Here To Apply For A New Travel Pass</Button>
                                                            <Button style={{ backgroundColor: "Green", border: "none" }} className='admin-btn' onClick={() => navigateToPastApplication()}>2. Click Here To View Your Past Travel Pass Applications</Button>
                                                            {
                                                                currentApplication.applications.allApplications.length > 0 ?
                                                                    <>
                                                                        {currentApplication.applications.currentApplication.amountPaid === false && currentApplication.applications.currentApplication.applicationStatus === "Approved" ? <Button onClick={() => handlePayment()} className='admin-btn' style={{ backgroundColor: "Purple", border: "none" }}>3. Pay <span style={{ fontWeight: "700", color: "Yellow", margin: "0 10px" }}> &#8377; {currentApplication.applications.currentApplication.amount}</span>  For Your Last Pass Application</Button> :
                                                                            null}
                                                                    </>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                    </>
                                                    :
                                                    <h1 style={{ textAlign: "center" }}>Wait Until Your Profile Gets Verified</h1>
                                            }
                                        </>


                                }
                            </>
                    }

                </>
                :
                <h3>You're not authorized to view the contents.</h3>}
        </div>
    );
};

export default PassApplication;
