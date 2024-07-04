// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileForm from "./components/edit/ProfileForm";
import Register from './components/registers/Register';
import Login from './components/login/Login';
import UserList from './components/user/UserList'; // Import UserList
import { Container } from "@mui/material";

const App = () => {
    return (
        <Router>
            <Container>
                <header className="App-header">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<ProfileForm />} />
                        <Route path="/users" element={<UserList />} /> {/* Thêm route UserList */}
                        {/* <Route path="/home" element={<div>Welcome to the homepage!</div>} /> */}
                    </Routes>
                </header>
            </Container>
            <ToastContainer />
        </Router>
    );
};

export default App;
