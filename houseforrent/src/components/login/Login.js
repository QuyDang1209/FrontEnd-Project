import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Box, Typography, Card, CardContent, Checkbox, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Không được để trống');
      return;
    }
    try {

      let activeRes = await axios.get('http://localhost:8080/api/user/active/' + formData.email);
      console.log(activeRes);
      if(activeRes.data.isActive === false){
        toast.error('Tài khoản hiện tại đang tạm khóa, vui lòng liên hệ với chúng tôi để được khắc phục');
        return;
      }

      let res = await axios.post('http://localhost:8080/api/auth/login', formData);
      const user = res.data;
      
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Login successful!');
      navigate('/main');
    } catch (error) {
      toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu của bạn');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#508bfc', minWidth: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} md={8} lg={6}>
            <Card sx={{ borderRadius: '1rem', boxShadow: 3 }}>
              <CardContent sx={{ p: 5, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom>Login</Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    type="email"
                    id="typeEmailX-2"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    type="password"
                    id="typePasswordX-2"
                    name="password"
                    label="Password"
                    variant="outlined"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mb: 4 }}
                  >
                    Login
                  </Button>
                  <Link to="/register">Don't have an account? Register here.</Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
