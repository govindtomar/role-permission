import { createSlice } from '@reduxjs/toolkit';
import { 
  addService, 
  getServices, 
  getAllServices,
  serviceStatus, 
  deleteService, 
  showService, 
  editService
} from '../api/service'

const initialState = {
    services: {
        data : null,
        total : 1,
        per_page : 10,
        current_page : 1
    },
    service: null,
    error: "",
    loading: false,
}

export const service = createSlice({
    name: 'service',
    initialState ,
    extraReducers: (builder) => {
        // Service Add Api
      builder
        .addCase(addService.pending, (state) => {
          state.loading = true;
        })
        .addCase(addService.fulfilled, (state, action) => {
          state.loading = false;
          state.service = action.payload;
        })
        .addCase(addService.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });

        // Get Service Api
        builder
          .addCase(getServices.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(getServices.fulfilled, (state, action) => {
            state.loading = false;
            state.services = action.payload;
          })
          .addCase(getServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // // Get All Service Api
        builder
          .addCase(getAllServices.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(getAllServices.fulfilled, (state, action) => {
            state.loading = false;
            state.services = action.payload;
          }).
          addCase(getAllServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Show Service Api
        builder.
          addCase(showService.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(showService.fulfilled, (state, action) => {
            state.loading = false;
            state.service = action.payload.data;
          }).
          addCase(showService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Edit Service Api
        builder.
          addCase(editService.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(editService.fulfilled, (state, action) => {
            state.loading = false;
            // state.service = action.payload.data;
          }).
          addCase(editService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Change Service Status Api
        builder.
          addCase(serviceStatus.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(serviceStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.services.data.forEach((service, index) => {
              if(service.id === action.payload.data.id){
                state.services.data[index].status = action.payload.data.status;
              }
            })
          }).
          addCase(serviceStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });

        // Delete Service Api
        builder.
          addCase(deleteService.pending, (state, action) => {
            state.loading = true;
          }).
          addCase(deleteService.fulfilled, (state, action) => {
            state.loading = false;
            state.services.data.forEach((service, index) => {
              if(service.id === action.payload.data.id){
                state.services.data.splice(index, 1)
              }
            })
          }).
          addCase(deleteService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
          });
        
    }
})

export default service.reducer;