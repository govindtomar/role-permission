import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  editPermissionModule,
  showPermissionModule,
} from "src/store/api/permission-module";
import { Grid, TextField } from "@mui/material";
import FormProvider from "src/components/FormProvider";
import { useEffect } from "react";
import { SaveButton } from "src/components/Button";
import { slugConvertor } from "src/resources/helpers/StringHelper";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
import PageLayout from "src/components/PageLayout";

export default function EditPermissionModule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { permission_module } = useSelector((state) => state.permission_module);

  useEffect(() => {
    const id = params.id;
    dispatch(showPermissionModule({ id }));
  }, [params]);

  useEffect(() => {
    if (permission_module !== null) {
      formik.setValues({
        id: permission_module.id,
        name: permission_module.name,
        module_api: permission_module.module_api,
      });
    }
  }, [permission_module]);

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
      formValue.module_api = slugConvertor(formValue.module_api);
      dispatch(editPermissionModule({ formValue, navigate }));
    },
  });

  const breadcrumbNavigate = [
    {
      name: "Permission Module",
      link: "/permission-module",
    },
  ];

  return (
    <PageLayout title="Edit Permission Module">
      <BreadcrumbNavigator
        navigate={breadcrumbNavigate}
        currentPage="Edit Permission Module"
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
