import moment from 'moment';
import React, { useLayoutEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../components/userNavbar/UserNavbar';

const AdminAllConcessionApp = () => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate()
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };
    useLayoutEffect(() => {
        authenticate();
    }, []);

    const allConcessionReqs = useSelector((state) => state.userReducer.getConcessionReqs)

    const viewConcessionReq = (req, id) => {
        navigate(`/admin/all-concession-application/${id}`, { state: { req: req } })
    }
    return (
        <>
            {
                auth ?
                    <>
                        <UserNavbar />

                        {
                            allConcessionReqs !== undefined ?
                                <>
                                    {
                                        allConcessionReqs.length > 0 ?
                                            <>
                                                <Table className='verification-req' striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Sr.No</th>
                                                            <th>Student Name</th>
                                                            <th>Application Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            allConcessionReqs.map((req, i) => {
                                                                console.log(req)
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td>{i + 1}</td>
                                                                            <td>{req.name}</td>
                                                                            <td style={{ color: "red", fontWeight: "600" }}>{req.applicationStatus}</td>
                                                                            <td><Button onClick={() => viewConcessionReq(req, req._id)} variant="success" size='sm'>View</Button></td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            </>
                                            :
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <h1>No New Reqs</h1>
                                            </div>

                                    }
                                </>

                                :
                                <h1>No New Concession Requests. </h1>
                        }
                    </>
                    :
                    <h1>You're Not Authorized To View The Content.</h1>
            }
        </>
    )
};

export default AdminAllConcessionApp;
