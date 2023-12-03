import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { addPermission } from "src/store/api/permission";
import { showPermissionModule } from "src/store/api/permission-module";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { SaveButton } from "src/components/Button";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  InputAdornment,
  TextField,
} from "@mui/material";
import FormProvider from "src/components/FormProvider";
import PageLayout from "src/components/PageLayout";

export default function AddPermission() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [apiMethod, setApiMethod] = useState("GET");
  const { permission_module } = useSelector((state) => state.permission_module);

  useEffect(() => {
    const id = params.id;
    dispatch(showPermissionModule({ id }));
  }, []);

  useEffect(() => {
    if (permission_module !== null) {
      formik.setValues({
        name: "",
        api: "",
        url: "",
        method: null,
        permission_module_id: permission_module.id,
        permission_module: permission_module.name,
      });
    }
  }, [permission_module]);

  let apiMethods = ["GET", "POST", "PUT", "DELETE"];

  const handleMethodChange = (event) => {
    setApiMethod(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      api: "",
      url: "",
      method: null,
      permission_module: "",
      permission_module_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Role is required"),
      api: Yup.string().required("API is required"),
      url: Yup.string().required("Front End URL is required"),
      permission_module: Yup.string().required("Permission Module is required"),
    }),
    onSubmit: (formValue) => {
      formValue.method =
        formValue.method == null ? apiMethod : formValue.method;
      dispatch(addPermission({ formValue, navigate }));
    },
  });

  const breadcrumbNavigate = [
    {
      name: "permission",
      link: "/permission/" + params.id,
    },
  ];

  return (
    <PageLayout title="Add New Permission">
      <BreadcrumbNavigator
        navigate={breadcrumbNavigate}
        currentPage="Add Permission"
      />
      <FormProvider onSubmit={formik.handleSubmit}>
        <Grid item xs={7}>
          <TextField
            error={Boolean(
              formik.touched.permission_module &&
                formik.errors.permission_module
            )}
            fullWidth
            helperText={
              formik.touched.permission_module &&
              formik.errors.permission_module
            }
            label="Select Permission Module"
            margin="normal"
            name="permission_module"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.permission_module}
            variant="outlined"
            color="form"
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Name"
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
            error={Boolean(formik.touched.api && formik.errors.api)}
            fullWidth
            helperText={formik.touched.api && formik.errors.api}
            label="API"
            margin="normal"
            name="api"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.api}
            variant="outlined"
            color="form"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {permission_module && permission_module.module_api}/
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={apiMethod}
              label="Select Method"
              onChange={handleMethodChange}
            >
              {apiMethods.map((method) => (
                <MenuItem value={method} key={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <TextField
            error={Boolean(formik.touched.url && formik.errors.url)}
            fullWidth
            helperText={formik.touched.url && formik.errors.url}
            label="Frontend URL"
            margin="normal"
            name="url"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.url}
            variant="outlined"
            color="form"
          />
        </Grid>
        <Grid item xs={6}>
          <SaveButton type="submit">Save</SaveButton>
        </Grid>
      </FormProvider>
    </PageLayout>
  );
}
