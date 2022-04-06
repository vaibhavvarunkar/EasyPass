import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';

const PassHistoryApplications = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState(false);
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    const userApplications = useSelector((state) => state.userReducer.profileInfo.applications.allApplications);
    useLayoutEffect(() => {
        authenticate();
    }, []);


    const ViewSingleApp = (id) => {
        navigate(`/user/travel-pass/applications/past-applications/${id}`)
    }
    return (<div>
        {auth ?
            <>
                <UserNavbar />
                <div>
                    {
                        userApplications === undefined || userApplications.length === 0 ?
                            <>
                                <h1>No Applications</h1>
                            </>
                            :
                            <>
                                <Table className='verification-req' striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>Application Date</th>
                                            <th>Application Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userApplications.length > 0 ? <>
                                                {
                                                    userApplications.map((req, i) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{i + 1}</td>
                                                                    <td>{moment(req.appliedOn).format('LL')}</td>
                                                                    <td>{req.applicationStatus}</td>
                                                                    <td><Button variant="success" onClick={() => ViewSingleApp(req._id)} size='sm'>View</Button></td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                                :
                                                <h1>No Verification Requests</h1>
                                        }
                                    </tbody>
                                </Table>
                            </>
                    }
                </div>
            </>
            :
            <h3>You're not authorized to view the contents.</h3>}
    </div>
    )
};

export default PassHistoryApplications;
