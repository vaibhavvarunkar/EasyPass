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
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/home" element={<UserHomePage />} />
            <Route path="/user/profile" element={<UserProfilePage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
