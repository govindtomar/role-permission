import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { editRole, showRole } from "src/store/api/role";
import { Grid, TextField } from "@mui/material";
import FormProvider from "src/components/FormProvider";
import { useEffect } from "react";
import { SaveButton } from "src/components/Button";
import { slugConvertor } from "src/resources/helpers/StringHelper";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
import PageLayout from "src/components/PageLayout";

export default function EditRole() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { role } = useSelector((state) => state.role);

  useEffect(() => {
    const id = params.id;
    dispatch(showRole({ id }));
  }, [params]);

  useEffect(() => {
    if (role !== null) {
      formik.setValues({
        id: role.id,
        name: role.name,
        slug: role.slug,
      });
    }
  }, [role]);

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Role is required"),
      slug: Yup.string().required("Slug is required"),
    }),
    onSubmit: (formValue) => {
      formValue.slug = slugConvertor(formValue.slug);
      dispatch(editRole({ formValue, navigate }));
    },
  });

  const breadcrumbNavigate = [
    {
      name: "role",
      link: "/role",
    },
  ];

  return (
    <PageLayout title="Edit Role">
      <BreadcrumbNavigator
        navigate={breadcrumbNavigate}
        currentPage="Edit Role"
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
        <Grid item xs={7}>
          <TextField
            error={Boolean(formik.touched.slug && formik.errors.slug)}
            fullWidth
            helperText={formik.touched.slug && formik.errors.slug}
            label="Slug"
            margin="normal"
            name="slug"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.slug}
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
