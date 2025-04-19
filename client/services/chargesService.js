import axiosInstance from "./axiosInstance";

export const createCharge = async (chargeData) => {
  try {
    const response = await axiosInstance.post("/api/charges", chargeData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getCharges = async () => {
  try {
    const response = await axiosInstance.get("/api/charges");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getChargeById = async (id) => {    
  try {
    const response = await axiosInstance.get(`/api/charges/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const updateCharge = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/api/charges/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const deleteCharge = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/charges/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}