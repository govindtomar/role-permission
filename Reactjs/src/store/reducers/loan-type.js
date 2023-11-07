import { createSlice } from '@reduxjs/toolkit';
import { 
  addLoanType, 
  getLoanTypes, 
  loanTypeStatus, 
  deleteLoanType, 
  showLoanType, 
  editLoanType
} from '../api/loan-type'

const initialState = {
    loanTypes: {
      data : null,
      total : 1,
      per_page : 1,
      current_page : 1
    },
    loanType: null,
    error: "",
    loading: false,
}

export const loanType = createSlice({
    name: 'loan-type',
    initialState ,
    extraReducers: {
        // LoanType Add Api
        [addLoanType.pending]: (state, action) => {
          state.loading = true;
        },
        [addLoanType.fulfilled]: (state, action) => {
          state.loading = false;
          state.loanType = action.payload;
        },
        [addLoanType.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Get LoanType Api
        [getLoanTypes.pending]: (state, action) => {
          state.loading = true;
        },
        [getLoanTypes.fulfilled]: (state, action) => {
          state.loading = false;
          state.loanTypes = action.payload;
        },
        [getLoanTypes.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Show LoanType Api
        [showLoanType.pending]: (state, action) => {
          state.loading = true;
        },
        [showLoanType.fulfilled]: (state, action) => {
          state.loading = false;
          state.loanType = action.payload.data;
        },
        [showLoanType.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Edit LoanType Api
        [editLoanType.pending]: (state, action) => {
          state.loading = true;
        },
        [editLoanType.fulfilled]: (state, action) => {
          state.loading = false;
          state.loanType = action.payload.data;
        },
        [editLoanType.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Change LoanType Status Api
        [loanTypeStatus.pending]: (state, action) => {
          state.loading = true;
        },
        [loanTypeStatus.fulfilled]: (state, action) => {
          state.loading = false;
          state.loanTypes.data.forEach((loanType, index) => {
            if(loanType.id === action.payload.data.id){
              state.loanTypes.data[index].status = action.payload.data.status;
            }
          })
        },
        [loanTypeStatus.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },

        // Delete LoanType Api
        [deleteLoanType.pending]: (state, action) => {
          state.loading = true;
        },
        [deleteLoanType.fulfilled]: (state, action) => {
          state.loading = false;
          state.loanTypes.data.forEach((loanType, index) => {
            if(loanType.id === action.payload.data.id){
              state.loanTypes.data.splice(index, 1)
            }
          })
        },
        [deleteLoanType.rejected]: (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        },       
        
    }
})

export default loanType.reducer;