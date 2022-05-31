import React, { useLayoutEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../components/userNavbar/UserNavbar';

const TrainAdminPassReqs = () => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const authenticate = () => {
        localStorage.getItem('token') ? setAuth(true) : setAuth(false);
    };

    const busPassReqs = useSelector((state) => state.userReducer.getTrainPassReqs)
    console.log(busPassReqs);

    useLayoutEffect(() => {
        authenticate()
    })

    const viewPassPage = (req) => {
        navigate(`/admin/train/train-pass-requests/${req.paymentId}`, { state: { req: req } })
    }
    return (
        <>
            {
                auth ?
                    <>
                        <UserNavbar />

                        {
                            busPassReqs !== undefined ?
                                <>
                                    {
                                        busPassReqs.length > 0 ?
                                            <>
                                                <Table className='verification-req' striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Sr.No</th>
                                                            <th>Student Name</th>
                                                            <th>Pass Application Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            busPassReqs.map((req, i) => {
                                                                console.log(req)
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td>{i + 1}</td>
                                                                            <td>{req.name}</td>
                                                                            <td style={{ color: "red", fontWeight: "600" }}>{req.passGiven === false ? "Pending" : null}</td>
                                                                            <td><Button onClick={() => viewPassPage(req)} variant="success" size='sm'>View</Button></td>
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
}

export default TrainAdminPassReqs