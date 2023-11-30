import { createSlice } from "@reduxjs/toolkit";
import {
  addRole,
  getRoles,
  getAllRoles,
  roleStatus,
  deleteRole,
  showRole,
  editRole,
} from "../api/role";

const initialState = {
  roles: {
    data: null,
    total: 1,
    per_page: 10,
    current_page: 1,
  },
  role: null,
  error: "",
  loading: false,
};

export const role = createSlice({
  name: "role",
  initialState,
  extraReducers: (builder) => {
    // Role Add Api
    builder
      .addCase(addRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Get Role Api
    builder
      .addCase(getRoles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // // Get All Role Api
    builder
      .addCase(getAllRoles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Show Role Api
    builder
      .addCase(showRole.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(showRole.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload.data;
      })
      .addCase(showRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Edit Role Api
    builder
      .addCase(editRole.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editRole.fulfilled, (state, action) => {
        state.loading = false;
        // state.role = action.payload.data;
      })
      .addCase(editRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Change Role Status Api
    builder
      .addCase(roleStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(roleStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.data.forEach((role, index) => {
          if (role.id === action.payload.data.id) {
            state.roles.data[index].status = action.payload.data.status;
          }
        });
      })
      .addCase(roleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    // Delete Role Api
    builder
      .addCase(deleteRole.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.data.forEach((role, index) => {
          if (role.id === action.payload.data.id) {
            state.roles.data.splice(index, 1);
          }
        });
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default role.reducer;
