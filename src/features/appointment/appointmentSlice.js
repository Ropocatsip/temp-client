import { createAsyncThunk } from '@reduxjs/toolkit';
import appointmentService from './appointmentService';

export const getAppointments = createAsyncThunk(
    'appointments',
    async (token, thunkAPI) => {
      try {
        return await appointmentService.getAppointments(token);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

export const getAppointment = createAsyncThunk(
    'appointments',
    async ({id, token}, thunkAPI) => {
      try {
        return await appointmentService.getAppointment(id, token);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/delete',
  async ({id, token}, thunkAPI) => {
    try {
      return await appointmentService.deleteAppointment(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAppointment = createAsyncThunk(
    'appointments/put',
    async ({data, seat, note, token}, thunkAPI) => {
      try {
        return await appointmentService.updateAppointment(data, seat, note, token);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);
