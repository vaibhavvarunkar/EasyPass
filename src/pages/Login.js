import React, { useState } from 'react';
import Navbar1 from '../components/navbar/Navbar1';
import '../styles/login.css';
import Select from 'react-select';
import { Button, Form } from 'react-bootstrap';

const Login = () => {
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false)
    const [register, setRegister] = useState(false)
    const loginOptions = [
        { value: 'student', label: 'Student' },
        { value: 'college admin', label: 'College Admin' },
        { value: 'railway admin', label: 'Railway Admin' },
        { value: 'bus admin', label: 'Bus Admin' },
    ];

    const handleSelect = (selectedOption) => {
        setUser(selectedOption);
        setShowForm(true)
    };
    return (
        <>
            <Navbar1 />
            <div className='login'>
                <h1>Please Select An Option </h1>
                <div className='login-dropdown'>
                    <Select
                        defaultValue={user.label}
                        onChange={(e) => handleSelect(e)}
                        className='dropdown-login'
                        options={loginOptions}
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
                                    <Form.Control type='text' placeholder='Enter full name' />
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
                            <Form.Control type='email' placeholder='Enter email' />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
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
        </>
    );
};

export default Login;
