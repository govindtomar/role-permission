import * as Yup from 'yup';
import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { addService } from 'src/store/api/service';
import { SaveButton } from 'src/components/Button'
import { slugConvertor } from 'src/helpers/StringHelper';
// @mui
import {  
  Stack, 
  Container,
  Typography,
  Button,
  Grid
} from '@mui/material';
// components

import { FormProvider, RHFTextField, RHFCheckbox } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function AddService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ServiceSchema = Yup.object().shape({
    name: Yup.string().required('Service is required'),
    price: Yup.string().required('Price is required')
  });

  const defaultValues = {
    name: '',
    price: '',
    is_travel: false,
    description: '',
  };

  const methods = useForm({
    resolver: yupResolver(ServiceSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (formValue) => {
    formValue.slug = slugConvertor(formValue.name)
    dispatch(addService({formValue, navigate}))
  };

  return (
    <Fragment >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Add Service
        </Typography>
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <RHFTextField name="name" label="Service" />
        </Grid>
        <Grid item xs={4}>
          <RHFTextField name="price" label="Price" />
        </Grid>
        <Grid item xs={6}>
          <RHFCheckbox name="is_travel" label="Service for travelling" />
        </Grid>
        <Grid item xs={9}>
          <RHFTextField name="description" label="Description" multiline />
        </Grid>
        <Grid item xs={6}>
          <SaveButton type="submit">
            Save
          </SaveButton>
        </Grid>
      </Grid>
      </FormProvider>
    </Fragment>
  );
}
