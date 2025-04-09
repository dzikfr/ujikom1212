import { api } from "../utils/api";

export const getServiceCategories = async () => {
  try {
    const response = await api.get("/service_category");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching service categories:", error);
    return [];
  }
};

export const addServiceCategory = async (service_category: {
  category_name: string;
}) => {
  try {
    const response = await api.post("/service_category", service_category);
    return response.data;
  } catch (error) {
    console.error("Error adding service category:", error);
    throw error;
  }
};

export const updateServiceCategory = async (
  service_category_id: number,
  service_category: { category_name: string }
) => {
  try {
    const response = await api.put(
      `/service_category/${service_category_id}`,
      service_category
    );
    return response.data;
  } catch (error) {
    console.error("Error updating service category:", error);
    throw error;
  }
};

export const deleteServiceCategory = async (service_category_id: number) => {
  try {
    await api.delete(`/service_category/${service_category_id}`);
  } catch (error) {
    console.error("Error deleting service category:", error);
    throw error;
  }
};
