import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileForm0 from "./components/edit/ProfileForm0";
import Register from './components/registers/Register';
import Login from './components/login/Login';
import UserList from './components/user/UserList'; // Import UserList
import { Container } from "@mui/material";
import DetailPage from './pages/DetailPage';
import ChangePassword0 from "./components/changePassword/ChangePassword0";
import MainPage from "./pages/MainPage";
import UserPage from './pages/UserPage';
import ForrentHouse from './components/forrenthouse/ForrentHouse';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';
import ForrentHouseEdit from './components/forrenthouse/ForrentHouseEdit';

const App = () => {
    return (
        <Router>
            <Container>
                <header className="App-header">
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<ProfileForm0 />} />
                        <Route path="/change-password" element={<ChangePassword0 />} />
                        <Route path="/users" element={<UserPage />} />
                        <Route path="/" element={<MainPage />} />
                        <Route path="/forrent-house" element={<ForrentHouse />} />
                        <Route path="/detail" element={<DetailPage />} />
                        <Route path="/menu" element={<MenuPage />} />
                        {/*<Route path="/main" element={<MainPage />}  của ánh />*/}
                        <Route path="/main" element={<AdminPage />} />
                        <Route path="/forrent-house/edit" element={<ForrentHouseEdit/>} />
                    </Routes>
                </header>
            </Container>
            <ToastContainer />
        </Router>
    );
};

export default App;