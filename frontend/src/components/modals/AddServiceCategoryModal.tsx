import React, { useState } from "react";
import InputField from "../commons/InputField";

interface AddServiceCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service_category: { category_name: string }) => void;
}

const AddServiceCategoryModal: React.FC<AddServiceCategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ category_name: categoryName });
    setCategoryName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-8 rounded-lg shadow-lg w-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Add Category</h2>
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!categoryName}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceCategoryModal;
