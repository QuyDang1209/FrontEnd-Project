// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { UserContext } from './UserProvider';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(UserContext);
//   const [showMessage, setShowMessage] = useState(false);

//   useEffect(() => {
//     if (!user) {
//       setShowMessage(true);
//       toast.warn('You have to login');
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <>
//         {showMessage && (
//           <div style={{ color: 'red', marginBottom: '10px' }}>
//             You have to login
//           </div>
//         )}
//         <Navigate to="/login" replace />
//       </>
//     );
//   }

//   return children;
// };

// export default ProtectedRoute;