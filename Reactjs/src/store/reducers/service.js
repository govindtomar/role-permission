import { createSlice } from '@reduxjs/toolkit';
import { 
  addService, 
  getServices, 
  serviceStatus, 
  deleteService, 
  showService, 
  editService
} from '../api/service'

const initialState = {
    services: {
        data : null,
        total : 1,
        per_page : 1,
        current_page : 1
    },
    service: null,
    error: "",
    loading: false,
}

export const service = createSlice({
    name: 'service',
    initialState ,
    extraReducers: {
        // Service Add Api
        [addService.pending]: (state, action) => {
          state.loading = true;
        },
        [addService.fulfilled]: (state, action) => {
          state.loading = false;
          state.service = action.payload;
        },
        [addService.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Get Service Api
        [getServices.pending]: (state, action) => {
          state.loading = true;
        },
        [getServices.fulfilled]: (state, action) => {
          state.loading = false;
          state.services = action.payload;
        },
        [getServices.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Show Service Api
        [showService.pending]: (state, action) => {
          state.loading = true;
        },
        [showService.fulfilled]: (state, action) => {
          state.loading = false;
          state.service = action.payload.data;
        },
        [showService.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Edit Service Api
        [editService.pending]: (state, action) => {
          state.loading = true;
        },
        [editService.fulfilled]: (state, action) => {
          state.loading = false;
          // state.service = action.payload.data;
        },
        [editService.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Change Service Status Api
        [serviceStatus.pending]: (state, action) => {
          state.loading = true;
        },
        [serviceStatus.fulfilled]: (state, action) => {
          state.loading = false;
          state.services.data.forEach((service, index) => {
            if(service.id === action.payload.data.id){
              state.services.data[index].status = action.payload.data.status;
            }
          })
        },
        [serviceStatus.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Delete Service Api
        [deleteService.pending]: (state, action) => {
          state.loading = true;
        },
        [deleteService.fulfilled]: (state, action) => {
          state.loading = false;
          state.services.data.forEach((service, index) => {
            if(service.id === action.payload.data.id){
              state.services.data.splice(index, 1)
            }
          })
        },
        [deleteService.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },
        
    }
})

export default service.reducer;