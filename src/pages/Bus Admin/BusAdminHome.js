import React, { useLayoutEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import UserNavbar from '../../components/userNavbar/UserNavbar';

const BusAdminHome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    console.log(localStorage.getItem('token'));

    useLayoutEffect(() => {
        authenticate()
    })

    const navigate1 = () => {
        navigate("/admin/bus/bus-pass-requests")
    }

    const navigate2 = () => {
        navigate("/admin/bus/bus-approved-pass-requests")
    }
    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {auth ? (
                        <>
                            <UserNavbar />
                            <div className='admin-home-page'>
                                <Button onClick={() => navigate1()} style={{ backgroundColor: "Green", border: "none" }} className='admin-btn'>1. Click Here To View Student Verification Requests</Button>
                                <Button onClick={() => navigate2()} style={{ backgroundColor: "Purple", border: "none" }} className='admin-btn'>2. Click Here To View Student Consession Letter Applications</Button>
                            </div>
                        </>
                    ) : (
                        <h1>You're Not AUthorized To View This Content</h1>
                    )}
                </>
            )}
        </div>
    )
}

export default BusAdminHome