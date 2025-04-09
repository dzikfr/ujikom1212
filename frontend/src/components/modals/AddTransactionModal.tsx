import React, { useState, useEffect } from "react";
import InputField from "../commons/InputField";
import { getDoctors } from "../../services/doctorService";
import { getServices } from "../../services/serviceService";
import { useSnackbar } from "notistack";
import { useTransactionStore, Detail } from "../store/useTransactionsStore";
import { formattedRupiah } from "../helpers/format";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: any) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [doctors, setDoctors] = useState<
    { doctor_id: number; doctor_name: string }[]
  >([]);
  const [services, setServices] = useState<
    {
      service_id: number;
      service_name: string;
      service_group: string;
      categories: {
        category_id: number;
        category_name: string;
        price: number;
      }[];
    }[]
  >([]);
  const [doctorId, setDoctorId] = useState(0);
  const [patientName, setPatientName] = useState("");
  const [serviceGroup, setServiceGroup] = useState("");
  const [date, setDate] = useState("");
  // const [taxRate, setTaxRate] = useState(0.1);s
  const [username, setUsername] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const {
    details,
    taxRate,
    setTaxRate,
    setDetails,
    updateDetail,
    beforeTax,
    taxValue,
    afterTax,
    calculateTotals,
  } = useTransactionStore();

  useEffect(() => {
    setUsername(sessionStorage.getItem("username") || "");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setDoctors(await getDoctors());
      setServices(await getServices());
    };
    fetchData();
  }, []);

  const filteredServices = serviceGroup
    ? services.filter((s) => s.service_group === serviceGroup)
    : [];

  const handleAddDetail = () => {
    setDetails([
      ...details,
      { service_id: 0, category_id: 0, qty: 1, price: 0 },
    ]);
  };

  const handleRemoveDetail = (index: number) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleDetailChange = (
    index: number,
    field: keyof Detail,
    value: any
  ) => {
    updateDetail(index, field, value);

    if (field === "category_id") {
      const selectedService = services.find(
        (s) => s.service_id === details[index].service_id
      );

      const selectedCategory = selectedService?.categories.find(
        (c) => c.category_id === value
      );

      if (selectedCategory) {
        updateDetail(index, "price", selectedCategory.price);
      }
    }

    if (taxRate > 0) {
      calculateTotals();
    }

    calculateTotals();
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    setTaxRate(value /100);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !doctorId ||
      !patientName ||
      !date ||
      !details.length ||
      details.some((d) => d.service_id === 0 || d.category_id === 0)
    ) {
      enqueueSnackbar("Please fill all required fields.", { variant: "error" });
      return;
    }

    const formattedTransaction = {
      doctor_id: doctorId,
      patient_name: patientName,
      date: new Date(date),
      tax_rate: taxRate,
      username,
      details,
    };

    onSubmit(formattedTransaction);
    setDoctorId(0);
    setPatientName("");
    setServiceGroup("");
    setDate("");
    setTaxRate(0.1);
    setDetails([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-base-200 p-8 rounded-lg shadow-lg w-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          {/* Doctor Name */}
          <select
            className="select select-bordered w-full mb-2"
            value={doctorId}
            onChange={(e) => setDoctorId(Number(e.target.value))}
          >
            <option value={0} disabled>
              Select Doctor
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.doctor_name}
              </option>
            ))}
          </select>

          {/* Patient Name */}
          <InputField
            label="Patient Name"
            name="patient_name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />

          {/* Service Group */}
          <select
            className="select select-bordered w-full mb-2"
            value={serviceGroup}
            onChange={(e) => setServiceGroup(e.target.value)}
          >
            <option value="" disabled>
              Select Service Group
            </option>
            {[...new Set(services.map((s) => s.service_group))].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          {/* Tax Rate */}
          <InputField
            label="Tax Rate (%)"
            name="tax_rate"
            type="number"
            min={0}
            max={100}
            step={1}
            value={taxRate * 100}
            onChange={handleTaxRateChange}
            required
          />

          {/* Transaction Date */}
          <InputField
            label="Transaction Date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Details */}
          <h3 className="text-white mt-4 mb-2">Transaction Details</h3>
          {details.map((detail, index) => {
            const selectedService = services.find(
              (s) => s.service_id === detail.service_id
            );

            return (
              <div key={index} className="flex items-center gap-2 mb-2">
                {/* Select Service */}
                <select
                  className="select select-bordered w-full mb-2"
                  value={detail.service_id}
                  onChange={(e) =>
                    handleDetailChange(
                      index,
                      "service_id",
                      Number(e.target.value)
                    )
                  }
                >
                  <option value={0} disabled>
                    Select Service
                  </option>
                  {filteredServices.map((service) => (
                    <option key={service.service_id} value={service.service_id}>
                      {service.service_name}
                    </option>
                  ))}
                </select>

                {/* Select Category */}
                <select
                  className="select select-bordered w-full mb-2"
                  value={detail.category_id}
                  onChange={(e) =>
                    handleDetailChange(
                      index,
                      "category_id",
                      Number(e.target.value)
                    )
                  }
                  disabled={!detail.service_id}
                >
                  <option value={0} disabled>
                    Select Category
                  </option>
                  {selectedService?.categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>

                {/* Quantity */}
                <input
                  type="number"
                  min="1"
                  className="input input-bordered w-20"
                  value={detail.qty}
                  onChange={(e) => {
                    let qty = Number(e.target.value);
                    if (qty < 1) qty = 1;
                    handleDetailChange(index, "qty", qty);
                  }}
                />

                {/* Price */}
                <span className="text-white">
                  price: {formattedRupiah(detail.price)}
                </span>
                {/* Price */}
                <span className="text-white">
                  total: {formattedRupiah(detail.price * detail.qty)}
                </span>

                {/* Remove Button */}
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => handleRemoveDetail(index)}
                >
                  X
                </button>
              </div>
            );
          })}

          {/* Adding Item Detail */}
          <button
            type="button"
            className="btn btn-secondary w-full"
            onClick={handleAddDetail}
          >
            + Add Service
          </button>

          {/* Calculate Tax */}
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span className="font-bold">Before tax:</span>
              <span>{formattedRupiah(beforeTax)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-bold">Tax Rate:</span>
              <span>{taxRate !== null && taxRate ? taxRate * 100 : 0}%</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-bold">Tax Value:</span>
              <span>{formattedRupiah(taxValue)}</span>
            </div>
            <div className="flex justify-between mt-2 border-t pt-2">
              <span className="font-bold">After Tax:</span>
              <span className="text-lg font-bold">
                {formattedRupiah(afterTax)}
              </span>
            </div>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!doctorId || !patientName || !details.length}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
