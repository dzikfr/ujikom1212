import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionsService";
import { getDoctors } from "../services/doctorService";
import { getServices } from "../services/serviceService";
import TransactionReportsTable from "../components/tables/TransactionReportTable";
import FilterDropdown from "../components/commons/FilterDropdown";
import { TransactionType } from "../components/types/transaction";
import InputField from "../components/commons/InputField";

const TransactionReportPage: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [doctors, setDoctors] = useState<{ label: string; value: string }[]>(
    []
  );
  const [services, setServices] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [searchPatient, setSearchPatient] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [minGrandTotal, setMinGrandTotal] = useState<string>("");
  const [maxGrandTotal, setMaxGrandTotal] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    fetchDoctors();
    fetchServices();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [
    selectedDoctor,
    selectedService,
    searchPatient,
    startDate,
    endDate,
    minGrandTotal,
    maxGrandTotal,
  ]);

  const fetchTransactions = async () => {
    setLoading(true);
    const filters: Record<string, string> = {};

    if (selectedDoctor) filters["doctor_name"] = selectedDoctor;
    if (selectedService) filters["service_group"] = selectedService;
    if (searchPatient) filters["patient_name"] = searchPatient;
    if (startDate) filters["start_date"] = startDate;
    if (endDate) filters["end_date"] = endDate;
    if (minGrandTotal) filters["min_grand_total"] = minGrandTotal;
    if (maxGrandTotal) filters["max_grand_total"] = maxGrandTotal;

    const data = await getTransactions(filters);
    setTransactions(data);
    setLoading(false);
  };

  const fetchDoctors = async () => {
    const data = await getDoctors();
    const formattedDoctors = data.map((doc: any) => ({
      label: doc.doctor_name,
      value: doc.doctor_name,
    }));
    setDoctors(formattedDoctors);
  };

  // const fetchServices = async () => {
  //   const data = await getServices();
  //   const formattedServices = data.map((service: any) => ({
  //     label: service.service_group,
  //     value: service.service_group,
  //   }));
  //   setServices(formattedServices);
  // };

  const fetchServices = async () => {
    const data = await getServices();
    
    const uniqueServiceGroups: string[] = Array.from(
      new Set(data.map((service: any) => service.service_group))
    );
  
    const formattedServices = uniqueServiceGroups.map((serviceGroup) => ({
      label: serviceGroup,
      value: serviceGroup,
    }));
  
    setServices(formattedServices);
  };
  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transaction Reports</h1>
      </div>

      {/* Input Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        <div className="w-full">
          <InputField
            label="Patient Name"
            name="patient_name"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
          />
        </div>
        <div className="w-full">
          <FilterDropdown
            label="Doctor"
            value={selectedDoctor}
            options={doctors}
            onChange={setSelectedDoctor}
          />
        </div>
        <div className="w-full">
          <FilterDropdown
            label="Service Group"
            value={selectedService}
            options={services}
            onChange={setSelectedService}
          />
        </div>

        {/* Date */}
        <div className="w-full">
          <InputField
            label="Start Date"
            name="start_date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-full">
          <InputField
            label="End Date"
            name="end_date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Grand Total */}
        <div className="w-full">
          <InputField
            label="Min Grand Total"
            name="min_grand_total"
            type="number"
            value={minGrandTotal}
            onChange={(e) => setMinGrandTotal(e.target.value)}
          />
        </div>
        <div className="w-full">
          <InputField
            label="Max Grand Total"
            name="max_grand_total"
            type="number"
            value={maxGrandTotal}
            onChange={(e) => setMaxGrandTotal(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransactionReportsTable transactions={transactions} />
      )}
    </div>
  );
};

export default TransactionReportPage;
