import { createAsyncThunk } from '@reduxjs/toolkit';
import  API from "../../config/api";
import { toast } from "react-toastify";


export const addLoanType = createAsyncThunk(
    "loan-type/add",
    async ({ formValue, navigate }, { rejectWithValue }) => {
      try {
        const response = await API.post("/loan-type", formValue);
        if(response.data.status === 200){
          toast.success(response.data.message);
          navigate("/loan-type");
          return response.data;
        }
        toast.error("Something wrong in loan-type");

      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);


export const editLoanType = createAsyncThunk(
  "loan-type/edit",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put("/loan-type", formValue);
      if(response.data.status === 200){
        toast.success(response.data.message);
        navigate("/loan-type");
        return response.data;
      }
      toast.error("Something wrong in loan-type");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLoanTypes = createAsyncThunk(
  "loan-type",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await API.get("/loan-type");
      if(response.data.status === 200){
        return response.data.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showLoanType = createAsyncThunk(
  "loan-type/show",
  async ({ id, by }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/loan-type/${id}?by=${by}`);
      if(response.data.status === 200){
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteLoanType = createAsyncThunk(
  "loan-type/delete",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete("/loan-type/"+id);
      if(response.data.status === 200){
        toast.success(response.data.message);
        return response.data;
      }
      toast.error("Something wrong in loan-type");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loanTypeStatus = createAsyncThunk(
  "loan-type/status",
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const response = await API.post("/loan-type/status", formValue);
      if(response.data.status === 200){
        toast.success(response.data.message);
        return response.data;
      }
      toast.error("Something wrong in loan-type");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


