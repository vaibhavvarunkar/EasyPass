import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';

const VerifiedStudents = () => {
    const [auth, setAuth] = useState(false);
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    useLayoutEffect(() => {
        authenticate()
    })

    const navigate = useNavigate()

    const verifiedStudents = useSelector((state) => state.userReducer.getVerifiedProfiles);
    console.log(verifiedStudents)

    const viewSingleVerified = (req, id) => {
        navigate(`/admin/verified-students/${id}`, { state: { req: req } })
    }
    return (
        <div>
            {
                auth
                    ? <div className='admin-verification-req'>
                        <UserNavbar />
                        <Table className='verification-req' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Student Name</th>
                                    <th>College Name</th>
                                    <th>Verification Status</th>
                                    <th>Verification Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    verifiedStudents.length ? <>
                                        {
                                            verifiedStudents.map((req, i) => {
                                                console.log(req)
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{req.nameAsPerIdCard}</td>
                                                            <td>{req.collegeName}</td>
                                                            <td style={{ color: "green", fontWeight: "600" }}>{req.profileVerifystatus}</td>
                                                            {
                                                                req.date.length > 1 ?
                                                                    <td>{moment(req.profileVerifyDate).format('LL')} </td>
                                                                    :
                                                                    <td>Not Available</td>
                                                            }
                                                            <td><Button onClick={() => viewSingleVerified(req, req._id)} variant="success" size='sm'>View</Button></td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                        :
                                        <h1>No Verified Students</h1>
                                }
                            </tbody>
                        </Table>
                    </div>
                    :
                    <h1>Not Authorized To View The Contents !</h1>
            }
        </div>
    )
}

export default VerifiedStudents
