import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SuccessRegister = () => {
    const naviagte = useNavigate()
    const handleClick = () => {
        naviagte("/login")
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <h1>Registered Successfully! You can Login Now.</h1>
            <Button onClick={() => handleClick()} className='btn btn-lg btn-primary'>Go To Login</Button>
        </div>
    )
}

export default SuccessRegister
