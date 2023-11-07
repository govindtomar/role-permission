import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import {
    Typography,
    Box,
    Container,
    Card,
    Grid,
    OutlinedInput,
    InputAdornment,
    Stack
} from '@mui/material'
import { emiCalculator } from 'src/helpers/LoanHelper'
import PageHeader from '../components/PageHeader';
import Iconify from 'src/components/Iconify';
import LoanCalculatorResultChart from './LoanCalculatorResultChart'

const LoanSlider = styled(Slider)({
    height: 8,
    '& .MuiSlider-thumb': {
      height: 30,
      width: 30,
      backgroundColor: '#fff',
      border: '4px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
        display: 'none'
    },
});

const CardStyle = styled(Card)({
    marginTop:50,
    padding: 40
});

const CardBox = styled(Card)({
    paddingTop: 40,
    paddingBottom: 40
});

const TypographyHeader = styled(Typography)({
    textAlign: 'center',
    fontSize: 18
});

const TypographyAmount = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    fontSize: 25,
    color: theme.palette.primary.main
}));


export default function LoanCalculator() {
    const theme = useTheme()
    const [amount, setAmount] = useState(10000)
    const [interest, setInterest] = useState(8)
    const [duration, setDuration] = useState(12) //in months
    const [durationType, setDurationType] = useState('month')
    const [emiCalculate, setEmiCalculate] = useState({
        loanAmount: 0,
        emi: 0,
        interest: 0,
        full: 0
    })


    const range = {
        amount : {
            min : 1000,
            max : 200000
        },
        interest : {
            min : 1,
            max : 30
        },
        duration : {
            years : {
                min : 1,
                max : 20
            },
            months :  {
                min : 1,
                max : 60
            },
        }
    }

    useEffect(() => {
        setEmiCalculate(emiCalculator(amount, duration, interest))
        console.log('emiCalculate', emiCalculate)
    }, [amount, duration, interest])

    // const emiCalculator = emiCalculator(500000, 12*5, 8);

    // console.log('emi', emiCalculator.emi)
    // console.log('loanAmount', emiCalculator)
    // console.log('interest', emiCalculator.interest)
    // console.log('full', emiCalculator.full)
   
    const changeAmount = (event) => {
        if(event.target.value === ''){
            setAmount(1)
        }else{
            setAmount(Number(event.target.value))
        }
        
    }

    const changeInterest = (event) => {
        // console.log(event.target.value === '')
        if(event.target.value === ''){
            setInterest(1)
        }else{
            setInterest(Number(event.target.value))
        }
    }

    const changeDuration = (event) => {
        if(event.target.value === ''){
            setDuration(1)
        }else{
            setDuration(Number(event.target.value))
        }        
    }

    return(
        <React.Fragment>
            <PageHeader>Loan Calculator</PageHeader>
            <Container>            
                <CardStyle>
                    <Grid container spacing={3}>
                        <Grid item xs={7}>
                            <Box>
                                <Stack direction="row"  mb={2}>
                                    <Typography component="h3" sx={{fontSize:21}}>Loan Amount</Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <OutlinedInput
                                        sx={{
                                            width: 200,
                                        }}
                                        size="small"
                                        color="form"
                                        value={amount}
                                        onChange={changeAmount}
                                        placeholder="Search user..."
                                        startAdornment={
                                        <InputAdornment position="start">
                                            <Iconify icon="ic:sharp-currency-rupee" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                                        </InputAdornment>
                                        }
                                    />
                                </Stack>
                                <LoanSlider 
                                    defaultValue={amount}
                                    value={amount} 
                                    onChange={changeAmount}
                                    aria-label="Default" 
                                    valueLabelDisplay="auto"
                                    min={range.amount.min}
                                    max={range.amount.max} 
                                />
                            </Box>
                            <Box mt={10}>
                                <Stack direction="row"  mb={2}>
                                    <Typography component="h3" sx={{fontSize:21}}>Rate of Interest</Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <OutlinedInput
                                        sx={{
                                            width: 200,
                                        }}
                                        size="small"
                                        color="form"
                                        value={interest}
                                        onChange={changeInterest}
                                        placeholder="Search user..."
                                        startAdornment={
                                        <InputAdornment position="start">
                                            <Iconify icon="la:percent" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                                        </InputAdornment>
                                        }
                                    />
                                </Stack>
                                <LoanSlider 
                                    defaultValue={interest} 
                                    value={interest}
                                    aria-label="Default" 
                                    valueLabelDisplay="auto" 
                                    onChange={changeInterest}
                                    min={range.interest.min}
                                    max={range.interest.max}
                                />
                            </Box>
                            <Box mt={10}>
                                <Stack direction="row"  mb={2}>
                                    <Typography component="h3" sx={{fontSize:21}}>Loan Tenure</Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <OutlinedInput
                                        sx={{
                                            width: 200,
                                        }}
                                        size="small"
                                        color="form"
                                        value={duration}
                                        onChange={changeDuration}
                                        placeholder="Search user..."
                                        startAdornment={
                                        <InputAdornment position="start">
                                            <Iconify icon="fluent-mdl2:date-time-mirrored" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                                        </InputAdornment>
                                        }
                                        endAdornment={
                                            <InputAdornment position="end" sx={{textTransform: 'capitalize'}}>
                                                {durationType}
                                                {/* <Iconify icon="fluent-mdl2:date-time-mirrored" sx={{ color: 'text.disabled', width: 20, height: 20 }} /> */}
                                            </InputAdornment>
                                        }
                                    />
                                </Stack>
                                <LoanSlider 
                                    defaultValue={duration} 
                                    value={duration}
                                    aria-label="Default" 
                                    valueLabelDisplay="auto" 
                                    onChange={changeDuration}
                                    min={durationType === 'month'? range.duration.months.min : range.duration.years.min}
                                    max={durationType === 'month'? range.duration.months.max : range.duration.years.max}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <LoanCalculatorResultChart
                                title="Current Visits"
                                chartData={[
                                { label: 'Principal amount', value: emiCalculate.loanAmount },
                                { label: 'Interest amount', value: emiCalculate.interest },
                                ]}
                                chartColors={[
                                    theme.palette.primary.main,
                                    theme.palette.chart.blue[0],
                                ]}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} sx={{marginTop:5}}>
                        <Grid item xs={3}>                            
                            <CardBox>
                                <TypographyAmount component="h4">
                                    <Iconify icon="ic:sharp-currency-rupee" sx={{ width: 20, height: 20 }} />
                                    { emiCalculate.loanAmount }                                 
                                </TypographyAmount>
                                <TypographyHeader component="h3">Loan Amount</TypographyHeader>
                            </CardBox>
                        </Grid>
                        <Grid item xs={3}>
                            <CardBox>
                                <TypographyAmount component="h4">
                                    <Iconify icon="ic:sharp-currency-rupee" sx={{ width: 20, height: 20 }} />
                                    { emiCalculate.interest }
                                </TypographyAmount>
                                <TypographyHeader component="h3">Loan Interest</TypographyHeader>
                            </CardBox>
                        </Grid>
                        <Grid item xs={3}>
                            <CardBox>
                                <TypographyAmount component="h4">
                                    <Iconify icon="ic:sharp-currency-rupee" sx={{ width: 20, height: 20 }} />
                                    { emiCalculate.emi }
                                </TypographyAmount>
                                <TypographyHeader component="h3">Loan EMI/Month</TypographyHeader>
                            </CardBox>
                        </Grid>
                        <Grid item xs={3}>
                            <CardBox>
                                <TypographyAmount component="h4">
                                    <Iconify icon="ic:sharp-currency-rupee" sx={{ width: 20, height: 20 }} />
                                    { emiCalculate.full }
                                </TypographyAmount>
                                <TypographyHeader component="h3">Total Amount</TypographyHeader>
                            </CardBox>
                        </Grid>
                    </Grid>
                </CardStyle>
            </Container>
        </React.Fragment>
            // console.log('emi', emiCalculator.emi)
    // console.log('loanAmount', emiCalculator)
    // console.log('interest', emiCalculator.interest)
    // console.log('full', emiCalculator.full)
    )
}