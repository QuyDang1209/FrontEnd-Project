import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import HeaderDetail from '../HeaderDetail';
import Footer from '../Footer';
import HeaderDetail from '../HeaderDetail';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    active: 1,
    role: 1,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [users,setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/user')
    .then((response) => setUsers(response.data))
  },[]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 

   const validateForm = () => {
    let newErrors = {};
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const phoneRegex = /^\d+$/;
    if (!formData.name) newErrors.name = "Tên không được để trống";
    if (!formData.address) newErrors.address = "Địa chỉ không được để trống";
    for(let i = 0; i < users.length; i++){
      if(users[i].phone === formData.phone){
        newErrors.phone = "Số điện thoại này đã tồn tại, vui lòng đăng kí số điện thoại khác";
        break;
      }
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = "Số điện thoại không được để trống";
    
    if (!formData.dob) newErrors.dob = "Ngày tháng năm sinh không được để trống";
    for(let i = 0; i < users.length; i++){
      if(users[i].email === formData.email){
        newErrors.email = "Email này đã tồn tại, vui lòng đăng kí email khác";
        break;
      }
    }
    if (!formData.email) newErrors.email = "Email không được để trống";
    if (!formData.password || formData.password.length < 6 || formData.password.length > 32) newErrors.password = "Mật khẩu phải có độ dài từ 6-32 kí tự";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu không trùng khớp";
    if (specialCharRegex.test(formData.fullname) || specialCharRegex.test(formData.address) || specialCharRegex.test(formData.phone)) {
      newErrors.specialChar = "Special characters are not allowed.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!validateForm()) return;
    try {
      const response = await axios.post('http://localhost:8080/api/user/create', formData);
      if (response.status === 200) {
        toast.success('Registration successful! Please log in.');
        navigate('/', { state: { email: formData.email, password: formData.password } });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Email này đã tồn tại, vui lòng đăng kí email khác');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  return (
    <>
    <HeaderDetail />
    <Box
      sx={{
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      />
      <Container maxWidth="sm" sx={{ zIndex: 2, backgroundColor: 'white', borderRadius: 2, p: 4 }}>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'black', fontSize: '2rem' }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.name || !!errors.specialChar}
              helperText={errors.name || errors.specialChar}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.address || !!errors.specialChar}
              helperText={errors.address || errors.specialChar}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.phone || !!errors.specialChar}
              helperText={errors.phone || errors.specialChar}
            />
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
    <Footer />
    </>
  );
}
