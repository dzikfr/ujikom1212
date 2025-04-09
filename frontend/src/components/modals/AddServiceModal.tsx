import React, { useState, useEffect } from "react";
import InputField from "../commons/InputField";
import { getServiceCategories } from "../../services/categoryService";
import he from "he";
import { useSnackbar } from "notistack";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: {
    service_name: string;
    service_group: string;
    categories: { category_id: number; price: number }[];
  }) => void;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceGroup, setServiceGroup] = useState("");
  const [categories, setCategories] = useState<
    { category_id: number; category_name: string }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { category_id: number; price: number }[]
  >([]);
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getServiceCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setSelectedCategories((prev) => [...prev, { category_id: 0, price: 0 }]);
  };

  const handleCategoryChange = (index: number, categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.some((c, i) => c.category_id === categoryId && i !== index)) {
        return prev;
      }
      const updated = [...prev];
      updated[index].category_id = categoryId;
      return updated;
    });
  };

  const handlePriceChange = (index: number, price: number) => {
    setSelectedCategories((prev) => {
      const updated = [...prev];
      updated[index].price = price;
      return updated;
    });
  };

  const handleRemoveCategory = (index: number) => {
    setSelectedCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      enqueueSnackbar("Please select at least one category.", { variant: "error" });
      return;
    }
    if (selectedCategories.some((c) => c.category_id === 0 || c.price <= 0)) {
      enqueueSnackbar("Please enter valid prices for all categories.", { variant: "error" });
      return;
    }
    setError("");
    onSubmit({
      service_name: serviceName,
      service_group: serviceGroup,
      categories: selectedCategories,
    });
    setServiceName("");
    setServiceGroup("");
    setSelectedCategories([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-8 rounded-lg shadow-lg w-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Add Service</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Service Name"
            name="service_name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
          <InputField
            label="Service Group"
            name="service_group"
            value={serviceGroup}
            onChange={(e) => setServiceGroup(e.target.value)}
            required
          />
          <div className="mt-4">
            <label className="block text-white mb-2">Categories & Prices</label>
            {selectedCategories.map((selected, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <select
                  className="select select-bordered w-1/2 mr-1"
                  value={selected.category_id}
                  onChange={(e) =>
                    handleCategoryChange(index, Number(e.target.value))
                  }
                >
                  <option value={0} disabled>
                    Select Category
                  </option>
                  {categories
                    .filter(
                      (c) =>
                        !selectedCategories.some(
                          (s, i) =>
                            s.category_id === c.category_id && i !== index
                        )
                    )
                    .map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {he.decode(category.category_name)}
                      </option>
                    ))}
                </select>
                <input
                  type="number"
                  className="input input-bordered w-1/2 ml-1 mr-1"
                  placeholder="Price"
                  min="1"
                  value={selected.price}
                  onChange={(e) =>
                    handlePriceChange(index, Number(e.target.value))
                  }
                  required
                />
                <button
                  type="button"
                  className="btn btn-error btn-sm"
                  onClick={() => handleRemoveCategory(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={handleAddCategory}
            >
              + Add Category
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={selectedCategories.length === 0}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
