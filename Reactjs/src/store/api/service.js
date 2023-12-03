import { createAsyncThunk } from '@reduxjs/toolkit';
import  API from "../api";
import { toast } from "react-toastify";


export const addService = createAsyncThunk(
    "service/add",
    async ({ formValue, navigate }, { rejectWithValue }) => {
      try {
        const response = await API.post("/service", formValue);
        if(response.data.status === 200){
          toast.success(response.data.message);
          navigate("/service");
          return response.data;
        }
        toast.error("Something wrong in service");

      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);


export const editService = createAsyncThunk(
  "service/edit",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.put("/service", formValue);
      if(response.data.status === 200){
        toast.success(response.data.message);
        navigate("/service");
        return response.data;
      }
      toast.error("Something wrong in service");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getServices = createAsyncThunk(
  "service",
  async ({param}, { rejectWithValue }) => {
    try {
      const response = await API.get("/service?"+param);
      if(response.data.status === 200){
        return response.data.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllServices = createAsyncThunk(
  "service/all",
  async ({ }, { rejectWithValue }) => {
      try {
          const response = await API.get("/admin/service/all");
          if (response.data.status === 200) {
              return response.data;
          }
      } catch (err) {
          return rejectWithValue(err.response.data);
      }
  }
);

export const showService = createAsyncThunk(
  "service/show",
  async ({ id, by }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/service/${id}?by=${by}`);
      if(response.data.status === 200){
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/delete",
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.delete("/service/"+id);
      if(response.data.status === 200){
        toast.success(response.data.message);
        return response.data;
      }
      toast.error("Something wrong in service");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const serviceStatus = createAsyncThunk(
  "service/status",
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const response = await API.post("/service/status", formValue);
      if(response.data.status === 200){
        toast.success(response.data.message);
        return response.data;
      }
      toast.error("Something wrong in service");

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);