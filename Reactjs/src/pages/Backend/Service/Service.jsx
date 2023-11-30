import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getServices, deleteService, serviceStatus} from 'src/store/api/service';
import { ActiveInactiveButton, LinkButton } from 'src/components/Button';
import ActionOptions from 'src/components/ActionOptions'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ConfirmDeleteDialog from 'src/components/ConfirmDeleteDialog'
import ChangeStatusDialog from 'src/components/ChangeStatusDialog';
import Iconify from 'src/components/Iconify';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper, 
  Container, 
  Stack, 
  Typography,
} from '@mui/material';

export default function Service() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = React.useState({
    status: false, 
    id: null 
  });
  const [changeStatusDialog, setChangeStatusDialog] = React.useState({
    status: false, 
    id: null,
    condition: null
  });

  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    const param = "page="+searchParams.get('page')
    dispatch(getServices({param}))
  },[searchParams]);

  const callDeleteFunc = (status, id) => {
    if(status === true){
      dispatch(deleteService({id}))
    }
  }

  const changeStatusFunc = (status, id, condition) => {    
    if(status === true){
      const formValue = {
        id : id,
        status: condition
      }
      dispatch(serviceStatus({ formValue }))

    }
  }

  const deleteOptionAction = (event) => {
    setOpenDialog((prevState) => ({
      ...prevState,
      status: event.status,
      id:event.id
    }));
  }

  const handlePageChange = (event, onPage) => {
    navigate(`/service?page=${onPage + 1}`)
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Services
        </Typography>
        <LinkButton to="/service/add">Add Service</LinkButton>
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Service Name</TableCell>
              <TableCell align="left">Slug</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.data && services.data.map((service) => (
              <TableRow key={service.id}>
                <TableCell component="th" scope="row">{service.name}</TableCell>
                <TableCell align="left">{service.slug}</TableCell>
                <TableCell align="left">
                  <ActiveInactiveButton 
                    onClick={() => setChangeStatusDialog({ status: true, id: service.id })}
                    status={service.status}
                  >
                    {service.status ? "Active" : "Inactive"}
                  </ActiveInactiveButton>
                </TableCell>
                <TableCell align="left">{service.price}</TableCell>
                <TableCell align="right">
                  <ActionOptions 
                    delete_id={service.id} 
                    edit_url={`/service/${service.id}/edit`}
                    show_url={'/service/'+service.id} 
                    deleteAction={deleteOptionAction}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={services.total}
        rowsPerPage={services.per_page}
        page={services.current_page - 1}
        onPageChange={handlePageChange}
      />
      <ConfirmDeleteDialog 
        openDialog={openDialog} 
        setOpenDialog={setOpenDialog}
        confirmDialog={callDeleteFunc}
      />

      <ChangeStatusDialog 
        openDialog={changeStatusDialog} 
        setOpenDialog={setChangeStatusDialog}
        confirmDialog={changeStatusFunc}
      />

    </Container>
  );
}
