import React, { useEffect, useState } from "react";
import {
  getServices,
  createService,
  deleteService,
  updateService,
} from "../services/serviceService";
import ServiceTable from "../components/tables/ServiceTable";
import AddServiceModal from "../components/modals/AddServiceModal";
import UpdateServiceModal from "../components/modals/UpdateServiceModal";
import SearchBar from "../components/commons/SearchBar";
import { useSnackbar } from "notistack";

interface ServiceCategory {
  category_id: number;
  category_name: string;
  price: number;
}

interface Service {
  service_id: number;
  service_name: string;
  service_group: string;
  categories: ServiceCategory[];
}

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

  const fetchServices = async () => {
    setLoading(true);
    const data = await getServices();
    setServices(data);
    setLoading(false);
  };

  const handleAddService = async (newService: {
    service_name: string;
    service_group: string;
    categories: { category_id: number; price: number }[];
  }) => {
    try {
      const response = await createService(newService);
      fetchServices();
      if(response.status === 400) {
        enqueueSnackbar(response.errors, { variant: "error" });
      }
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(
        error.response?.data || "Failed to add service",
        { variant: "error" }
      );
      console.error("Error adding service:", error);
    }
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setUpdateModalOpen(true);
  };

  const handleUpdateService = async (
    id: number,
    updatedService: {
      service_name: string;
      service_group: string;
      categories: { category_id: number; price: number }[];
    }
  ) => {
    try {
      const response = await updateService(id, updatedService);
      fetchServices();
      enqueueSnackbar(response.message, { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(
        error.response?.data?.message || "Failed to update service",
        { variant: "error" }
      );
    }
  };

  const handleDeleteService = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        fetchServices();
        enqueueSnackbar("Service deleted successfully!", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("Failed to delete service", { variant: "error" });
      }
    }
  };

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = services.filter((service) =>
      service.service_name.toLowerCase().includes(lowerCaseQuery) ||
      service.service_group.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredServices(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          className="btn btn-primary"
          onClick={() => setAddModalOpen(true)}
        >
          + Add Service
        </button>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Search Services..." />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ServiceTable
          services={filteredServices}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
        />
      )}

      <AddServiceModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddService}
      />
      <UpdateServiceModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleUpdateService}
        service={selectedService || undefined}
      />
    </div>
  );
};

export default ServicePage;
