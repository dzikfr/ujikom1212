// src/components/CompanyTable.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

type Company = {
  id_company: number;
  company_name: string;
  address: string;
  number: string;
  fax: string;
};

const API_URL = "http://localhost:3000/api/companies";

const CompanyTable: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [form, setForm] = useState<Omit<Company, "id_company">>({
    company_name: "",
    address: "",
    number: "",
    fax: "",
  });

  const fetchCompanies = async () => {
    const res = await axios.get(API_URL);
    setCompanies(res.data.data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (isEdit && selectedCompany) {
      await axios.put(`${API_URL}/${selectedCompany.id_company}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    closeModal();
    fetchCompanies();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure want to delete this company?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchCompanies();
    }
  };

  const openAddModal = () => {
    setIsEdit(false);
    setForm({ company_name: "", address: "", number: "", fax: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (company: Company) => {
    setIsEdit(true);
    setSelectedCompany(company);
    setForm({
      company_name: company.company_name,
      address: company.address,
      number: company.number,
      fax: company.fax,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Company List</h1>
        <button
          onClick={openAddModal}
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-base-200 hover:text-white transition"
        >
          Add Company
        </button>
      </div>

      <table className="min-w-full border text-sm text-left">
        <thead className="bg-base-600">
          <tr>
            <th className="px-4 py-2 border">No.</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Number</th>
            <th className="px-4 py-2 border">Fax</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, i) => (
            <tr key={company.id_company}>
              <td className="px-4 py-2 border">{i + 1}</td>
              <td className="px-4 py-2 border">{company.company_name}</td>
              <td className="px-4 py-2 border">{company.address}</td>
              <td className="px-4 py-2 border">{company.number}</td>
              <td className="px-4 py-2 border">{company.fax}</td>
              <td className="px-4 py-2 border space-x-2">
                <button
                  onClick={() => openEditModal(company)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-base-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(company.id_company)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-base-200 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isEdit ? "Edit Company" : "Add Company"}
            </h2>
            <div className="space-y-3">
              <input
                name="company_name"
                value={form.company_name}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="w-full border p-2 rounded"
              />
              <input
                name="address"
                value={form.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full border p-2 rounded"
              />
              <input
                name="number"
                value={form.number}
                onChange={handleInputChange}
                placeholder="Number"
                className="w-full border p-2 rounded"
              />
              <input
                name="fax"
                value={form.fax}
                onChange={handleInputChange}
                placeholder="Fax"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyTable;
