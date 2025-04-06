import axios from "axios";
const API_URL = "http://localhost:5001/api/v1/appointments/";

const getAppointments = async (token) => {
  const response = await axios.get(API_URL,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return response.data;
};

const getAppointment = async (id, token) => {
  const response = await axios.get(API_URL + id,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
  );
  return response.data;
};

const updateAppointment = async (data, seat, note, token) => {
  let request = {"seat": seat, "note": note, "restaurant": data.restaurant._id};
  const response = await axios.put(API_URL + data._id, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

const deleteAppointment = async (id, token) => {
  const response = await axios.delete(API_URL + id,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
  return response.data;
};

const appointmentService = {
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAppointment
};
export default appointmentService;