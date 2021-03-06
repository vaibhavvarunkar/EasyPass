import React, { useEffect, useLayoutEffect, useState } from 'react';
import Navbar1 from '../components/navbar/Navbar1';
import '../styles/login.css';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { API_ROOT } from '../constants';
import { useNavigate } from 'react-router-dom';
import SuccessRegister from './SuccessRegister';
import Loader from '../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserInfo, userProfileInfo } from '../redux/actions/UserActions';
import { getApprovedBusPassReqs, getApprovedConcessionReq, getApprovedTrainPassReqs, getBusPassReqs, getConcessionReq, getTrainPassReqs, getVerificationReq, getVerifiedProfiles } from '../redux/actions/AdminActions';

const Login = () => {
    const navigate = useNavigate()
    const userType = useSelector((state) => state.userReducer.userInfo.type);



    const dispatch = useDispatch()
    const [user, setUser] = useState({});
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [register, setRegister] = useState(false)
    const [loading, setLoading] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const loginOptions = [
        { value: 'student', label: 'Student' },
        { value: 'college admin', label: 'College Admin' },
        { value: 'train admin', label: 'Train Admin' },
        { value: 'bus admin', label: 'Bus Admin' },
    ];

    const registerOptions = [
        { value: 'student', label: 'Student' },
    ];

    const handleSelect = (selectedOption) => {
        setUser(selectedOption);
        setShowForm(true)
    };

    const naviagte = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault()
        const body = {
            "type": user.value,
            "name": name,
            "email": email,
            "password": password
        }
        if (password === confirmPass) {
            try {
                setLoading(true)
                const res = await axios.post(`${API_ROOT}/user/signup`, body)
                if (res.data.status === 200) {
                    setLoading(false)
                    setSuccessPopup(true)
                    setShowForm(false)
                } else {
                    alert(res.data.message)
                }
            }
            catch (err) {
                alert(err)
                setLoading(false)
            }
        }
        else {
            alert("Password and Confirm Password Doesn't Match.")
        }

    }

    const getUserProfile = async () => {
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const res = await axios.get(
                `${API_ROOT}/profile/current`,
                config
            )
            if (res.data.status === 200) {
                console.log(res);
                dispatch(userProfileInfo(res.data.profile))
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const getStudentConcessionReqs = async () => {
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(
                `${API_ROOT}/profile/admingetapp`,
                config
            )
            console.log(res);
            if (res.data.status === 200) {
                dispatch(getConcessionReq(res.data.unapprovedApps))
                dispatch(getApprovedConcessionReq(res.data.approvedApps))
            }
        }
        catch (err) {
            alert(err);
        }
    }

    const getStudentVerificationReqs = async () => {
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(
                `${API_ROOT}/profile/adminverifyall`,
                config
            )
            console.log(res);
            if (res.data.unVerifiedProfiles && res.data.verifiedProfiles) {
                dispatch(getVerificationReq(res.data.unVerifiedProfiles))
                dispatch(getVerifiedProfiles(res.data.verifiedProfiles))
            }
        }
        catch (err) {
            alert(err)
        }
    }

    const getBusPassApi = async () => {
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(
                `${API_ROOT}/profile/busPasses`,
                config
            )
            console.log(res);
            if (res.data.status === 200) {
                dispatch(getBusPassReqs(res.data.unapprovedBusApps))
                dispatch(getApprovedBusPassReqs(res.data.approvedBusApps))
            }
        }
        catch (err) {
            alert(err)
        }
    }


    const getTrainPassApi = async () => {
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(
                `${API_ROOT}/profile/railwayPasses`,
                config
            )
            console.log(res);
            if (res.data.status === 200) {
                dispatch(getTrainPassReqs(res.data.unapprovedRailApps))
                dispatch(getApprovedTrainPassReqs(res.data.approvedRailApps))
            }
        }
        catch (err) {
            alert(err)
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        if (user.value === "student" || user.value === "college admin" || user.value === "train admin" || user.value === "bus admin") {
            const body = {
                "email": email,
                "password": password,
                "type": user.value
            }
            try {
                setLoading(true)
                const res = await axios.post(`${API_ROOT}/user/signin`, body)
                if (res.data.status === 200) {
                    console.log(res);
                    if (res.data.result.type === "student") {
                        localStorage.setItem("token", res.data.token)
                        dispatch(saveUserInfo(res.data.result))
                        getUserProfile()
                        naviagte("/user/home")
                        setLoading(false)
                    }
                    else if (res.data.result.type === "college admin") {
                        localStorage.setItem("token", res.data.token)
                        dispatch(saveUserInfo(res.data.result))
                        getStudentVerificationReqs()
                        getStudentConcessionReqs()
                        naviagte("/admin/home")
                        setLoading(false)

                    }
                    else if (res.data.result.type === "train admin") {
                        localStorage.setItem("token", res.data.token)
                        dispatch(saveUserInfo(res.data.result))
                        getTrainPassApi()
                        naviagte("/admin/train/home")
                        setLoading(false)
                    }
                    else if (res.data.result.type === "bus admin") {
                        localStorage.setItem("token", res.data.token)
                        dispatch(saveUserInfo(res.data.result))
                        getBusPassApi()
                        naviagte("/admin/bus/home")
                        setLoading(false)
                    }
                }
                else {
                    alert(res.data.message)
                    setLoading(false)
                }
            }
            catch (err) {
                console.log(err);
                setLoading(false)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (register) {
            handleSignup(e)
        }
        else {
            handleLogin(e)
        }
    }

    const closePopup = () => {
        setSuccessPopup(false)
        setRegister(false)
    }

    const callMe = () => {
        if (localStorage.getItem("token")) {
            if (userType === "student") {
                naviagte("/user/home")
            }
            if (userType === "train admin") {
                naviagte("/admin/train/home")
            }
            if (userType === "college admin") {
                naviagte("/admin/home")
            }
        }
    }
    return (
        <>
            {
                callMe()
            }
            <Navbar1 />
            {
                loading ? <div className='loader-main'>
                    <Loader />
                </div>
                    :
                    <>
                        {
                            successPopup ?
                                <div className='successPopup'>
                                    <h3 onClick={() => closePopup()}>Close</h3>
                                    <SuccessRegister />
                                </div>
                                :
                                <div className='login'>
                                    <h1>Please Select An Option </h1>
                                    <div className='login-dropdown'>
                                        <Select
                                            defaultValue={user.label}
                                            onChange={(e) => handleSelect(e)}
                                            className='dropdown-login'
                                            options={register ? registerOptions : loginOptions}
                                            placeholder={register ? 'Register as' : "Login As"}
                                        ></Select>
                                    </div>
                                    <div className='login-form'>
                                        {showForm ? <Form>
                                            {
                                                register ?
                                                    <Form.Group className='mb-3' controlId='formBasicName'>
                                                        <Form.Label className='form-label'>
                                                            {user.label === 'Student'
                                                                ? 'Student Name'
                                                                : user.label === 'College Admin'
                                                                    ? 'College Admin Name'
                                                                    : user.label === 'Bus Admin'
                                                                        ? 'Bus Admin Name'
                                                                        : 'Railway Admin'
                                                                            ? 'Railway Admin Name'
                                                                            : ''}
                                                        </Form.Label>
                                                        <Form.Control onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter full name' />
                                                    </Form.Group>
                                                    :
                                                    null
                                            }

                                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                                <Form.Label className='form-label'>
                                                    {user.label === 'Student'
                                                        ? 'Student Email'
                                                        : user.label === 'College Admin'
                                                            ? 'College Admin Email'
                                                            : user.label === 'Bus Admin'
                                                                ? 'Bus Admin Email'
                                                                : 'Railway Admin'
                                                                    ? 'Railway Admin Email'
                                                                    : ''}
                                                </Form.Label>
                                                <Form.Control onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter email' />
                                            </Form.Group>

                                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
                                            </Form.Group>

                                            {
                                                register ?
                                                    <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
                                                        <Form.Label>Confirm Password</Form.Label>
                                                        <Form.Control onChange={(e) => setConfirmPass(e.target.value)} type='password' placeholder='Confirm Password' />
                                                    </Form.Group>
                                                    :
                                                    <></>
                                            }
                                            <Button onClick={(e) => handleSubmit(e)} variant='primary' type='submit'>
                                                {register ? "Register" : "Login"}
                                            </Button>
                                        </Form>
                                            :
                                            <></>
                                        }
                                    </div>
                                    <h3>{register ? "Already Registered ?" : "Haven't Registered Yet ?"}</h3>
                                    <Button onClick={() => setRegister(!register)} className='mt-2 btn btn-warning register-btn'>Click Here To {register ? "Login" : "Register"}</Button>
                                </div>
                        }
                    </>
            }
        </>
    );
};

export default Login;
