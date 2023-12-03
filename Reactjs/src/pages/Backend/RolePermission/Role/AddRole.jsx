import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addRole } from "src/store/api/role";
import { slugConvertor } from "src/resources/helpers/StringHelper";
import { SaveButton } from "src/components/Button";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
import { Grid, TextField } from "@mui/material";
import FormProvider from "src/components/FormProvider";
import PageLayout from "src/components/PageLayout";

export default function AddRole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Role is required"),
    }),
    onSubmit: (formValue) => {
      formValue.slug = slugConvertor(formValue.name);
      dispatch(addRole({ formValue, navigate }));
    },
  });

  const breadcrumbNavigate = [
    {
      name: "role",
      link: "/role",
    },
  ];

  return (
    <PageLayout title="Add New Role">
      <BreadcrumbNavigator
        navigate={breadcrumbNavigate}
        currentPage="Add Role"
      />
      <FormProvider onSubmit={formik.handleSubmit}>
        <Grid item xs={7}>
          <TextField
            error={Boolean(formik.touched.name && formik.errors.name)}
            fullWidth
            helperText={formik.touched.name && formik.errors.name}
            label="Role"
            margin="normal"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
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
