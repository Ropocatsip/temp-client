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
    async ({id, resId, note, seat, token}, thunkAPI) => {
      try {
        return await appointmentService.updateAppointment(id, note, seat, token);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
);
