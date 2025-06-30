import axiosInstance from "./axiosInstance";

export const getAllOrdersByDate = async (date) => {
  const response = await axiosInstance.get(`/api/orders/date/${date}`);
  return response.data;
}

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/api/orders/${id}`);
  return response.data;
}

export const updateOrder = async (id, orderData) => {
  const response = await axiosInstance.put(`/api/orders/${id}`, orderData);
  return response.data;
}

export const updateOrderStatus = async (id, status) => {
  const response = await axiosInstance.post(`/api/orders/update-status/${id}`, { status });
  return response.data;
}

export const getRidersByOutletId = async (outletId) => {
  const response = await axiosInstance.get(`/api/staff-users/riders/${outletId}`);
  return response.data;
}

export const assignRiderToOrder = async (orderId, riderId) => {
  const response = await axiosInstance.post(`/api/orders/${orderId}/assign-rider`, { riderId });
  return response.data;
}