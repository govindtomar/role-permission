import PropTypes from 'prop-types';
import {  
  Card, 
  Container
} from '@mui/material';

// ----------------------------------------------------------------------

ContainerLayer.propTypes = {
  children: PropTypes.node.isRequired
};

export default function ContainerLayer({ children }) {
  return (
    <Card>
      <Container sx={{
        margin:'2rem 0'
      }}>
        {children}
      </Container>
    </Card>
  );
}
