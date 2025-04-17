import React,{ useState } from 'react'
import {
    Box, Button, Container, TextField, Typography, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try{
            const res = await axios.post('http://localhost:3001/admin/login', form);
            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin/dasboard');
        } catch{
            setError('Invalid email/password')
        }
    }
  return (
    <Container maxWidth="xs">
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <Typography variant="h5">Admin Login</Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Senha"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                {error && (
                    <Alert severity="error" style={{ marginTop: 10 }}>
                        {error}
                    </Alert>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login In
                </Button>
            </form>
        </Box>
    </Container>
  )
}

export default AdminLogin