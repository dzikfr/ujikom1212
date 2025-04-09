import React, { useState, useEffect } from "react";
import InputField from "../commons/InputField";
import { categoryOptions, countryOptions } from "../../option/doctor";

interface UpdateDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    doctor_id: number,
    doctor: {
      doctor_name: string;
      address: string;
      city: string;
      country: string;
      kategori: string;
      contact_phone: string;
    }
  ) => void;
  doctor?: {
    doctor_id: number;
    doctor_name: string;
    address: string;
    city: string;
    country: string;
    kategori: string;
    contact_phone: string;
  };
}

const UpdateDoctorModal: React.FC<UpdateDoctorModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  doctor,
}) => {
  const [doctorName, setDoctorName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(countryOptions[0].label);
  const [kategori, setKategori] = useState(categoryOptions[0]);
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    if (doctor) {
      setDoctorName(doctor.doctor_name || "");
      setAddress(doctor.address || "");
      setCity(doctor.city || "");
      setCountry(doctor.country || countryOptions[0].label);
      setKategori(doctor.kategori || categoryOptions[0]);
      setContactPhone(doctor.contact_phone?.replace(/\D/g, "") || "");
    }
  }, [doctor]);

  const selectedCountry = countryOptions.find((c) => c.label === country);
  const phonePrefix = selectedCountry ? selectedCountry.code : "";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    setContactPhone(onlyNumbers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName.trim()) return;

    if (doctor) {
      onSubmit(doctor.doctor_id, {
        doctor_name: doctorName,
        address,
        city,
        country,
        kategori,
        contact_phone: `${phonePrefix} ${contactPhone}`,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-200 p-8 rounded-lg shadow-lg w-3/4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Update Doctor</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Doctor Name"
            name="doctor_name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
          <InputField
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
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setCountry(e.target.value)}
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctorModal;
