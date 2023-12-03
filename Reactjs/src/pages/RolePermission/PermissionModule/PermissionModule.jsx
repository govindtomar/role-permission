import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPermissionModules,
  deletePermissionModule,
  permissionModuleStatus,
} from "src/store/api/permission-module";
import { ActiveInactiveButton, LinkButton } from "src/components/Button";
import ActionOptions from "src/components/ActionOptions";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfirmDeleteDialog from "src/components/ConfirmDeleteDialog";
import ChangeStatusDialog from "src/components/ChangeStatusDialog";
import Iconify from "src/components/Iconify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Card,
} from "@mui/material";
import BreadcrumbNavigator from "src/components/BreadcrumbNavigator";
import { SearchInTable } from "src/components/Table";
import {
  getSearchQueryParams,
  setSearchQueryParams,
  recordPerPage,
} from "src/resources/helpers/SearchHelper";
import PageLayout from "src/components/PageLayout";

export default function PermissionModule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openDialog, setOpenDialog] = React.useState({
    status: false,
    id: null,
  });
  const [changeStatusDialog, setChangeStatusDialog] = React.useState({
    status: false,
    id: null,
    condition: null,
  });

  const { permission_modules } = useSelector(
    (state) => state.permission_module
  );

  useEffect(() => {
    const param = getSearchQueryParams(searchParams);
    dispatch(getPermissionModules({ param }));
  }, [searchParams]);

  const callDeleteFunc = (status, id) => {
    if (status === true) {
      dispatch(deletePermissionModule({ id }));
    }
  };

  const changeStatusFunc = (status, id, condition) => {
    if (status === true) {
      const formValue = {
        id: id,
        status: condition,
      };
      dispatch(permissionModuleStatus({ formValue }));
    }
  };

  const deleteOptionAction = (event) => {
    setOpenDialog((prevState) => ({
      ...prevState,
      status: event.status,
      id: event.id,
    }));
  };

  const handlePageChange = (event, onPage) => {
    let param = setSearchQueryParams(searchParams, onPage);
    navigate(`/permission-module?${param}`);
  };

  const handleChangeRowsPerPage = (event) => {
    let param = setSearchQueryParams(searchParams, 0, event.target.value);
    navigate(`/permission-module?${param}`);
  };

  const setSearchByParam = (param) => {
    navigate(`/permission-module?${param}`);
  };

  return (
    <PageLayout title="Permission Module List">
      <BreadcrumbNavigator
        currentPage="Permission Module List"
        rightButton={{
          name: "Add Permission Module",
          link: "/permission-module/add",
        }}
      />
      <Card>
        <SearchInTable searchByParam={setSearchByParam} />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Permission Module Name</TableCell>
                <TableCell align="left">Module API</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="center">Permission List</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permission_modules.data &&
                permission_modules.data.map((permission_module) => (
                  <TableRow key={permission_module.id}>
                    <TableCell component="th" scope="row">
                      {permission_module.name}
                    </TableCell>
                    <TableCell align="left">
                      {permission_module.module_api}
                    </TableCell>
                    <TableCell align="left">
                      <ActiveInactiveButton
                        onClick={() =>
                          setChangeStatusDialog({
                            status: true,
                            id: permission_module.id,
                          })
                        }
                        status={permission_module.status}
                      >
                        {permission_module.status ? "Active" : "Inactive"}
                      </ActiveInactiveButton>
                    </TableCell>
                    <TableCell align="center">
                      <LinkButton
                        to={"/permission/" + permission_module.id}
                        sx={{ fontSize: "25px" }}
                      >
                        <Iconify icon="material-symbols-light:menu-book-outline" />
                      </LinkButton>
                    </TableCell>
                    <TableCell align="right">
                      <ActionOptions
                        delete_id={permission_module.id}
                        edit_url={`/permission-module/${permission_module.id}/edit`}
                        deleteAction={deleteOptionAction}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={recordPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
          count={permission_modules.total}
          rowsPerPage={permission_modules.per_page}
          page={permission_modules.current_page - 1}
          onPageChange={handlePageChange}
        />
      </Card>
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
    </PageLayout>
  );
}
