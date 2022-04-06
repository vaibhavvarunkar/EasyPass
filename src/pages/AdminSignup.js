import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import Navbar1 from "../components/navbar/Navbar1"
import "../styles/adminSignup.css"
import { API_ROOT } from '../constants';
import { useNavigate } from 'react-router-dom'

const AdminSignup = () => {
    const navigate = useNavigate()
    const [college, setCollege] = useState("")
    const [adminName, setAdminName] = useState(null)
    const [adminEmail, setAdminEmail] = useState(null)
    const [confirmPass, setCOnfirmPass] = useState(null)
    const [adminPassword, setAdminPassword] = useState(null)
    const collegeOptions = [{ value: 'PCET NMIET', label: "PCET'S NMIET" }];
    const handleSelect = (selectedOption) => {
        setCollege(selectedOption)
    }
    const adminSignup = async (e) => {
        e.preventDefault()
        if (college !== "" && adminName.length && adminPassword.length && adminEmail) {
            if (adminPassword === confirmPass) {
                try {
                    const body = {
                        "name": adminName,
                        "email": adminEmail,
                        "password": adminPassword,
                        "collegeName": college.value,
                        "type": "college admin"
                    }
                    const res = await axios.post(`${API_ROOT}/user/admin/signup`, body)
                    if (res.data.status === 200) {
                        alert(res.data.message)
                        navigate("/login")
                    }
                }
                catch (err) {
                    alert(err)
                }
            }
            else {
                alert("Password and confirm passsword doesn't match !")
            }
        }
        else {
            alert("All fields are necessary.")
        }
    }
    return (
        <div>
            <Navbar1 />
            <div className='admin-signup'>
                <div className='admin-form'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={(e) => setAdminName(e.target.value)} type="text" placeholder="Enter Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={(e) => setAdminEmail(e.target.value)} type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => setAdminPassword(e.target.value)} type="password" placeholder="Password" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control onChange={(e) => setCOnfirmPass(e.target.value)} type="password" placeholder="Password" required />
                        </Form.Group>
                        <Form.Label>Select College</Form.Label>
                        <Select
                            defaultValue={college.label}
                            onChange={(e) => handleSelect(e)}
                            className='dropdown-login'
                            options={collegeOptions}
                            placeholder="Select College"
                        >
                        </Select>
                        <br></br>
                        <Button onClick={(e) => adminSignup(e)} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AdminSignup
