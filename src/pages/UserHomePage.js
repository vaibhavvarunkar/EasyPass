import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserNavbar from '../components/userNavbar/UserNavbar'
import "../styles/userHomepage.css"
import { API_ROOT } from '../constants';

const UserHomePage = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const userName = useSelector(state => state.userReducer.userInfo.name)
    const authenticate = () => {
        localStorage.getItem("token") ?
            setAuth(true)
            :
            setAuth(false)
    }
    const userType = useSelector((state) => state.userReducer.userInfo.type);
    useLayoutEffect(() => {
        if (userType === "student") {
            authenticate()
        }
    }, [])

    const routeToApplication = () => {
        navigate("/user/travel-pass/applications")
    }
    return (
        <div>
            {
                auth ?
                    <>
                        <UserNavbar />
                        <div className='user-home'>
                            <h3>Welcome, {userName} !</h3>
                            <Button onClick={() => routeToApplication()}>Manage Your Applications</Button>

                        </div>
                    </>
                    :
                    <h3>You're not authorized to view the contents.</h3>
            }
        </div>
    )
}

export default UserHomePage
