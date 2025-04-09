import React from "react";
import he from "he";
import { formattedRupiah } from "../helpers/format";

interface TransactionDetails {
  category_name: string;
  service_name: string;
  price: number;
  quantity: number;
  amount: number;
}

interface TransactionDetailModalProps {
  transactionDetails: TransactionDetails[];
  onClose: () => void;
  transactionId: number;
  doctorName: string;
  patientName: string;
  userName: string;
  serviceGroup: string;
  taxRate: number | null;
  subTotal: number;
  grandTotal: number;
  transactionDate: string;
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  transactionDetails,
  onClose,
  transactionId,
  doctorName,
  patientName,
  userName,
  serviceGroup,
  taxRate,
  subTotal,
  grandTotal,
  transactionDate,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-base-200 p-6 rounded shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">
          Transaction Number: {transactionId}
        </h3>
        <h3 className="text-lg font-semibold mb-2">
          Doctor Name: {doctorName}
        </h3>
        <h3 className="text-lg font-semibold mb-2">
          Patient Name: {patientName}
        </h3>
        <h3 className="text-lg font-semibold mb-2">
          Service Group: {serviceGroup}
        </h3>
        <h3 className="text-lg font-semibold mb-2">
          Transaction Date:{" "}
          {new Date(transactionDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h3>
        <h3 className="text-lg font-semibold mb-2">Handled By: {userName}</h3>

        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-base-200">
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Service</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Qty</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactionDetails.map((detail, index) => (
              <tr key={index} className="text-center border-t">
                <td className="border border-gray-300 px-4 py-2">
                  {he.decode(detail.category_name)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {he.decode(detail.service_name)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formattedRupiah(Number(detail.price))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {detail.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {formattedRupiah(Number(detail.amount))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-bold">Sub Total:</span>
            <span>{formattedRupiah(Number(subTotal))}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-bold">Tax Rate:</span>
            <span>{taxRate !== null && taxRate ? taxRate * 100 : 0}%</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-bold">Tax Value:</span>
            <span>{taxRate !== null && taxRate ? formattedRupiah(taxRate * subTotal) : 0}</span>
          </div>
          <div className="flex justify-between mt-2 border-t pt-2">
            <span className="font-bold">Grand Total:</span>
            <span className="text-lg font-bold">
              {formattedRupiah(Number(grandTotal))}
            </span>
          </div>
        </div>

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

export default TransactionDetailModal;
