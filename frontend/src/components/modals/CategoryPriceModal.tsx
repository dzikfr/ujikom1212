import React from "react";
import he from "he";
import {formattedRupiah} from "../helpers/format";

interface Category {
  category_id: number;
  category_name: string;
  price: number;
}

interface CategoryPriceModalProps {
  categories: Category[];
  onClose: () => void;
  serviceName: string;
  serviceGroup: string;
}

const CategoryPriceModal: React.FC<CategoryPriceModalProps> = ({
  categories,
  onClose,
  serviceName,
  serviceGroup,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-8 rounded-lg shadow-lg w-3/4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">{serviceName}</h3>
        <h3 className="text-lg font-semibold mb-2">{serviceGroup}</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.category_id}
              className="flex justify-between border-b pb-1"
            >
              <span>{he.decode(category.category_name)}</span>
              <span className="font-bold">
                {formattedRupiah(category.price)}
              </span>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 btn btn-sm btn-secondary w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CategoryPriceModal;
