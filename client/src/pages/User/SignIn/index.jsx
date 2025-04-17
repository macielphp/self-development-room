// import React, { useState } from 'react';
// import { Box, Card, CardMedia, Typography, TextField, Button, Alert, Snackbar } from "@mui/material";
// import { Link, useNavigate } from 'react-router-dom';
// import image from '../../../assets/6079434.jpg';
// import { fakeDatabase } from '../../utils/fakeDatabase/fakeDatabase';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";

// const SignIn = () => {
//     const navigate = useNavigate();
//     const [email, setEmail]  = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');

//     const handleSignIn = () => {
//         const trimmedEmail = email.trim();
//         const trimmedPassword = password.trim();

//         const user = fakeDatabase.getUserByEmail(trimmedEmail);

//         if(user && user.password === trimmedPassword){
//             // if the login successed, so redirect to the Home page
//             navigate('/home');
//         } else {
//             setError('Invalid email or password');
//         };
//     };
    
//     const handleGoogleLogin = (credentialResponse) => {
//         const token = credentialResponse.credential;
//         const userEmail = jwtDecode(token)?.email;

//         if (userEmail) {
//             const user = fakeDatabase.getUserByEmail(userEmail);

//             if (user){
//                 navigate('/home');
//             } else{
//                 setSnackbarMessage('User not found. Please, sign up.');
//                 setSnackbarOpen(true);
//             };
//         };
//     };

//     return (
//     <Box display='flex' height='100vh' width='100%' fontSize="15px">
//         {/* Left Box */}
//         <Box flex={1} bgcolor='#f0f0f0' display='flex' alignItems='center' justifyContent='center' >
//             <Box display='flex' flexDirection='column' width='70%' maxWidth='550px' height='350px' backgroundColor='inherit' gap='10px'>

//                 {/* Title */}
//                 <Typography variant='h1' fontWeight='bold' fontSize='40px'>Sign in</Typography>

//                 {/* Register link */}
//                 <Typography variant='body1' color='textSecondary'>Don't have an account?{" "} 
//                     <Typography component='span' color='primary' sx={{cursor: 'pointer' }}>
//                         <Link to='/signup' style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</Link>
//                     </Typography>
//                 </Typography>

//                 {/* Input */}
//                 <TextField 
//                     label='email' 
//                     type='email' 
//                     variant='outlined' 
//                     fullWidth 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)}/>

//                 <TextField 
//                     label='password' 
//                     type='password' 
//                     variant='outlined' 
//                     fullWidth 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)}/> 

//                 {/* Forgot password */}
//                 <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', alignSelf: 'flex-start' }}>
//                     <Link to='/resetpassword' style={{ color: '#007bff', textDecoration: 'none' }}>Forgot password</Link>
//                 </Typography>

//                 {/* Button Sign in */}
//                 {/* <button style={{ padding: "10px", borderRadius: "4px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
//                         Sign in
//                 </button> */}

//                 {error && <Alert severity='error'>{error}</Alert>}

//                 <Button variant='contained' color='secondary' size='large' onClick={handleSignIn} style={{borderRadius:'14px'}} >
//                     Sign in
//                 </Button>
//                 <GoogleLogin 
//                 onSuccess={handleGoogleLogin} 
//                 onError={() => console.log('Loging failed')} />
//             </Box>
//         </Box>
//         {/* Right Box */}
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
//         {/* Snackbar for feedback */}
//         <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}
//             message = {snackbarMessage}
//             anchorOrigin = {{ vertical: 'top', horizontal: 'center' }}    
//         />
//     </Box>
//     )
// }

// export default SignIn