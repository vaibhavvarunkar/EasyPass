import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import UserNavbar from '../components/userNavbar/UserNavbar'
import "../styles/userHomepage.css"

const UserHomePage = () => {
    const [auth, setAuth] = useState(false)
    const userName = useSelector(state => state.userReducer.userInfo.name)
    const authenticate = () => {
        localStorage.getItem("token") ?
            setAuth(true)
            :
            setAuth(false)
    }
    useEffect(() => {
        authenticate()
    }, [])
    return (
        <div>
            {
                auth ?
                    <>
                        <UserNavbar />
                        <div className='user-home'>
                            <h3>Welcome, {userName} !</h3>
                            <Button>Manage Your Applications</Button>
                        </div>
                    </>
                    :
                    <h3>You're not authorized to view the contents.</h3>
            }
        </div>
    )
}

export default UserHomePage
