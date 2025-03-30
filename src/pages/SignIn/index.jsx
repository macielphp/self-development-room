import React from 'react';
// import { makeStyles } from '@mui/styles';
import { Box, Card, CardMedia, Typography, TextField, Button } from "@mui/material";
import image from '../../assets/6079434.jpg';
import { Link } from 'react-router-dom';

// const useStyles = makeStyles({
//     container: {
//         display: 'flex',
//         flexDirection: 'row',
//     },
//     leftSide: {
//         width: '50%',
//         height: '100vh',
//         backgroundColor: '#ebf2f4'
//     },
//     rightSide: {
//         width: '50%',
//         height: '100vh'
//     }
// })

const SignIn = () => {
    // const classes = useStyles();

    return (
    <Box display='flex' height='100vh' width='100%' fontSize="15px">
        {/* Left Box */}
        <Box flex={1} bgcolor='#f0f0f0' display='flex' alignItems='center' justifyContent='center' >
            <Box display='flex' flexDirection='column' width='70%' maxWidth='550px' height='350px' backgroundColor='inherit' gap='10px'>

                {/* Title */}
                <Typography variant='h1' fontWeight='bold' fontSize='40px'>Sign in</Typography>

                {/* Register link */}
                <Typography variant='body1' color='textSecondary'>Don't have an account?{" "} 
                    <Typography component='span' color='primary' sx={{cursor: 'pointer' }}>
                        <Link to='/signup' style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Sign up</Link>
                    </Typography>
                </Typography>

                {/* Input */}
                {/* <input type='email' placeholder='email@gmail.com' style={{ padding: '10px', borderRadius: '8px', border:'1px solid #323232'}} /> */}
                <TextField label='email' type='email' variant='outlined' fullWidth />

                {/* <input type='password' placeholder='*******' style={{ padding: '10px', borderRadius: '8px', border:'1px solid #323232'}} /> */}
                <TextField label='password' type='password' variant='outlined' fullWidth /> 

                {/* Forgot password */}
                <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', alignSelf: 'flex-start' }}>Forgot password</Typography>

                {/* Button Sign in */}
                {/* <button style={{ padding: "10px", borderRadius: "4px", background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}>
                        Sign in
                </button> */}
                <Button variant='contained' color='secondary' size='large'>
                    Sign in
                </Button>

            </Box>
        </Box>
        {/* Right Box */}
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

export default SignIn