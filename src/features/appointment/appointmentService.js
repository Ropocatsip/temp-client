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

const updateAppointment = async (id, resId, note, seat, token) => {
  let request = {"seat": seat, "note": note};
  const response = await axios.put(API_URL + id, request, {
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
  deleteAppointment
};
export default appointmentService;