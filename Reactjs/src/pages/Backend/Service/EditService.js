import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';
import { editService, showService } from 'src/store/api/service';
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
import { useEffect, Fragment } from 'react';
import { SaveButton } from 'src/components/Button'
// ----------------------------------------------------------------------

export default function EditService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const ServiceSchema = Yup.object().shape({
    name: Yup.string().required('Service is required'),
    slug: Yup.string().required('Slug is required'),
    price: Yup.string().required('Price is required')
  });

  const { service } = useSelector((state) => ({ ...state.service }));

  useEffect(()=>{
    const id = params.id
    dispatch(showService({id}))
  }, [params])

  useEffect(()=>{
    if(service !== null){
      setValue("id", service.id)
      setValue("name", service.name)
      setValue("slug", service.slug)
      setValue("price", service.price)
      setValue("is_travel", Boolean(service.is_travel))
      setValue("description", service.description)
    }
  }, [service])

  const defaultValues = {
    name: '',
    slug: '',
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
    setValue
  } = methods;

  const onSubmit = (formValue) => {
    formValue.slug = slugConvertor(formValue.slug)
    dispatch(editService({formValue, navigate}))
  };

  return (
    <Fragment >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Edit Service
        </Typography>
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <RHFTextField name="name" label="Service" />
        </Grid>
        <Grid item xs={9}>
          <RHFTextField name="slug" label="Slug" />
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
