import axiosInstance from "./axiosInstance";

export async function getMenuItems() {
  const response = await axiosInstance.get("/api/items");
  return(response.data)
}

export async function getMenuItemById(id) {
  const response = await axiosInstance.get(`/api/items/${id}`);
  return(response.data)
}

export async function updateMenuItem(id, updatedData) {
  const response = await axiosInstance.patch(`/api/items/${id}`, updatedData);
  const updatedItem = response.data;
  return updatedItem;
}

export async function deleteMenuItem(id) {
  await axiosInstance.delete(`/api/items/${id}`);
}

// Upload a new menu item
export async function uploadMenuItem(formData) {
  const response = await axiosInstance.post("/api/items", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensure the request is sent as form-data
    },
  });
  return response.data;
}