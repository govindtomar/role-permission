import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editUser, showUser } from "src/store/api/user";
import { getRoles } from "src/store/api/role";
import Iconify from "src/components/Iconify";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
// @mui
import {
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Select,
  Box,
  OutlinedInput,
  MenuItem,
  FormControl,
  ListItemText,
  Checkbox,
  Chip,
  TextField,
} from "@mui/material";
import FormProvider from "src/components/FormProvider";
import { useEffect, useState } from "react";
import { SaveButton } from "src/components/Button";
import PageLayout from 'src/components/PageLayout';

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [userRole, setUserRole] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);

  const handleChangeRole = (event) => {
    const {
      target: { value },
    } = event;
    setUserRole(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const id = params.id;
    dispatch(showUser({ id }));
  }, [params]);

  useEffect(() => {
    if (user !== null) {
      formik.setValues({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      });

      dispatch(getRoles({}));
      const value = [];
      user.roles.forEach((element) => {
        value.push(element.id);
      });
      setUserRole(value);
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("User is required"),
      email: Yup.string().required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: (formValue) => {
      formValue.user_roles = userRole;
      dispatch(editUser({ formValue, navigate }));
    },
  });

  const breadcrumbNavigate = [
    {
      name: "user",
      link: "/user",
    },
  ];

  return (
    <PageLayout title="Edit User">
      <BreadcrumbNavigator
        navigate={breadcrumbNavigate}
        currentPage="Edit User"
      />
      <FormProvider onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Color Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
              color="form"
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="E-mail Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              variant="outlined"
              color="form"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              fullWidth
              helperText={formik.touched.phone && formik.errors.phone}
              label="Phone"
              margin="normal"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              variant="outlined"
              color="form"
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              variant="outlined"
              color="form"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={7}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-checkbox-label" color="form">
                Select User Roles
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={userRole}
                color="form"
                onChange={handleChangeRole}
                input={<OutlinedInput label="Select User Roles" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map(
                      (value) =>
                        roles.data &&
                        roles.data.map((role) =>
                          value === role.id ? (
                            <Chip key={value} label={role.name} />
                          ) : (
                            ""
                          )
                        )
                    )}
                  </Box>
                )}
              >
                {roles.data &&
                  roles.data.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      <Checkbox
                        checked={userRole.indexOf(role.name) > -1}
                        color="form"
                      />
                      <ListItemText primary={role.name} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <SaveButton type="submit">Save</SaveButton>
          </Grid>
      </FormProvider>
    </PageLayout>
  );
}
