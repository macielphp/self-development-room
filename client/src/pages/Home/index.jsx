import React from 'react';
import { Box } from '@mui/material';
import PersistentDrawer from './../../components/PersistentDrawer';
import ProgressBar from '../../components/ProgressBar';
// import TestComponent from '../../components/TestComponent';

const Home = () => {

  return (
    <>
      <div>index</div>
      <PersistentDrawer />
      {/* <Box sx={{ padding: '20px'}}>
        <ProgressBar value={70} label="Your English progress" />
      </Box> */}
      {/* <TestComponent /> */}
    </>
  )
}

export default Home