import { api } from "../utils/api";

export const getServices = async () => {
  try {
    const response = await api.get("/services");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const createService = async (service: {
  service_name: string;
  service_group: string;
  categories: { category_id: number; price: number }[];
}) => {
  try {
    const response = await api.post("/services", service);
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (
  id: number,
  service: {
    service_name: string;
    service_group: string;
    categories: { category_id: number; price: number }[];
  }
) => {
  try {
    const response = await api.put(`/services/${id}`, service);
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (id: number) => {
  try {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};