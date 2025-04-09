import React, { useState } from "react";
import Pagination from "../commons/Pagination";
import ItemsPerPageSelector from "../commons/ItemsPerPageSelector";
import he from "he";
import CategoryPriceModal from "../modals/CategoryPriceModal";

interface Category {
  category_id: number;
  category_name: string;
  price: number;
}

interface Service {
  service_id: number;
  service_name: string;
  service_group: string;
  categories: Category[];
}

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState<
    Category[] | null
  >(null);
  const [selectedServiceName, setSelectedServiceName] = useState<string>("");
  const [selectedServiceGroup, setSelectedServiceGroup] = useState<string>("");

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = services.slice(startIndex, endIndex);

  return (
    <div className="overflow-x-auto">
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
      />
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Service Group</th>
            <th>Total Prices</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedServices.map((service) => (
            <tr key={service.service_id}>
              <td>{service.service_id}</td>
              <td>{he.decode(service.service_name)}</td>
              <td>{he.decode(service.service_group)}</td>
              <td>{service.categories.length}</td>
              <td className="flex gap-2">
              <button
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    setSelectedCategories(service.categories);
                    setSelectedServiceName(he.decode(service.service_name));
                    setSelectedServiceGroup(he.decode(service.service_group));
                  }}
                >
                  View Prices
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(service)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(service.service_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={services.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {selectedCategories && (
        <CategoryPriceModal
          categories={selectedCategories}
          onClose={() => setSelectedCategories(null)}
          serviceName={selectedServiceName}
          serviceGroup={selectedServiceGroup}
        />
      )}
    </div>
  );
};

export default ServiceTable;
