import * as Yup from "yup";
import { useState, useEffect, Fragment } from "react";
import { useFormik } from "formik";
import { editPermission, showPermission } from "src/store/api/permission";
import { showPermissionModule } from "src/store/api/permission-module";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { slugConvertor } from "src/resources/helpers/StringHelper";
import { SaveButton } from "src/components/Button";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
import {
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import FormProvider from "src/components/FormProvider";
import PageLayout from "src/components/PageLayout";

export default function EditPermission() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [apiMethod, setApiMethod] = useState("GET");

  useEffect(() => {
    let id = params.id;
    dispatch(showPermissionModule({ id }));
    id = params.pid;
    dispatch(showPermission({ id }));
  }, []);

  const { permission_module } = useSelector((state) => state.permission_module);
  const { permission } = useSelector((state) => state.permission);

  useEffect(() => {
    if (permission_module !== null && permission !== null) {
      formik.setValues({
        id: permission.id,
        name: permission.name,
        url: permission.url,
        api: permission.api,
        method: permission.method,
        route_name: permission.route_name,
        permission_module_id: permission_module.id,
        permission_module: permission_module.name,
      });
      setApiMethod(permission.method);
    }
  }, [permission_module, permission]);

  let apiMethods = ["GET", "POST", "PUT", "DELETE"];

  const handleMethodChange = (event) => {
    setApiMethod(event.target.value);
    setValue("method", event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      api: "",
      url: "",
      method: null,
      route_name: "",
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
      formValue.slug = slugConvertor(formValue.name);
      dispatch(editPermission({ formValue, navigate }));
    },
  });

  const breadcrumbNavigate = [
    {
      name: "permission",
      link: "/permission",
    },
  ];

  return (
    <PageLayout title="Edit Permission">
      <BreadcrumbNavigator
        navigate={breadcrumbNavigate}
        currentPage="Edit Permission"
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
            error={Boolean(
              formik.touched.route_name && formik.errors.route_name
            )}
            fullWidth
            helperText={formik.touched.route_name && formik.errors.route_name}
            label="Route Name"
            margin="normal"
            name="route_name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.route_name}
            variant="outlined"
            color="form"
          />
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
