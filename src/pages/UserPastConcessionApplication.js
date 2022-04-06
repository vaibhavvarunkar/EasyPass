import axios from 'axios';
import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';
import "../styles/userPastConcessionApplication.css"
import { API_ROOT } from '../constants';
import { FileSaver } from 'file-saver';

const UserPastConcessionApplication = () => {
    const { id } = useParams();
    const [auth, setAuth] = useState(false);
    const application = useSelector(
        (state) => state.userReducer.profileInfo.applications.allApplications
    );
    const required_application = application.filter((app) => app._id === id);

    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };

    useLayoutEffect(() => {
        authenticate();
    }, []);

    const downloadPdf = async () => {
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            const res = await axios.get(`${API_ROOT}/profile/pdf`, config)
            console.log(res)
            var blob = new Blob(res.data, {
                type: "application/pdf;charset=utf-8"
            })
            FileSaver.saveAs(blob, "ConcessionLetter.pdf");
        }
        catch (err) {
            alert(err)
        }
    }

    return <div className='pass-div'>
        {
            auth ?
                <>
                    <UserNavbar />
                    <div className='past-concession-letter-app'>
                        <Form className='past-form'>
                            <Form.Group>
                                <Form.Label>Application Status</Form.Label>
                                <Form.Control
                                    value={required_application[0].applicationStatus}
                                    type='text'
                                    placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Application Date</Form.Label>
                                <Form.Control
                                    value={moment(required_application[0].appliedOn).format('LL')}
                                    type='text'
                                    placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Selected Travel Option</Form.Label>
                                <Form.Control
                                    value={required_application[0].travelOption}
                                    type='text'
                                    placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Start Location</Form.Label>
                                <Form.Control
                                    value={required_application[0].startLocation}
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
                                    value={required_application[0].endLocation}
                                    type='text'
                                    placeholder='Chinchwad Railway Station / Talegaon Bus Stop'
                                />
                            </Form.Group>
                            <Form.Group
                                className='mb-3'
                                controlId='exampleForm.ControlInput1'
                            >
                                <Form.Label>Uploaded Address Proof</Form.Label>
                            </Form.Group>
                            <img className='address-doc' src={required_application[0].addressProof}></img>

                        </Form>
                        <div className='download-pdf'>
                            {
                                required_application[0].applicationStatus === "Approved" ?
                                    <Button size='md' onClick={() => downloadPdf()} variant='success'>Click Here To Download Your Concession Letter</Button>

                                    :
                                    null
                            }
                        </div>
                        <br></br>
                    </div>
                </>
                : <>
                    <h1>You Are Not Authorized To View The Page Content</h1>
                </>
        }</div>
};

export default UserPastConcessionApplication;
