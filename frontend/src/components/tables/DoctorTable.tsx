import React, { useState } from "react";
import Pagination from "../commons/Pagination";
import ItemsPerPageSelector from "../commons/ItemsPerPageSelector";
import he from "he";  

interface Doctor {
  doctor_id: number;
  doctor_name: string;
  address: string;
  city: string;
  country: string;
  kategori: string;
  contact_phone: string;
}

interface DoctorTableProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedDoctors = doctors.slice(startIndex, endIndex);

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
            <th>Doctor Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Category</th>
            <th>Contact Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedDoctors.map((doctor) => (
            <tr key={doctor.doctor_id}>
              <td>{doctor.doctor_id}</td>
              <td>{he.decode(doctor.doctor_name)}</td>
              <td>{he.decode(doctor.address)}</td>
              <td>{he.decode(doctor.city)}</td>
              <td>{he.decode(doctor.country)}</td>
              <td>{he.decode(doctor.kategori)}</td>
              <td>{doctor.contact_phone}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(doctor)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(doctor.doctor_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalItems={doctors.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DoctorTable;
