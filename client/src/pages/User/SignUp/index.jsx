// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { Box, Card, CardMedia, Typography, TextField, Button, Checkbox, FormControlLabel, Snackbar, Alert } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom'
// import image from '../../../assets/6079434.jpg';
// import { fakeDatabase } from '../../utils/fakeDatabase/fakeDatabase';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';

// // Validation with yup
// const validationSchema = yup.object().shape({
//     firstName: yup.string().required('First name is required'),
//     lastName: yup.string().required('Last name is required'),
//     email: yup.string().email('Invalid email').required('Email is required'),
//     password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
//     acceptedTerms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
// })



const SignUp = () => {
//     const navigate = useNavigate();
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//     const [snackbarMessage, setSnackbarMessage] =  useState('');
//     const [acceptedTerms, setAcceptedTerms] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors }
//     } = useForm({
//         resolver: yupResolver(validationSchema)
//     });

//     // Function on submit
//     const onSubmit = (data) =>{
//         // Store the user's email e password in the fakeDatabase(localStorage)
//         fakeDatabase.setUser(data.firstName, data.lastName, data.email, data.password);
//         setSnackbarMessage('User registred successfully!');
//         setOpenSnackbar(true);

//         console.log('usuário cadastrado:', data);
//         reset(); //Clean the Textfields after signing up

//         setTimeout(() => navigate('/home'), 2000);

//     };

//     // Google login
//     const handleGoogleSignUp = (credentialResponse) => {
//         const token = credentialResponse.credential;
//         const decoded = jwtDecode(token);
    
//         if (decoded?.email) {
//             const existingUser = fakeDatabase.getUserByEmail(decoded.email);
    
//             if(existingUser) {
//                 setSnackbarMessage('Failed to register');
//                 setSnackbarSeverity('error');
//             } else {
//                 const nameParts = decoded.name.split(" ");
//                 const firstName = nameParts[0];
//                 const lastName = nameParts.slice(1).join(" ") || "Google User";

//                 fakeDatabase.setUser(firstName, lastName, decoded.email, "google-auth", decoded.picture);
                
//                 setSnackbarMessage('User registred successfully!')
//                 setSnackbarSeverity('success'); 
                
//                 setTimeout(() => navigate('/home'), 2000);
//             }
//             setOpenSnackbar(true)
//         }
//     }

    return (
        <></>
//     <Box display='flex' height= '100vh' width='100%' fontSize='15px'>
//         <Box flex={1} bgcolor='#f0f0f0' display='flex' alignItems='center' justifyContent='center'>
//             <Box display='flex' flexDirection='column' width='70%' maxWidth='550px' height='770px' justifyContent='center' gap='10px'>
//                 {/* Title */}
//                 <Typography variant='h1' fontWeight='bold' fontSize='40px'>Sign Up</Typography>

//                 {/* Register */}
//                 <Typography variant='body1' color='textSecondary'>Already have an account?{" "}
//                     <Typography component='span' color='primary' sx={{ cursor: 'pointer' }}>
//                         <Link to='/' style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Sign in</Link>
//                     </Typography>
//                 </Typography>

//                 {/* Required inputs: react-hook-form, @hookform/resolver/yup */}
//                 {/* If a required input does not get fullfilled, so use a MUI component snack(customized) bottom-left */}
//                 <TextField 
//                         label="First name"
//                         type="text"
//                         variant="outlined"
//                         fullWidth
//                         {...register('firstName')}
//                         error={!!errors.firstName}
//                         helperText={errors.firstName?.message}
//                 />
//                 <TextField 
//                         label="Last name"
//                         type="text"
//                         variant="outlined"
//                         fullWidth
//                         {...register('lastName')}
//                         error={!!errors.lastName}
//                         helperText={errors.lastName?.message}
//                 />
//                 <TextField 
//                         label="Email"
//                         type="email"
//                         variant="outlined"
//                         fullWidth
//                         {...register('email')}
//                         error={!!errors.email}
//                         helperText={errors.email?.message}
//                 />
//                 <TextField 
//                         label='password' 
//                         type='password' 
//                         variant='outlined' 
//                         fullWidth
//                         {...register('password')}
//                         error={!!errors.password}
//                         helperText={errors.password?.message}
//                 />

//                 {/* Terms and conditions  */}
//                 <Box>
//                     <FormControlLabel 
//                         control={
//                             <Checkbox 
//                                 color='primary' 
//                                 checked={acceptedTerms} 
//                                 onChange={(e) => setAcceptedTerms(e.target.checked)}
//                                 // {...register('acceptedTerms')}
//                             />} 
//                         label={
//                             <Typography>
//                                 I have read the{" "}
//                                 <Link to="#" style={{ color:'#007bff', textDecoration:'none'}}>
//                                     terms and conditions
//                                 </Link>
//                             </Typography>
//                         }    
//                     />
//                     {/* If the user do not accept the terms, warn him/her and do not send the data */}
//                     {/* A text has to appear has below this FormControlLabel instead of a alert*/}
//                     {/* {errors.acceptedTerms && (
//                         <Typography color='error' variant='body2'>
//                             {errors.acceptedTerms.message}
//                         </Typography>
//                     )} */}
//                 </Box>
//                 <GoogleLogin 
//                     onSuccess={handleGoogleSignUp}
//                     onError={() => console.log('Google sign-up failed')}
//                 />
//                 <Button 
//                     variant='contained' 
//                     color='secondary' 
//                     size='large' 
//                     onClick={handleSubmit(onSubmit)} 
//                     style={{borderRadius:'14px'}}
//                     disabled={!acceptedTerms}
//                 >
//                     Sign up
//                 </Button>
//             </Box>
//         </Box>
//         <Box flex={1} display='flex' alignItems='center' justifyContent='center'>
//             <Card sx={{ width: '100%', height: '100%'}}>
//                 <CardMedia 
//                     component='img'
//                     height='100%'
//                     image={image}
//                     alt='Illustration of a park'
//                 />
//             </Card>
//         </Box>

//         {/*  Snackbar success */}
//         <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
//             <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
//                 {snackbarMessage}
//             </Alert>
//         </Snackbar>
//     </Box>
    )
}

export default SignUp