import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';
import { API_ROOT } from '../constants';

const PassApplication = () => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

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
                'contact': '8888888888',
                'email': 'test@razorpay.com',
            },
            handler: async (resp) => {
                try {
                    const res = await axios.post(`${API_ROOT}/profile/paymentVerify`, resp, config)
                    console.log(res);
                }
                catch (err) {
                    console.log(err);
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
    }

    return (
        <div>
            {auth ?
                <>
                    <UserNavbar />
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
                                                        <Button onClick={() => handlePayment()} className='admin-btn' style={{ backgroundColor: "Purple", border: "none" }}>3. Pay <span style={{ fontWeight: "700", color: "Yellow", margin: "0 10px" }}> &#8377; {currentApplication.applications.currentApplication.amount}</span>  For Your Last Pass Application</Button>
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
                :
                <h3>You're not authorized to view the contents.</h3>}
        </div>
    );
};

export default PassApplication;
