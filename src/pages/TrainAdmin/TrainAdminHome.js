import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import UserNavbar from '../../components/userNavbar/UserNavbar';

const TrainAdminHome = () => {
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
    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {auth ? (
                        <>
                            <UserNavbar />
                        </>
                    ) : (
                        <h1>You're Not AUthorized To View This Content</h1>
                    )}
                </>
            )}
        </div>
    );
};

export default TrainAdminHome;
