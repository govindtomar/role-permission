import PropTypes from "prop-types";
import { Card, Container, Grid } from "@mui/material";

// ----------------------------------------------------------------------

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
};

export default function FormProvider({ children, onSubmit }) {
  return (
    <Card>
      <Container
        sx={{
          margin: "2rem 0",
        }}
      >
        <form onSubmit={onSubmit}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {children}
          </Grid>
        </form>
      </Container>
    </Card>
  );
}
