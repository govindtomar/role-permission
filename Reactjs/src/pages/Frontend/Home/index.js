import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Paper, Button } from '@mui/material'

import Slider from './components/Slider';
import LoanService from '../components/LoanService';
import ContactUs from './components/ContactUs'
import LoanProcess from './components/LoanProcess';



const PaperStyle = styled(Paper)(({ theme }) => ({

}));
  

const Home = () => {    

    return (
        <PaperStyle>
            <Slider />
            <LoanProcess />
            <LoanService/> 
            <ContactUs />
        </PaperStyle>
    );
}

export default Home
