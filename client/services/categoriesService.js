import axiosInstance from "./axiosInstance";

export const createCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post("/api/categories", categoryData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/categories");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const updateCategory = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/api/categories/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
