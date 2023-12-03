import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPermissionModule } from "src/store/api/permission-module";
import { SaveButton } from "src/components/Button";
import FormProvider from "src/components/FormProvider";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
import { Grid, TextField } from "@mui/material";
import PageLayout from "src/components/PageLayout";

export default function AddPermissionModule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      module_api: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Permission Module is required"),
      module_api: Yup.string().required("Permission Module API is required"),
    }),
    onSubmit: (formValue) => {
      dispatch(addPermissionModule({ formValue, navigate }));
    },
  });

  const breadcrumbNavigate = [
    {
      name: "Permission Module",
      link: "/permission-module",
    },
  ];

  return (
    <PageLayout title="Add New Permission Module">
      <BreadcrumbNavigator
        navigate={breadcrumbNavigate}
        currentPage="Add Permission Module"
      />
      <FormProvider onSubmit={formik.handleSubmit}>
        <Grid item xs={7}>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Permission Module Name"
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
            error={Boolean(
              formik.touched.module_api && formik.errors.module_api
            )}
            fullWidth
            helperText={formik.touched.module_api && formik.errors.module_api}
            label="Permission Module API"
            margin="normal"
            name="module_api"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.module_api}
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
