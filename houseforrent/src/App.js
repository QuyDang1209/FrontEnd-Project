import React from 'react';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/registers/Register';
import Login from './components/login/Login';
export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Định nghĩa các route khác ở đây */}
        <Route path="/home" element={<div>Welcome to the homepage!</div>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
