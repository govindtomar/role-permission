import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ContactUsDetails from './ContactUsDetails'
import {SaveButton} from 'src/components/Button';
import { alpha, styled } from '@mui/material/styles';
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
  InputAdornment
} from '@mui/material';
import SeactionHeader from '../../components/SectionHeader';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const PaperStyle = styled(Paper)(({ theme }) => ({
    borderRadius: 0,
    marginTop: 60
}));


export default function ContactUs() {
  const navigate = useNavigate();

  const RoleSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name too short!').required('Name is required'),
    phone: Yup.string().min(10, 'Phone Number too short!').max(10, 'Phone Number too long!').matches('^[0-9]*$', 'no albha').required('Phone Number is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    message: Yup.string().min(50, 'Too Short!').required('messages is required')
  });

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(RoleSchema),
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
        <SeactionHeader header="Contact Us" />
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <ContactUsDetails />
          </Grid>
          <Grid item xs={12} md={8}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  <Grid item md={12} sm={12} xs={12}>
                    <RHFTextField name="name" label="Name" />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <RHFTextField name="email" label="E-mail Address" />
                  </Grid>
                  <Grid item md={6} sm={12} xs={12}>
                    <RHFTextField 
                        name="phone" 
                        label="Phone Number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+91 </InputAdornment>,
                        }}
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
                  <RHFTextField 
                        name="message" 
                        label="Tell Us About Your Issue"
                        multiline
                    />
                  </Grid>
                  <Grid item md={12} sm={12} xs={12}>
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
