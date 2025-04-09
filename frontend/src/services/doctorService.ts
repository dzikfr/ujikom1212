import { api } from "../utils/api";

export const getDoctors = async () => {
  try {
    const response = await api.get("/doctor");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

export const addDoctor = async (doctor: {
  doctor_name: string;
  address: string;
  city: string;
  country: string;
  kategori: string;
  contact_phone: string;
}) => {
  try {
    const response = await api.post("/doctor", doctor);
    return response.data;
  } catch (error) {
    console.error("Error adding doctor:", error);
    throw error;
  }
};

export const updateDoctor = async (
  id: number,
  doctor: {
    doctor_name: string;
    address: string;
    city: string;
    country: string;
    kategori: string;
    contact_phone: string;
  }
) => {
  try {
    const response = await api.put(`/doctor/${id}`, doctor);
    return response.data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

export const deleteDoctor = async (id: number) => {
  try {
    const response = await api.delete(`/doctor/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};
