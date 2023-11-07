import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
// import { addLoanApplicant, getLoanType } from 'src/apis/front';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import ContactUsCard from './ContactUsCard'

import {SaveButton} from 'src/components/Button';
import { alpha, styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';
import { useSelector, useDispatch } from 'react-redux';

// material
import {
  TextField,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
// import SubmitButton from 'src/components/Button/SubmitButton';
import SeactionHeader from '../components/SectionHeader';
import { getLoanTypes } from 'src/store/api/loan-type';

// ----------------------------------------------------------------------


const PaperStyle = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  marginTop: 60
}));


export default function LoanApplicationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const classes = useStyles();
  const { loan_type } = useParams();
  const [typeOfLoan, setTypeOfLoan] = React.useState('');
  const [typeOfLoans, setTypeOfLoans ] = React.useState('');

  const typeOfLoanFun = (event) => {
    setTypeOfLoan(event.target.value);
    navigate('/loan/'+event.target.value);
    console.log(event.target.value);
  };

  const { loanTypes } = useSelector((state) => ({ ...state.loanType }));

  useEffect(() => {  
    dispatch(getLoanTypes({}))  
    // getLoanType().then(function (response) {
    //   if(response.data.status_code == 200){
    //     setTypeOfLoans(response.data.data); 
    //     setTypeOfLoan(loan_type);
    //   }  
    // })

  },[]);



  const LoanApplicationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name too short!').required('Name is required'),
    phone: Yup.string().min(10, 'Phone Number is invalid').max(10, 'Phone Number is invalid').matches('^[0-9]*$', 'Phone Number is invalid').required('Phone Number is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    amount: Yup.string().min(4, 'Too Short!').required('messages is required')
  });

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    amount: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoanApplicationSchema),
    defaultValues,
  });


  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (formValue) => {
    // formValue.slug = slugConvertor(formValue.name)
    // dispatch(addRole({formValue, navigate}))
  };

  return (
    <PaperStyle>
      <Container maxWidth="lg">
        <SeactionHeader header="Loan Application Form" />
        <Grid container spacing={4}>
        <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <RHFTextField name="name" label="Name of Applicant" />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField name="phone" label="Phone Number" />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField name="email" label="E-mail Address" />
                  </Grid>
                  <Grid item xs={12}>
                    <RHFTextField 
                        name="amount" 
                        label="Loan Amount" 
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><CurrencyRupeeIcon /></InputAdornment>,
                        }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="loan-type-select-label">Type Of Loan</InputLabel>
                      <Select
                        labelId="loan-type-select-label"
                        id="demo-simple-select"
                        value={typeOfLoan}
                        label="Type Of Loan"
                        onChange={typeOfLoanFun}
                      >
                        {loanTypes.data && loanTypes.data.map((typeOfLoan) => (
                          <MenuItem key={typeOfLoan.slug} value={typeOfLoan.slug}>{typeOfLoan.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <SaveButton type="submit">Save</SaveButton>
                  </Grid>
                </Grid> 
            </FormProvider>
          </Grid>
        </Grid>
      </Container> 
    </PaperStyle> 
  );
}
