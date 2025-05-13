import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { private_safeAlpha } from '@mui/system';
import { Link } from '@mui/material';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import MyProfileTest from './MyProfileTest';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function MyProfile() {
  
  return (
   <>
    <MyProfileTest/>
    
   </>
     
   
   

  )
}
