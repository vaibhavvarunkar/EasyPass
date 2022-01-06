import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar1 from '../components/navbar/Navbar1'

const About = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/user/home")
        }
    }, [])
    return (
        <>
            <Navbar1 />
        </>
    )
}

export default About
