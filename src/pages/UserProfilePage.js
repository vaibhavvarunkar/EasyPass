import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import UserNavbar from '../components/userNavbar/UserNavbar';
import '../styles/userProfile.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import axios from 'axios';
import moment from 'moment';
import { API_ROOT } from '../constants';
import { userProfileInfo, clearUserProfileInfo } from '../redux/actions/UserActions';
import Loader from '../components/loader/Loader';

const UserProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(false);
    const [college, setCollege] = useState({});
    const [collegeIdFile, setCollegeIdFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [year, setYear] = useState({});
    const [branch, setBranch] = useState({});
    const [savedProfileView, setSavedProfileView] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [userIdName, setUserIdName] = useState(null);
    const userEmail = useSelector((state) => state.userReducer.userInfo.email);
    const userName = useSelector((state) => state.userReducer.userInfo.name);
    const profileInfo = useSelector((state) => state.userReducer.profileInfo);
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    const [showConfirm, setShowConfirm] = useState(false)
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        authenticate()
        if (Object.keys(profileInfo).length > 1) {
            setSavedProfileView(true)
        }
        else {
            setSavedProfileView(false)
        }
    }, [savedProfileView, profileInfo]);

    useEffect(() => {

    }, [savedProfileView, profileInfo])

    const collegeOptions = [{ value: 'PCET NMIET', label: "PCET'S NMIET" }];

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
        setPreview(URL.createObjectURL(e.target.files[0]));
        setCollegeIdFile(e.target.files[0]);
    };

    const submitProfile = async (e) => {
        if (collegeIdFile === null || startDate === null || branch === null || year === null || userIdName === null) {
            alert("All fields are necessary !")
        }
        else {
            setLoading(true);
            e.preventDefault();
            const token = await localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let form = new FormData();
            form.append('nameAsPerIdCard', userIdName);
            form.append('dateOfBirth', moment(startDate).format('DD/MM/YYYY'));
            form.append('collegeName', college.value);
            form.append('branchName', branch.value);
            form.append('currentYearOfStudy', year.value);
            form.append('collegeId', collegeIdFile);
            try {
                const res = await axios.post(`${API_ROOT}/profile/create`, form, config);
                if (res.data.status === 200) {
                    dispatch(userProfileInfo(res.data.profilee))
                    setSavedProfileView(true);
                    setLoading(false);
                } else {
                    alert(res.data.message);
                    setLoading(false);
                }
            } catch (err) {
                alert(err);
            }
            setLoading(false);
        }
    };

    const setUsernNameId = (e) => {
        setUserIdName(e.target.value);
    };
    const editUserProfile = () => {
        setLoading(true)
        dispatch(clearUserProfileInfo())
        setSavedProfileView(false)
        setLoading(false)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    const showConfirmPage = () => {
        setShowConfirm(true)
        scrollToTop()

    }

    const submitVerification = async (e) => {
        e.preventDefault()
        setLoading(true)
        setShowConfirm(false)
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const body = {}
        try {
            const res = await axios.post(`${API_ROOT}/profile/verify`, body, config)
            dispatch(userProfileInfo(res.data.profilee))
            setLoading(false)
            alert(res.data.message)
        }
        catch (err) {
            console.log(err);
            setLoading(false)
        }
    }


    return (
        <div>
            {loading ? <div className='loader-main'>
                <Loader />
            </div> : <>
                {
                    savedProfileView === false ?
                        <>
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
                                                    placeholder='Stephen Duke'
                                                    required
                                                    onChange={(e) => setUsernNameId(e)}
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className='mb-3'
                                                controlId='exampleForm.ControlInput1'
                                            >
                                                <Form.Label>Date of Birth</Form.Label>
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
                                                <img
                                                    id='collegeId'
                                                    style={{ height: '120px', width: '200px' }}
                                                    src={preview}
                                                    alt='Id-preview'
                                                ></img>
                                            ) : (
                                                <></>
                                            )}
                                            <Button
                                                onClick={(e) => submitProfile(e)}
                                                style={{ display: 'block', margin: '1rem' }}
                                                variant='primary'
                                                type='submit'
                                            >
                                                Save
                                            </Button>
                                        </Form>
                                    </div>
                                </>
                            ) : (
                                <h3>You're not authorized to view the contents.</h3>
                            )}
                        </>
                        : null}
                {savedProfileView && auth ? (
                    <div>
                        <UserNavbar />
                        <br></br>
                        <Form style={{ width: '90%', margin: 'auto' }}>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Account Verification Status</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={profileInfo.profileVerifystatus}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Account Sent For Verification Status</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={profileInfo.profileVerifyApplied ? "Sent For Verification" : "Please Request For Verification"}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={profileInfo.email}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>Name As Per College Id Card</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Password'
                                    readOnly
                                    value={profileInfo.nameAsPerIdCard}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Password'
                                    readOnly
                                    value={profileInfo.dateOfBirth}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>College Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Password'
                                    readOnly
                                    value={profileInfo.collegeName}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>Branch Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Password'
                                    readOnly
                                    value={profileInfo.branchName}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>Current Year Of Study</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Password'
                                    readOnly
                                    value={profileInfo.currentYearOfStudy}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>Uploaded College Id Card</Form.Label>
                            </Form.Group>
                            <div>
                                <img
                                    src={profileInfo.collegeId}
                                    alt='Id-Card'
                                    style={{ height: '300px', width: '300px', margin: 'auto' }}
                                ></img>
                            </div>
                            <br></br>
                            {
                                profileInfo.profileVerifyApplied ? null : <>
                                    <Button onClick={() => showConfirmPage()} variant='primary'>
                                        Submit Account For Verification
                                    </Button>
                                    <div style={{ height: '20px' }}></div>
                                    {
                                        profileInfo.profileVerifystatus === "Verified" ? null : <>
                                            <Button onClick={() => editUserProfile()} variant='danger'>
                                                Edit Profile
                                            </Button>
                                            <div style={{ height: '20px' }}></div>
                                        </>
                                    }
                                </>
                            }
                        </Form>
                    </div>
                ) : null}
            </>}
            {
                showConfirm ?
                    <>
                        <div className='confirmPopup'>
                            <h1>Are You sure ?</h1>
                            <h1> You Won't Be Able To Make Changes After This !</h1>
                            <Button onClick={(e) => submitVerification(e)} type='submit' variant='danger'>Submit</Button>
                            <br></br>
                            <Button onClick={() => setShowConfirm(false)} variant='warning'>Cancel</Button>
                        </div>
                    </>
                    : null
            }
        </div>
    );
};

export default UserProfilePage;
