import axios from 'axios';
import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';
import "../styles/userPastConcessionApplication.css"
import { API_ROOT } from '../constants';
import Loader from '../components/loader/Loader';
import { jsPDF } from "jspdf";

const UserPastConcessionApplication = () => {
    const [details, setDetails] = useState([])
    const { id } = useParams();
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const application = useSelector(
        (state) => state.userReducer.profileInfo.applications.allApplications
    );
    const required_application = application.filter((app) => app._id === id);

    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };

    const profile = useSelector((state) => state.userReducer.profileInfo)
    console.log(profile);
    useLayoutEffect(() => {
        authenticate();
    }, []);

    const [showPaymentDetails, setShowPaymentDetails] = useState(false)

    const paymentIdDetails = async (pid) => {
        const token = await localStorage.getItem("token")
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        setLoading(true)
        const body = {
            "paymentId": pid,
        }
        try {
            setLoading(true)
            const res = await axios.post(`${API_ROOT}/profile/payments`, body, config)
            console.log(res);
            if (res.data.status === 200) {
                setDetails(res.data.result)
                setShowPaymentDetails(true)
            }
        }
        catch (err) {
            alert(err)
        }
        setLoading(false)
    }
    const downloadPdf = () => {
        var doc = new jsPDF("p", "pt")
        doc.setFont("helvetica")
        doc.setFontSize(10);
        doc.text(50, 20, `Concession Application ID: ${required_application[0]._id}`)
        doc.text(50, 50, `Applicant Name: ${profile.nameAsPerIdCard}`)
        doc.text(50, 80, `Applicant Email: ${required_application[0].email}`)
        doc.text(50, 110, `Concession Application Date: ${required_application[0].appliedOn}`)
        doc.text(50, 140, `Concession Application Acceptance Date: ${required_application[0].applicationAcceptedOn}`)
        doc.text(50, 170, `Travel Route: ${required_application[0].startLocation} To ${required_application[0].endLocation}`)
        doc.text(50, 200, `Mode Of Travel: ${required_application[0].travelOption}`)
        doc.text(50, 230, `Travel Pass Period: ${required_application[0].travelPassPeriod}`)
        doc.text(50, 260, `College Name: ${profile.collegeName}`)
        doc.text(50, 290, `Branch: ${profile.branchName}`)
        doc.text(50, 320, `Current Year Of Study: ${profile.currentYearOfStudy}`)
        doc.text(50, 380, `Student Pic:`)
        doc.addImage(profile.profilePic, "JPEG", 150, 350, 200, 200)
        doc.save("concession.pdf")
    }


    return <div className='pass-div'>
        {
            auth ?
                <>
                    <UserNavbar />
                    {
                        loading ? <Loader />
                            :
                            <div className='past-concession-letter-app'>
                                <Form className='past-form'>
                                    {
                                        required_application[0].applicationStatus === "Approved" ?
                                            <>
                                                <Form.Group>
                                                    <Form.Label>Amount Paid</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].amountPaid === false ? "Pending" : "Paid"}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Amount</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].amount}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Application Date</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].appliedOn}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Application Approved Date</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].applicationAcceptedOn}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                            </>

                                            :
                                            null
                                    }
                                    {
                                        required_application[0].amountPaid === true ?
                                            <>
                                                <Form.Group>
                                                    <Form.Label>Payment ID</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].paymentId}
                                                        type='text'
                                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                                    />
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Payment Date</Form.Label>
                                                    <Form.Control
                                                        value={required_application[0].paymentPaidOn}
                                                        type='text'
                                                    />
                                                </Form.Group>
                                            </>

                                            :
                                            null

                                    }
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
                                    <Form.Label>Start Location</Form.Label>
                                    <Form.Control
                                        value={required_application[0].startLocation}
                                        type='text'
                                        placeholder='Talegaon Railway Station / Nigdi Bus Stop'
                                    />
                                    <Form.Group
                                        className='mb-3'
                                        controlId='exampleForm.ControlInput1'
                                    >
                                        <Form.Label>Uploaded Address Proof</Form.Label>
                                    </Form.Group>
                                    <img className='address-doc' src={required_application[0].addressProof}></img>
                                </Form>
                                <br></br>
                                {
                                    required_application[0].applicationStatus === "Approved" ?
                                        <div style={{ display: "flex", height: "100px", justifyContent: "center" }}>
                                            <Button onClick={() => downloadPdf()} variant='warning' style={{ height: "50px", width: "300px !important" }}>Download Concession Letter</Button>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    required_application[0].amountPaid === true && showPaymentDetails === false ?
                                        <div style={{ display: "flex", height: "100px", justifyContent: "center" }}>
                                            <Button style={{ height: "50px", width: "300px !important" }} onClick={() => paymentIdDetails(required_application[0].paymentId)}>View Payment Details</Button>
                                        </div>
                                        :
                                        null
                                }
                                <br></br>
                            </div>
                    }
                    {
                        showPaymentDetails ? <>
                            <div className='past-concession-letter-app'>
                                <Form className='past-form'>
                                    <Form.Group>
                                        <Form.Label>Order ID</Form.Label>
                                        <Form.Control
                                            value={details.order_id}
                                            type='text'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Contact</Form.Label>
                                        <Form.Control
                                            value={details.contact}
                                            type='text'
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            value={details.email}
                                            type='text'
                                        />
                                    </Form.Group>
                                </Form>
                                <br></br>
                            </div>
                        </> :
                            null
                    }
                </>
                : <>
                    <h1>You Are Not Authorized To View The Page Content</h1>
                </>
        }</div>
};

export default UserPastConcessionApplication;
