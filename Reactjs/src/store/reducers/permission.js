import { createSlice } from "@reduxjs/toolkit";
import {
  addPermission,
  getPermissions,
  getAllPermissions,
  permissionStatus,
  deletePermission,
  showPermission,
  editPermission,
  showRolePermission,
} from "../api/permission";

const initialState = {
  permissions: {
    data: null,
    total: 1,
    per_page: 1,
    current_page: 1,
  },
  permission: null,
  error: "",
  loading: false,
};

export const permission = createSlice({
  name: "permission",
  initialState,
  extraReducers: (builder) => {
    // Permission Add Api
    builder
      .addCase(addPermission.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permission = action.payload;
      })
      .addCase(addPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Get Permission Api
    builder
      .addCase(getPermissions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // // Get All Permission Api
    builder
      .addCase(getAllPermissions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(getAllPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Show Permission Api
    builder
      .addCase(showPermission.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(showPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permission = action.payload.data;
      })
      .addCase(showPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Edit Permission Api
    builder
      .addCase(editPermission.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editPermission.fulfilled, (state, action) => {
        state.loading = false;
        // state.permission = action.payload.data;
      })
      .addCase(editPermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Change Permission Status Api
    builder
      .addCase(permissionStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(permissionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions.data.forEach((permission, index) => {
          if (permission.id === action.payload.data.id) {
            state.permissions.data[index].status = action.payload.data.status;
          }
        });
      })
      .addCase(permissionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Delete Permission Api
    builder
      .addCase(deletePermission.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions.data.forEach((permission, index) => {
          if (permission.id === action.payload.data.id) {
            state.permissions.data.splice(index, 1);
          }
        });
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Show Role Permission Api
    builder
      .addCase(showRolePermission.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(showRolePermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions.data = action.payload.data;
      })
      .addCase(showRolePermission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default permission.reducer;
