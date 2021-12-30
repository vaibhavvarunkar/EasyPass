import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserNavbar from '../components/userNavbar/UserNavbar'

const UserHomePage = () => {
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        localStorage.getItem("token") ?
            setAuth(true)
            :
            setAuth(false)
    })
    return (
        <div>
            {
                auth ?
                    <>
                        <UserNavbar />
                    </>
                    :
                    <h3>You're not authorized to view the contents.</h3>
            }
        </div>
    )
}

export default UserHomePage
