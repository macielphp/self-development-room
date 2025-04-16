import React, { useState } from 'react'
import { Box, Card, CardMedia, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import image from '../../assets/6079434.jpg';
import { fakeDatabase } from '../../utils/fakeDatabase/fakeDatabase';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleResetPassword = () => {
        const user = fakeDatabase.getUserByEmail(email);

        if(user) {
            setSuccess(true);
            setOpenSnackbar(true);
            setError('');
        } else{
            setSuccess(false);
            setOpenSnackbar(true);
            setError('Email not found. Please check the email address.');
        }
    };
    
  return (
    <Box display='flex' height='100vh' width='100%' fontSize="15px">
        {/* Left Box */}
        <Box flex={1} bgcolor='#f0f0f0' display='flex' alignItems='center' justifyContent='center' >
            <Box display='flex' flexDirection='column' width='70%' maxWidth='550px' height='350px' backgroundColor='inherit' gap='10px'>
                
                {/* Title */}
                <Typography variant='h1' fontWeight='bold' fontSize='40px'>Reset password</Typography>

                {/* Register link */}
                <Typography variant='body1' color='textSecondary'>You can try again to{" "} 
                    <Typography component='span' color='primary' sx={{cursor: 'pointer' }}>
                        <Link to='/' style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>sign in</Link>
                    </Typography>
                </Typography>

                {/* Input */}
                <TextField 
                    label='Email address' 
                    type='email' 
                    variant='outlined' 
                    fullWidth 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant='contained' color='secondary' size='large' style={{borderRadius:'14px'}} onClick={handleResetPassword} >
                    Send recovery link
                </Button>

                {/* Snackbar for success or error message */}
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                    <Alert onClose={() => setOpenSnackbar(false)} severity={success ? 'success' : 'error'}>
                        {success ? 'Password reset link has been sent!' : error}
                    </Alert>
                </Snackbar> 
            </Box>
        </Box>

        {/* Rigth Box */}
        <Box flex={1} display='flex' alignItems='center' justifyContent='center'>
            <Card sx={{ width: '100%', height: '100%'}}>
                <CardMedia 
                    component='img'
                    height='100%'
                    image={image}
                    alt='Illustration of a park'
                />
            </Card>
        </Box>
    </Box>
  )
}

export default ResetPassword