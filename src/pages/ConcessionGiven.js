import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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
    return (
        <div>
            {
                auth ? <>
                    <UserNavbar />
                    {
                        allApprovedConcessionReqs.length > 0 ?
                            <Table className='verification-req' striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Student Name</th>
                                        <th>Application Status</th>
                                        <th>Approved Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allApprovedConcessionReqs.map((req, i) => {
                                            return (
                                                <>
                                                    {
                                                        req.applications.allApplications.map((item) => {
                                                            if (item.applicationStatus === "Approved") {
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td>{i + 1}</td>
                                                                            <td>{req.nameAsPerIdCard}</td>
                                                                            <td>{item.applicationStatus}</td>
                                                                            <td>{moment(item.applicationAcceptedOn).format('LL')} </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            }
                                                        })
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
