import React, { useEffect } from 'react';
import Navbar1 from '../components/navbar/Navbar1';
import '../styles/home.css';
import students from '../assests/—Pngtree—reading student_5420475.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const Home = () => {
    const navigate = useNavigate()
    const userType = useSelector((state) => state.userReducer.userInfo.type);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (userType === "student") {
                navigate("/user/home")
            }
            if (userType === "college admin") {
                navigate("/admin/home")
            }
        }
    }, [navigate])
    return (
        <>
            <Navbar1 />
            <div className='showcase'>
                <h1>A Platform For Students To Get</h1>
                <h1>Student Travel Passes Hassle-Free !</h1>
                <img src={students} alt='students'></img>
                <div>
                    <NavLink to='/login'>
                        <Button className='btn-lg go-to-login-btn'>Get Started</Button>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default Home;
