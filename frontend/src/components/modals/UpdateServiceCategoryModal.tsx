import React, { useState, useEffect } from "react";
import InputField from "../commons/InputField";

interface UpdateServiceCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    category_id: number,
    service_category: { category_name: string }
  ) => void;
  serviceCategory?: { category_id: number; category_name: string };
}

const UpdateServiceCategoryModal: React.FC<UpdateServiceCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  serviceCategory,
}) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (serviceCategory) {
      setCategoryName(serviceCategory.category_name || "");
    }
  }, [serviceCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    console.log("Category Name:", categoryName);
    console.log("Service Category ID:", serviceCategory?.category_id); // Pastikan ini tampil
    console.log("Category ID:", serviceCategory?.category_id);

    if (serviceCategory) {
      onSubmit(serviceCategory.category_id, {
        category_name: categoryName,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-8 rounded-lg shadow-lg w-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">
          Update Service Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <InputField
              label="Category Name"
              name="category_name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServiceCategoryModal;
