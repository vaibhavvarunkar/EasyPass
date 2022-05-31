import React, { useLayoutEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import UserNavbar from '../components/userNavbar/UserNavbar'
import "../styles/adminHomePage.css"

const AdminScreen = () => {
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()

    const authenticate = () => {
        localStorage.getItem("token") ?
            setAuth(true)
            :
            setAuth(false)
    }

    useLayoutEffect(() => {
        authenticate()
    }, [])

    const navigate1 = () => {
        navigate("/admin/student-verification")
    }

    const navigate2 = () => {
        navigate("/admin/all-concession-applications")
    }


    const navigate3 = () => {
        navigate("/admin/verified-students")
    }

    const navigate4 = () => {
        navigate("/admin/approved-rejected-concession-application")
    }
    const navigate5 = () => {
        navigate("/admin/approved-concession-application")
    }

    const navigate6 = () => {
        navigate("/admin/approved-concession-application")
    }
    return (
        <div>
            {
                auth ? <>
                    <UserNavbar />
                    <div className='admin-home-page'>
                        <Button style={{ backgroundColor: "Red", border: "none" }} onClick={() => navigate1()} className='admin-btn'>1. Click Here To View Student Verification Requests</Button>
                        <Button style={{ backgroundColor: "hotPink", border: "none" }} onClick={() => navigate2()} className='admin-btn'>2. Click Here To View Student Consession Letter Applications</Button>
                        <Button style={{ backgroundColor: "Orange", border: "none" }} onClick={() => navigate3()} className='admin-btn'>3. Click Here To View Verified Students</Button>
                        <Button style={{ backgroundColor: "seaGreen", border: "none" }} onClick={() => navigate4()} className='admin-btn'>4. Click Here To View Student Approved/Rejected Consession Letter Applications</Button>
                        {/* <Button style={{ backgroundColor: "purple", border: "none" }} onClick={() => navigate5()} className='admin-btn'>5. Click Here To View Student Requests For Travel Pass</Button>
                        <Button style={{ backgroundColor: "Brown", border: "none" }} onClick={() => navigate6()} className='admin-btn'>6. Click Here To View Student List Of Approved Pass</Button> */}
                    </div>
                </>
                    :
                    <h1>Not Authorized To View The Content</h1>
            }
        </div>
    )
}

export default AdminScreen
