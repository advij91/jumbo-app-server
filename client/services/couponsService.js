import axiosInstance from "./axiosInstance";

export const createCoupon = async (couponData) => {
  try {
    const response = await axiosInstance.post("/api/coupons", couponData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getCoupons = async () => {
  try {
    const response = await axiosInstance.get("/api/coupons");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const getCouponById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/coupons/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
export const updateCoupon = async (id, updatedData) => {
  try {
    const response = await axiosInstance.put(`/api/coupons/${id}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const deleteCoupon = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/coupons/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}
