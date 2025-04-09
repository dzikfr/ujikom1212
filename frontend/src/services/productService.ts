import { api } from "../utils/api";

export const getProducts = async () => {
  try {
    const res = await api.get("/api/product");
    return res.data.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const addProduct = async (product: {
  product_name: string;
  price: number;
  type: string;
  stock: number;
}) => {
  try {
    const res = await api.post("/api/product", product);
    return res.data;
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
};

export const updateProduct = async (
  id_product: number,
  product: {
    product_name: string;
    price: number;
    type: string;
    stock: number;
  }
) => {
  try {
    const res = await api.put(`/api/products/${id_product}`, product);
    return res.data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};

export const deleteProduct = async (id_product: number) => {
  try {
    await api.delete(`/api/products/${id_product}`);
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};
