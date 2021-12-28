import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SuccessRegister from './pages/SuccessRegister';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/successful" element={<SuccessRegister />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
