import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "@mui/material";
import ProfileForm0 from "./components/edit/ProfileForm0";
import Register from './components/registers/Register';
import Login from './components/login/Login';
import UserList from './components/user/UserList';
import DetailPage from './pages/DetailPage';
import ChangePassword0 from "./components/changePassword/ChangePassword0";
import MainPage from "./pages/MainPage";
import UserPage from './pages/UserPage';
import ForrentHouse from './components/forrenthouse/ForrentHouse';
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';
import ForrentHouseEdit from './components/forrenthouse/ForrentHouseEdit';
import SimpleSlider from './test/SimpleSlider';
import Booking from './components/booking/Booking';
import BookingsPage from "./pages/BookingsPage"; // Import BookingsPage
import ForrentHousePage from './pages/ForrentHousePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
                        {/* <Route path="/menu" element={<MenuPage />} /> */}
                        <Route path="/booking/:id" element={<Booking />} />
                        <Route path="/main" element={<AdminPage />} />
                        <Route path="/forrent-house/edit" element={<ForrentHouseEdit />} />
                        <Route path="/forrent-house/edit/:id" element={<ForrentHouseEdit />} />
                        <Route path="/bookings/user/:userId" element={<BookingsPage />} />
                        <Route path="/view-bookings" element={<BookingsPage />} />
                        <Route path="/house" element={<ForrentHousePage/>}/>
                    </Routes>
                </header>
                <ToastContainer />
            </Container>
        </Router>
        
    );
};

export default App;
