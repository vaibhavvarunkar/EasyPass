import React, { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserNavbar from '../components/userNavbar/UserNavbar';
import '../styles/userProfile.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import moment from 'moment'
import Select from 'react-select';

const UserProfilePage = () => {
    const [auth, setAuth] = useState(false);
    const [college, setCollege] = useState({});
    const [collegeIdFile, setCollegeIdFile] = useState(null);
    const [preview, setPreview] = useState(null)
    const [year, setYear] = useState({});
    const [branch, setBranch] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const userEmail = useSelector((state) => state.userReducer.userInfo.email);
    const userName = useSelector((state) => state.userReducer.userInfo.name);
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    useLayoutEffect(() => {
        authenticate();
    }, []);

    const collegeOptions = [{ value: 'PCET"S NMIET', label: "PCET'S NMIET" }];

    const branchOptions = [
        { value: 'Mechanical', label: 'Mechanical' },
        { value: 'Information Technology', label: 'Information Technology' },
        {
            value: 'Electronics & Tele Communication',
            label: 'Electronics & Tele Communication',
        },
        { value: 'Computer Science', label: 'Computer Science' },
    ];

    const yearOptions = [
        { value: '1st Year', label: '1st Year' },
        { value: '2nd Year', label: '2nd Year' },
        { value: '3rd Year', label: '3rd Year' },
        { value: '4th Year', label: '4th Year' },
    ];

    const handleSelect = (selectedOption) => {
        setCollege(selectedOption);
    };
    const handleSelect2 = (selectedOption) => {
        setYear(selectedOption);
    };
    const handleSelect3 = (selectedOption) => {
        setBranch(selectedOption);
    };

    const IdUpload = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setCollegeIdFile(e.target.files[0]);
    };

    return (
        <div>
            {auth ? (
                <>
                    <UserNavbar />
                    <div className='user-profile'>
                        <Form>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    value={userEmail}
                                    type='email'
                                    placeholder='name@example.com'
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={userName}
                                    type='text'
                                    placeholder='name@example.com'
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Name As Per College ID-Card</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='name@example.com'
                                    required
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Date of Birh</Form.Label>
                                <DatePicker
                                    dateFormat='dd/MM/yyyy'
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>College Name</Form.Label>
                                <Select
                                    defaultValue={college.label}
                                    onChange={(e) => handleSelect(e)}
                                    className='dropdown-login'
                                    options={collegeOptions}
                                    placeholder={'Select College'}
                                    required
                                ></Select>
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Current Year Of Study</Form.Label>
                                <Select
                                    defaultValue={branch.label}
                                    onChange={(e) => handleSelect2(e)}
                                    className='dropdown-login'
                                    options={yearOptions}
                                    placeholder={'Select Branch'}
                                    required
                                ></Select>
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Branch Name</Form.Label>

                                <Select
                                    defaultValue={year.label}
                                    onChange={(e) => handleSelect3(e)}
                                    className='dropdown-login'
                                    options={branchOptions}
                                    placeholder={'Select Year'}
                                    required
                                ></Select>

                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>College ID</Form.Label>
                                <Form.Control
                                    onChange={(e) => IdUpload(e)}
                                    accept='.png, .jpg, .jpeg, .pdf'
                                    type='file'
                                    placeholder='College ID Proof'
                                    required
                                />
                            </Form.Group>
                            {collegeIdFile !== null ? (
                                <img id='collegeId' style={{ height: "120px", width: "200px" }} src={preview} alt='Id-preview'></img>
                            ) : (
                                <></>
                            )}
                            <Button style={{ display: "block", margin: "1rem" }} variant="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    </div>
                </>
            ) : (
                <h3>You're not authorized to view the contents.</h3>
            )}
        </div>
    );
};

export default UserProfilePage;
