import axiosInstance from "./axiosInstance";

export const createAddon = async (addonData) => {
  try {
    const response = await axiosInstance.post("/api/addons", addonData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getAddons = async () => {
  try {
    const response = await axiosInstance.get("/api/addons");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getAddonById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/addons/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getAddonByItemId = async (itemId) => {
  try {
    const response = await axiosInstance.get(`/api/addons/item/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const updateAddon = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/api/addons/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getAddonsByItem = async (itemId) => {
  try {
    const response = await axiosInstance.get(`/api/addons/item/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const deleteAddon = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/addons/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}