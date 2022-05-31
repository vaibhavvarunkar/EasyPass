import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserNavbar from '../components/userNavbar/UserNavbar';
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { API_ROOT } from '../constants';
import { getVerificationReq, getVerifiedProfiles } from '../redux/actions/AdminActions';
import Loader from '../components/loader/Loader';


const StudentVerificationSingle = () => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(false)
    const verifyStudents = useSelector((state) => state.userReducer.getVerificationReqs);
    const { id } = useParams();
    const student1 = verifyStudents.filter(stud => stud._id === id)
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    useLayoutEffect(() => {
        authenticate()
    })
    const student = student1[0]
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const verifySingleStudent = async (email) => {
        setLoading(true)
        const token = await localStorage.getItem("token")
        const body = {
            email: email
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.post(
                `${API_ROOT}/profile/adminverify`,
                body, config
            )
            if (res.data.status === "Successfully Verified!") {
                alert("Profile Marked Verified")
                dispatch(getVerifiedProfiles(res.data.verifiedProfiles))
                dispatch(getVerificationReq(res.data.unVerifiedProfiles))
                navigate("/admin/student-verification")
                setLoading(false)
            }
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false)
    }

    const rejectProfile = async (email) => {
        setLoading(true)
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const body = {
            "email": email
        }
        try {
            const res = await axios.post(
                `${API_ROOT}/profile/adminrejectprofile`, body, config)
            console.log(res);
            if (res.data.status === "Successfully Rejected!") {
                alert("Profile Rejected Successfully !")
                dispatch(getVerifiedProfiles(res.data.verifiedProfiles))
                dispatch(getVerificationReq(res.data.unVerifiedProfiles))
                navigate("/admin/student-verification")
            }
        }
        catch (err) {
            alert(err);
        }
        setLoading(false)
    }
    return (
        <div>
            {
                auth
                    ?
                    <>
                        {
                            loading ? <Loader />
                                :
                                <>
                                    <UserNavbar />
                                    <br></br>
                                    <Form style={{ width: '90%', margin: 'auto' }}>
                                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                                            <Form.Label>Profile Pic</Form.Label>
                                        </Form.Group>
                                        <div>
                                            <img
                                                src={student.profilePic}
                                                alt='Id-Card'
                                                style={{ height: '200px', width: '200px', margin: 'auto' }}
                                            ></img>
                                        </div>
                                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                                            <Form.Label>Account Verification Status</Form.Label>
                                            <Form.Control
                                                type='text'
                                                value={student.profileVerifystatus}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                                            <Form.Label>Account Sent For Verification Status</Form.Label>
                                            <Form.Control
                                                type='text'
                                                value={student.profileVerifyApplied ? "Sent For Verification" : "Please Request For Verification"}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type='email'
                                                placeholder='Enter email'
                                                value={student.email}
                                                readOnly
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                                            <Form.Label>Name As Per College Id Card</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Password'
                                                readOnly
                                                value={student.nameAsPerIdCard}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                                            <Form.Label>Date Of Birth</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Password'
                                                readOnly
                                                value={student.dateOfBirth}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                                            <Form.Label>College Name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Password'
                                                readOnly
                                                value={student.collegeName}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                                            <Form.Label>Branch Name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Password'
                                                readOnly
                                                value={student.branchName}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                                            <Form.Label>Current Year Of Study</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Password'
                                                readOnly
                                                value={student.currentYearOfStudy}
                                            />
                                        </Form.Group>
                                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                                            <Form.Label>Uploaded College Id Card</Form.Label>
                                        </Form.Group>
                                        <div>
                                            <img
                                                src={student.collegeId}
                                                alt='Id-Card'
                                                style={{ height: '300px', width: '300px', margin: 'auto' }}
                                            ></img>
                                        </div>
                                        <br></br>
                                    </Form>
                                    <br>

                                    </br>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button style={{ width: "200px" }} onClick={() => verifySingleStudent(student.email)} variant='success'>Confirm & Verify</Button>
                                    </div>
                                    <br></br>

                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button style={{ width: "200px" }} onClick={() => rejectProfile(student.email)} variant='danger'>Reject Profile</Button>
                                    </div>
                                    <br></br>
                                </>
                        }
                    </>
                    :
                    <h1>You Are Not Authorized To View The Page Content</h1>
            }
        </div>
    )
}

export default StudentVerificationSingle
