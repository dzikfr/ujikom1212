import React, { useState } from "react";
import Pagination from "../commons/Pagination";
import ItemsPerPageSelector from "../commons/ItemsPerPageSelector";
import he from "he";  

interface ServiceCategory {
  category_id: number;
  category_name: string;
}

interface ServiceCategoryTableProps {
  categories: ServiceCategory[];
  onEdit: (category: ServiceCategory) => void;
  onDelete: (id: number) => void;
}

const ServiceCategoryTable: React.FC<ServiceCategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCategories = categories.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onChange={(value: React.SetStateAction<number>) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedCategories.map((category) => (
            <tr key={category.category_id}>
              <td>{category.category_id}</td>
              <td>{he.decode(category.category_name)}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(category)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(category.category_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={categories.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ServiceCategoryTable;
