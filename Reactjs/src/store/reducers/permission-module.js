import { createSlice } from '@reduxjs/toolkit';
import { 
  addPermissionModule, 
  getPermissionModules,
  getAllPermissionModules, 
  permissionModuleStatus, 
  deletePermissionModule, 
  showPermissionModule, 
  editPermissionModule
} from '../api/permission-module'

const initialState = {
    permission_modules: {
        data : null,
        total : 1,
        per_page : 10,
        current_page : 1
    },
    permission_module: null,
    error: "",
    loading: false,
}

export const PermissionModule = createSlice({
    name: 'PermissionModule',
    initialState ,
    extraReducers: (builder) => {
        // SubPermissionModule Add Api
        builder.
          addCase(addPermissionModule.pending, (state, action) => {
          state.loading = true;
        }).
          addCase(addPermissionModule.fulfilled, (state, action) => {
          state.loading = false;
          state.permission_module = action.payload;
        }).
          addCase(addPermissionModule.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Get PermissionModule Api
        builder.
          addCase(getPermissionModules.pending, (state, action) => {
          state.loading = true;
        }).
          addCase(getPermissionModules.fulfilled, (state, action) => {
          state.loading = false;
          state.permission_modules = action.payload;
        }).
          addCase(getPermissionModules.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Get Sub Categories By Id Api
        builder.
          addCase(getAllPermissionModules.pending, (state, action) => {
          state.loading = true;
        }).
          addCase(getAllPermissionModules.fulfilled, (state, action) => {
          state.loading = false;
          state.permission_modules = action.payload;
        }).
          addCase(getAllPermissionModules.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Show PermissionModule Api
        builder.
          addCase(showPermissionModule.pending, (state, action) => {
          state.loading = true;
        }).
          addCase(showPermissionModule.fulfilled, (state, action) => {
          state.loading = false;
          state.permission_module = action.payload.data;
        }).
          addCase(showPermissionModule.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Edit PermissionModule Api
        builder.
          addCase(editPermissionModule.pending, (state, action) => {
          state.loading = true;
        }).
          addCase(editPermissionModule.fulfilled, (state, action) => {
          state.loading = false;
          // state.permission_module = action.payload.data;
        }).
          addCase(editPermissionModule.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Change PermissionModule Status Api
        builder.
          addCase(permissionModuleStatus.pending, (state, action) => {
          state.loading = true;
        }).
          addCase(permissionModuleStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.permission_modules.data.forEach((permission_module, index) => {
            if(permission_module.id === action.payload.data.id){
              state.permission_modules.data[index].status = action.payload.data.status;
            }
          })
        }).
          addCase(permissionModuleStatus.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Delete PermissionModule Api
        builder.
          addCase(deletePermissionModule.pending, (state, action) => {
          state.loading = true;
        }).
          addCase(deletePermissionModule.fulfilled, (state, action) => {
          state.loading = false;
          state.permission_modules.data.forEach((permission_module, index) => {
            if(permission_module.id === action.payload.data.id){
              state.permission_modules.data.splice(index, 1)
            }
          })
        }).
          addCase(deletePermissionModule.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
        
    }
})

export default PermissionModule.reducer;