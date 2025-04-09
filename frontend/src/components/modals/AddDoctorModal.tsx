import React, { useState } from "react";
import InputField from "../commons/InputField";
import { categoryOptions, countryOptions } from "../../option/doctor";
import TextAreaField from "../commons/TextAreaField";

interface AddDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (doctor: {
    doctor_name: string;
    address: string;
    city: string;
    country: string;
    kategori: string;
    contact_phone: string;
  }) => void;
}

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [doctorName, setDoctorName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(countryOptions[0].label);
  const [kategori, setKategori] = useState(categoryOptions[0]);
  const [contactPhone, setContactPhone] = useState("");

  const selectedCountry = countryOptions.find((c) => c.label === country);
  const phonePrefix = selectedCountry ? selectedCountry.code : "";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setContactPhone(onlyNumbers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      doctor_name: doctorName,
      address,
      city,
      country,
      kategori,
      contact_phone: `${phonePrefix} ${contactPhone}`,
    });
    setDoctorName("");
    setAddress("");
    setCity("");
    setCountry(countryOptions[0].label);
    setKategori(categoryOptions[0]);
    setContactPhone("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-8 rounded-lg shadow-lg w-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Add Doctor</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Doctor Name"
            name="doctor_name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
          {/* <InputField
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          /> */}

          <TextAreaField
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <InputField
            label="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-white">
            Country
          </label>
          <select
            className="input input-bordered w-full mb-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            {countryOptions.map((c) => (
              <option key={c.label} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-white">
            Kategori
          </label>
          <select
            className="input input-bordered w-full mb-2"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium text-white">
            Contact Phone
          </label>
          <div className="flex items-center input input-bordered w-full mb-2">
            <span className="text-gray-500 pr-2">{phonePrefix}</span>
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Enter phone number"
              value={contactPhone}
              onChange={handlePhoneChange}
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
              disabled={!doctorName || !address || !city || !country}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
