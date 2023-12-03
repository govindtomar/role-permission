import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,  
  Link,
  TextField,
  Typography,
  Card
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { register } from 'src/store/api/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const theme = useTheme()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      // policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      // policy: Yup
      //   .boolean()
      //   .oneOf(
      //     [true],
      //     'This field must be checked'
      //   )
    }),
    onSubmit: (formValue) => {
      dispatch(register({ formValue, navigate }))
    }
  });

  return (

    <Container maxWidth="sm" sx={{marginTop:'100px'}}>
      <Card sx={{
        p: 4,
        boxShadow: theme.shadows[11]
      }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            Create a new account
          </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            Use your email to create a new account
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Full Name"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            variant="outlined"
            color="form"
          />
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
          {/* <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  ml: -1
                }}
              > */}
          {/* <Checkbox
                  checked={formik.values.policy}
                  name="policy"
                  onChange={formik.handleChange}
                />
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  I have read the
                  {' '}
                  <NextLink
                    href="#"
                    passHref
                  >
                    <Link
                      color="primary"
                      underline="always"
                      variant="subtitle2"
                    >
                      Terms and Conditions
                    </Link>
                  </NextLink>
                </Typography>
              </Box>
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>
                  {formik.errors.policy}
                </FormHelperText>
              )} */}
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign Up Now
            </Button>
          </Box>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Have an account?
            {' '}
              <Link
                to="/login"
                component={RouterLink}
                variant="subtitle2"
                underline="hover"
              >
                Sign In
              </Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
