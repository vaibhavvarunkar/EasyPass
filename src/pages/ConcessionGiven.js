import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';

const ConcessionGiven = () => {
    const [auth, setAuth] = useState(false);
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    const allApprovedConcessionReqs = useSelector((state) => state.userReducer.getApprovedConcessionReqs)
    useLayoutEffect(() => {
        authenticate();
    }, []);

    const navigate = useNavigate()

    const viewSingleConcessionGiven = (req, id) => {
        navigate(`/admin/concession-application-approved/${id}`, { state: { req: req } })
    }
    return (
        <div>
            {
                auth ? <>
                    <UserNavbar />
                    {
                        allApprovedConcessionReqs.length > 0 ?
                            <Table className='verification-req container' striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Student Name</th>
                                        <th>Application Status</th>
                                        <th>Approved Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allApprovedConcessionReqs.map((req, i) => {
                                            console.log(req)
                                            return (
                                                <>
                                                    {

                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{req.name}</td>
                                                            <td>{req.applicationStatus}</td>
                                                            <td>{moment(req.applicationAcceptedOn).format('LL')} </td>
                                                            <td> <Button onClick={() => viewSingleConcessionGiven(req, req._id)} variant="success" size='sm'>View</Button></td>
                                                        </tr>
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                            :
                            <h1>No Approved Applications</h1>
                    }
                </>
                    :
                    <h1>You're Not Authorized To View The Content.</h1>
            }
        </div>
    )
};

export default ConcessionGiven;
