import { createSlice } from '@reduxjs/toolkit';
import { 
  addUser, 
  getUsers, 
  getAllUsers,
  userStatus, 
  deleteUser, 
  showUser, 
  editUser
} from '../api/user'

const initialState = {
    users: {
        data : null,
        total : 1,
        per_page : 10,
        current_page : 1
    },
    user: null,
    error: "",
    loading: false,
}

export const user = createSlice({
    name: 'user',
    initialState ,
    extraReducers: (builder) => {
        // User Add Api
      builder
        .addCase(addUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(addUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(addUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Get User Api
        builder
          .addCase(getUsers.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
          .addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // // Get All User Api
        builder
          .addCase(getAllUsers.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          }).
          addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Show User Api
        builder.
          addCase(showUser.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(showUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
          }).
          addCase(showUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Edit User Api
        builder.
          addCase(editUser.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(editUser.fulfilled, (state, action) => {
            state.loading = false;
            // state.user = action.payload.data;
          }).
          addCase(editUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Change User Status Api
        builder.
          addCase(userStatus.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(userStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.users.data.forEach((user, index) => {
              if(user.id === action.payload.data.id){
                state.users.data[index].status = action.payload.data.status;
              }
            })
          }).
          addCase(userStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Delete User Api
        builder.
          addCase(deleteUser.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.data.forEach((user, index) => {
              if(user.id === action.payload.data.id){
                state.users.data.splice(index, 1)
              }
            })
          }).
          addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });
        
    }
})

export default user.reducer;