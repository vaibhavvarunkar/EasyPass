import React, { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import UserNavbar from '../components/userNavbar/UserNavbar';
import '../styles/newPassApplication.css';
import { API_ROOT } from '../constants';
import axios from 'axios';
import Loader from '../components/loader/Loader';
import { userProfileInfo } from '../redux/actions/UserActions';
import { useNavigate } from 'react-router-dom';

const NewPassApplication = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [travelMethod, setTravelMethod] = useState(null);
    const [pickUpLocation, setPickUpLocation] = useState(null);
    const [dropLocation, setDropLocation] = useState(null);
    const [passPeriod, setPassPeriod] = useState(null);
    const [preview, setPreview] = useState(null);
    const [addressProofDoc, setAddressProofDoc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSuccess, sethowSuccess] = useState(false)
    const travelOptions = [
        { value: 'Local / Train', label: 'Local / Train' },
        { value: 'PMPML / Bus', label: 'PMPML / Bus' },
    ];
    const PeriodOptions = [
        { value: '1 Month', label: '1 Month' },
        { value: '3 Months', label: '3 Months' },
        { value: '6 Months', label: '6 Months' },
    ];
    const [auth, setAuth] = useState(false);
    const userEmail = useSelector((state) => state.userReducer.userInfo.email);
    const profileInfo = useSelector((state) => state.userReducer.profileInfo);
    const lastApplication = useSelector((state) => state.userReducer.profileInfo.applications.currentApplication);
    console.log(lastApplication);

    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    useLayoutEffect(() => {
        authenticate();
    }, []);

    const travelOptionSelection = (e) => {
        setTravelMethod(e.value);
    };

    const setLocation1 = (e) => {
        setPickUpLocation(e.target.value);
    };

    const setLocation2 = (e) => {
        setDropLocation(e.target.value);
    };

    const travelPeriodSelect = (e) => {
        setPassPeriod(e.value);
    };

    const addressProof = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setAddressProofDoc(e.target.files[0]);
    };
    const submitApplication = async (e) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        if (
            addressProofDoc !== null &&
            travelMethod !== null &&
            pickUpLocation !== null &&
            dropLocation !== null &&
            passPeriod !== null
        ) {
            setLoading(true);
            e.preventDefault();
            let form = new FormData();
            form.append('addressProof', addressProofDoc);
            form.append('travelOption', travelMethod);
            form.append('startLocation', pickUpLocation);
            form.append('endLocation', dropLocation);
            form.append('trvelPassPeriod', passPeriod);
            try {
                const res = await axios.post(
                    `${API_ROOT}/profile/newapp`,
                    form,
                    config
                );
                if (res.data.status === 200) {
                    dispatch(userProfileInfo(res.data.profi))
                    sethowSuccess(true)
                } else {
                    alert(res.data.errorMessage);
                }
            } catch (err) {
                alert(err);
            }
            setLoading(false);
        } else {
            alert('All Fields Are Mandatory !');
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };


    const closePopup = () => {
        sethowSuccess(false)
        navigate("/user/travel-pass/applications/past-applications")
    }
    return (
        <div>
            {auth ? (
                <>
                    <UserNavbar />
                    {loading ? (
                        <div className='loader-main'>
                            <Loader />
                        </div>
                    ) : (
                        <div className='new-application-page'>
                            {
                                lastApplication === undefined || lastApplication.applicationStatus === "Approved" ?
                                    <>
                                        {profileInfo.profileVerifystatus === 'Verified' ? (
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
                                                    <Form.Label>Name As Per ID Card</Form.Label>
                                                    <Form.Control
                                                        value={profileInfo.nameAsPerIdCard}
                                                        type='text'
                                                        placeholder='name@example.com'
                                                        readOnly
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Select Your Travel Option</Form.Label>
                                                    <Select
                                                        onChange={(e) => travelOptionSelection(e)}
                                                        className='dropdown-location'
                                                        options={travelOptions}
                                                        placeholder={'Select Travel Option'}
                                                        required
                                                    ></Select>
                                                </Form.Group>
                                                <Form.Group
                                                    className='mb-3'
                                                    controlId='exampleForm.ControlInput1'
                                                >
                                                    <Form.Label>Start Location</Form.Label>
                                                    <Form.Control
                                                        onChange={(e) => setLocation1(e)}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group
                                                    className='mb-3'
                                                    controlId='exampleForm.ControlInput1'
                                                >
                                                    <Form.Label>End Location</Form.Label>
                                                    <Form.Control
                                                        onChange={(e) => setLocation2(e)}
                                                        type='text'
                                                        placeholder='Chinchwad Railway Station / Talegaon Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Travel Pass Period</Form.Label>
                                                    <Select
                                                        className='dropdown-location'
                                                        options={PeriodOptions}
                                                        onChange={(e) => travelPeriodSelect(e)}
                                                        placeholder={'Select Period Of Your Pass'}
                                                        required
                                                    ></Select>
                                                </Form.Group>
                                                <Form.Group
                                                    className='mb-3'
                                                    controlId='exampleForm.ControlInput1'
                                                >
                                                    <Form.Label>Upload Address Proof</Form.Label>
                                                    <Form.Control
                                                        onChange={(e) => addressProof(e)}
                                                        accept='.png, .jpg, .jpeg, .pdf'
                                                        type='file'
                                                        placeholder='Address Proof'
                                                        required
                                                    />
                                                </Form.Group>
                                                {addressProofDoc === null ? null : (
                                                    <img className='address-doc' src={preview}></img>
                                                )}
                                                <Button
                                                    onClick={(e) => submitApplication(e)}
                                                    style={{
                                                        display: 'block',
                                                        marginTop: '1.4rem',
                                                        width: '100px',
                                                    }}
                                                    variant='primary'
                                                    type='submit'
                                                >
                                                    Apply
                                                </Button>
                                            </Form>
                                        ) : (
                                            <h3 className='verify-error'>
                                                Please make a profile first and send it for verification
                                            </h3>
                                        )}
                                    </>
                                    :
                                    <>
                                        {
                                            lastApplication.applicationStatus === "Under Process" ?
                                                <h1 style={{ margin: "auto" }}>You already have one application under process.</h1>
                                                :
                                                <h3>Please make a profile first and send it for verification</h3>
                                        }
                                    </>
                            }
                        </div>
                    )}
                    {
                        showSuccess ?
                            <div className='pass-app-successful'>
                                <h4 onClick={() => closePopup()}>X</h4>
                                <h3>Application Submitted Successfully !</h3>
                                <Button onClick={() => closePopup()}>View My Application</Button>
                            </div>
                            :
                            null
                    }
                </>
            ) : (
                <h3>You're not authorized to view the contents.</h3>
            )}
        </div>
    );
};

export default NewPassApplication;
