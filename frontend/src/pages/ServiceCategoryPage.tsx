import React, { useEffect, useState } from "react";
import {
  getServiceCategories,
  addServiceCategory,
  deleteServiceCategory,
  updateServiceCategory,
} from "../services/categoryService";
import ServiceCategoryTable from "../components/tables/ServiceCategoryTable";
import AddServiceCategoryModal from "../components/modals/AddServiceCategoryModal";
import UpdateServiceCategoryModal from "../components/modals/UpdateServiceCategoryModal";
import SearchBar from "../components/commons/SearchBar";
import { useSnackbar } from "notistack";

interface ServiceCategory {
  category_id: number;
  category_name: string;
}

const ServiceCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<
    ServiceCategory[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const fetchCategories = async () => {
    setLoading(true);
    const data = await getServiceCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleAddCategory = async (newCategory: { category_name: string }) => {
    try {
      const response = await addServiceCategory(newCategory);
      fetchCategories();
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add category";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleEditCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setUpdateModalOpen(true);
  };

  const handleUpdateCategory = async (
    id: number,
    updatedCategory: { category_name: string }
  ) => {
    try {
      const response = await updateServiceCategory(id, updatedCategory);
      fetchCategories();
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update category";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteServiceCategory(id);
        fetchCategories();
        enqueueSnackbar("Category deleted successfully!", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Failed to delete category", { variant: "error" });
      }
    }
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = categories.filter((category) =>
      category.category_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Service Categories</h1>
        <button
          className="btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          + Add Category
        </button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Categories..." />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ServiceCategoryTable
          categories={filteredCategories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      )}

      <AddServiceCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddCategory}
      />

      <UpdateServiceCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateCategory}
        serviceCategory={selectedCategory || undefined}
      />
    </div>
  );
};

export default ServiceCategoryPage;
