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
            <Route path="/admin/all-concession-applications" element={<AdminAllConcessionApp />}></Route>
            <Route path="/admin/all-concession-application/:id" element={<AdminSingleConcessionApp />}></Route>
            <Route path="/admin/approved-concession-application" element={<ConcessionGiven />} ></Route>
            <Route path="/user/travel-pass/applications" element={<PassApplication />}></Route>
            <Route path="/user/travel-pass/applications/new-application" element={<NewPassApplication />}></Route>
            <Route path="/user/travel-pass/applications/past-applications" element={<PassHistoryApplications />}></Route>
            <Route path="/user/travel-pass/applications/past-applications/:id" element={<UserPastConcessionApplication />}></Route>

          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
