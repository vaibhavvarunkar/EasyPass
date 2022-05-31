import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import store, { persistor } from "./redux/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import UserHomePage from './pages/UserHomePage';
import UserProfilePage from './pages/UserProfilePage';
import AdminSignup from './pages/AdminSignup';
import AdminScreen from './pages/AdminScreen';
import AdminProfile from './pages/AdminProfile';
import AdminVerificationReq from './pages/AdminVerificationReq';
import StudentVerificationSingle from './pages/StudentVerificationSingle';
import VerifiedStudents from './pages/VerifiedStudents';
import PassApplication from './pages/PassApplication';
import NewPassApplication from './pages/NewPassApplication';
import PassHistoryApplications from './pages/PassHistoryApplications';
import UserPastConcessionApplication from './pages/UserPastConcessionApplication';
import AdminAllConcessionApp from './pages/AdminAllConcessionApp';
import AdminSingleConcessionApp from './pages/AdminSingleConcessionApp';
import ConcessionGiven from './pages/ConcessionGiven';
import TrainAdminHome from './pages/TrainAdmin/TrainAdminHome';
import BusAdminHome from './pages/Bus Admin/BusAdminHome';
import SingleVerifiedStudent from './pages/SingleVerifiedStudent';
import SingleConcessionGiven from './pages/SingleConcessionGiven';
import BusAdminPassReqs from './pages/Bus Admin/BusAdminPassReqs';
import BusAdminSinglePassReq from './pages/Bus Admin/BusAdminSinglePassReq';
import BusAdminApprovedReqs from './pages/Bus Admin/BusAdminApprovedReqs';
import BusAdminSingleApprovedReq from './pages/Bus Admin/BusAdminSingleApprovedReq';
import TrainAdminPassReqs from './pages/TrainAdmin/TrainAdminPassReqs';
import TrainAdminSinglePassReq from './pages/TrainAdmin/TrainAdminSinglePassReq';
import TrainAdminApprovedReqs from './pages/TrainAdmin/TrainAdminApprovedReqs';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about/" element={<About />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/user/home/" element={<UserHomePage />} />
            <Route path="/user/profile/" element={<UserProfilePage />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/home" element={<AdminScreen />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/student-verification" element={<AdminVerificationReq />} />
            <Route path="/admin/student-verification/:id" element={<StudentVerificationSingle />} />
            <Route path="/admin/verified-students" element={<VerifiedStudents />} />
            <Route path="/admin/verified-students/:id" element={<SingleVerifiedStudent />} />
            <Route path="/admin/all-concession-applications" element={<AdminAllConcessionApp />}></Route>
            <Route path="/admin/all-concession-application/:id" element={<AdminSingleConcessionApp />}></Route>
            <Route path="/admin/approved-rejected-concession-application" element={<ConcessionGiven />} ></Route>
            <Route path="/user/travel-pass/applications" element={<PassApplication />}></Route>
            <Route path="/user/travel-pass/applications/new-application" element={<NewPassApplication />}></Route>
            <Route path="/user/travel-pass/applications/past-applications" element={<PassHistoryApplications />}></Route>
            <Route path="/user/travel-pass/applications/past-applications/:id" element={<UserPastConcessionApplication />}></Route>
            <Route path="/admin/train/home" element={<TrainAdminHome />}></Route>
            <Route path="/admin/bus/home" element={<BusAdminHome />}></Route>
            <Route path="/admin/concession-application-approved/:id" element={<SingleConcessionGiven />}></Route>
            <Route path="/admin/bus/bus-pass-requests" element={<BusAdminPassReqs />} />
            <Route path="/admin/bus/bus-pass-requests/:id" element={<BusAdminSinglePassReq />} />
            <Route path="/admin/bus/bus-approved-pass-requests" element={<BusAdminApprovedReqs />} />
            <Route path="/admin/bus/bus-approved-pass-requests/:id" element={<BusAdminSingleApprovedReq />} />
            <Route path="/admin/train/train-pass-requests" element={<TrainAdminPassReqs />} />
            <Route path="/admin/train/train-pass-requests/:id" element={<TrainAdminSinglePassReq />} />
            <Route path="/admin/train/train-approved-pass-requests" element={<TrainAdminApprovedReqs />} />
            <Route path="/admin/train/train-approved-pass-requests/:id" element={<BusAdminSingleApprovedReq />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
