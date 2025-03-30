import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Card, CardMedia, Typography, TextField, Button, Checkbox, FormControlLabel, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom'
import image from '../../assets/6079434.jpg';

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    acceptedTerms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
})

const SignUp = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // const [acceptedTerms, setAcceptedTerms] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    // const handleSignUp = () => {
    //     if (!acceptedTerms) {
    //         setErrorMessage('You must accept the terms and conditions.')
    //         return;
    //     } 
    //     setErrorMessage('');
    //     console.log('Usuário cadastrado!')
    // }

    const onSubmit = (data) =>{
        console.log('usuário cadastrado:', data);
        setOpenSnackbar(true);
        reset(); //Clean the Textfields after signing up
    };

    return (
    <Box display='flex' height= '100vh' width='100%' fontSize='15px'>
        <Box flex={1} bgcolor='#f0f0f0' display='flex' alignItems='center' justifyContent='center'>
            <Box display='flex' flexDirection='column' width='70%' maxWidth='550px' height='770px' justifyContent='center' gap='10px'>
                {/* Title */}
                <Typography variant='h1' fontWeight='bold' fontSize='40px'>Sign Up</Typography>

                {/* Register */}
                <Typography variant='body1' color='textSecondary'>Already have an account?{" "}
                    <Typography component='span' color='primary' sx={{ cursor: 'pointer' }}>
                        <Link to='/' style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Sign in</Link>
                    </Typography>
                </Typography>

                {/* Required inputs: react-hook-form, @hookform/resolver/yup */}
                {/* If a required input does not get fullfilled, so use a MUI component snack(customized) bottom-left */}
                <TextField 
                        label="First name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        {...register('firstName')}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                />
                <TextField 
                        label="Last name"
                        type="text"
                        variant="outlined"
                        fullWidth
                        {...register('lastName')}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                />
                <TextField 
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                />
                <TextField 
                        label='password' 
                        type='password' 
                        variant='outlined' 
                        fullWidth
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                />

                {/* Terms and conditions  */}
                <Box>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                color='primary' 
                                // checked={acceptedTerms} 
                                onChange={(e) => setValue('acceptedTerms', e.target.checked)}
                            />} 
                        label={
                            <Typography>
                                I have read the{" "}
                                <Link to="#" style={{ color:'#007bff', textDecoration:'none'}}>
                                    terms and conditions
                                </Link>
                            </Typography>
                        }    
                    />
                    {/* If the user do not accept the terms, warn him/her and do not send the data */}
                    {/* A text has to appear has below this FormControlLabel instead of a alert*/}
                    {errors.acceptedTerms && (
                        <Typography color='error' variant='body2'>
                            {errors.acceptedTerms.message}
                        </Typography>
                    )}
                </Box>
                
                <Button variant='contained' color='secondary' size='large' onClick={handleSubmit(onSubmit)}>Sign up</Button>
            </Box>
        </Box>
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

        {/*  Snackbar success */}
        <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity='success'>
                User registred successfully!
            </Alert>
        </Snackbar>
    </Box>
  )
}

export default SignUp