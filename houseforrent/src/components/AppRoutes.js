// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import ProfileForm0 from "../components/edit/ProfileForm0";
// import ChangePassword0 from "../components/changePassword/ChangePassword0";
// import UserPage from '../pages/UserPage';
// import MainPage from "../pages/MainPage";
// import ForrentHouse from '../components/forrenthouse/ForrentHouse';
// import MenuPage from '../pages/MenuPage';
// import AdminPage from '../pages/AdminPage';
// import ForrentHouseEdit from '../components/forrenthouse/ForrentHouseEdit';
// import Login from '../components/login/Login';
// import Register from '../components/registers/Register';
// import DetailPage from '../pages/DetailPage';
// import PrivateRoute from './PrivateRoute';

// const AppRoutes = ({ isLoggedIn }) => {
//     return (
//         <Routes>
//             <Route path="/register" element={<Register />} />
//             <Route path="/login" element={<Login />} />
//             <PrivateRoute path="/profile" element={<ProfileForm0 />} isLoggedIn={isLoggedIn} />
//             <PrivateRoute path="/change-password" element={<ChangePassword0 />} isLoggedIn={isLoggedIn} />
//             <PrivateRoute path="/users" element={<UserPage />} isLoggedIn={isLoggedIn} />
//             <Route path="/" element={<MainPage />} />
//             <PrivateRoute path="/forrent-house" element={<ForrentHouse />} isLoggedIn={isLoggedIn} />
//             <Route path="/detail" element={<DetailPage />} />
//             <PrivateRoute path="/menu" element={<MenuPage />} isLoggedIn={isLoggedIn} />
//             <PrivateRoute path="/main" element={<AdminPage />} isLoggedIn={isLoggedIn} />
//             <PrivateRoute path="/forrent-house/edit" element={<ForrentHouseEdit />} isLoggedIn={isLoggedIn} />
//         </Routes>
//     );
// };

// export default AppRoutes;