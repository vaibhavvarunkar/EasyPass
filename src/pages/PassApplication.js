import React, { useLayoutEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';

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
    return (
        <div>
            {auth ?
                <>
                    <UserNavbar />
                    <div className='admin-home-page'>
                        <Button className='admin-btn' onClick={() => navigateToNewApplication()}>1. Click Here To Apply For A New Travel Pass</Button>
                        <Button className='admin-btn' onClick={() => navigateToPastApplication()}>2. Click Here To View Your Past Travel Pass Applications</Button>
                    </div>
                </>
                :
                <h3>You're not authorized to view the contents.</h3>}
        </div>
    );
};

export default PassApplication;
