import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login } from 'src/store/api/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const theme = useTheme()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: (formValue) => {
      dispatch(login({ formValue, navigate }))
    }
  });

  return (
        <Container maxWidth="sm" sx={{marginTop:'100px'}}>
          <Card sx={{
            p:4,
            boxShadow:theme.shadows[11]
          }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>

              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
                color="form"
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
                color="form"
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign In Now
                </Button>
              </Box>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Don&apos;t have an account?
                {' '}

                  <Link
                    to="/register"
                    component={RouterLink}
                    variant="subtitle2"
                    underline="hover"
                    sx={{
                      cursor: 'pointer'
                    }}
                  >
                    Sign Up
                  </Link>
              </Typography>
            </form>
          </Card>
        </Container>
  );
};

export default Login;