import React, { useLayoutEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, UseNavigate } from 'react-router-dom';
import UserNavbar from "../components/userNavbar/UserNavbar"
import "../styles/adminVerificationReq.css"

const AdminVerificationReq = () => {
    const [auth, setAuth] = useState(false);
    const verifyStudents = useSelector((state) => state.userReducer.getVerificationReqs);
    const navigate = useNavigate()
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    useLayoutEffect(() => {
        authenticate();
    });

    const verifyStudent = (id) => {
        navigate(`/admin/student-verification/${id}`)
    }
    return (
        <div>
            {auth ?
                <div className='admin-verification-req'>
                    <UserNavbar />
                    <Table className='verification-req' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Student Name</th>
                                <th>College Name</th>
                                <th>Verification Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                verifyStudents.length ? <>
                                    {
                                        verifyStudents.map((req, i) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{req.nameAsPerIdCard}</td>
                                                        <td>{req.collegeName}</td>
                                                        <td style={{ color: "red", fontWeight: "600" }}>{req.profileVerifystatus}</td>
                                                        <td><Button onClick={() => verifyStudent(req._id)} variant="success" size='sm'>Verify</Button></td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </>
                                    :
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <h1>No Verification Requests</h1>
                                    </div>

                            }
                        </tbody>
                    </Table>
                </div>
                :
                <h1>You Are Not Authorized To View The Page Content</h1>}
        </div>
    );
};

export default AdminVerificationReq;
