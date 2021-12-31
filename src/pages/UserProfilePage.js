import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/userNavbar/UserNavbar'

const UserProfilePage = () => {
    const [auth, setAuth] = useState(false)
    const authenticate = () => {
        localStorage.getItem("token") ?
            setAuth(true)
            :
            setAuth(false)
    }
    useEffect(() => {
        authenticate()
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

export default UserProfilePage
