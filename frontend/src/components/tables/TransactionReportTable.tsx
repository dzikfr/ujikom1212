import React, { useState } from "react";
import Pagination from "../commons/Pagination";
import ItemsPerPageSelector from "../commons/ItemsPerPageSelector";
import TransactionDetailModal from "../modals/TransactionDetailModal";
import { formattedRupiah, formatDate } from "../helpers/format";
import { TransactionType } from "../types/transaction";
import he from "he";

interface TransactionTableProps {
  transactions: TransactionType[];
}

const TransactionReportsTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

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
            <th>Transaction ID</th>
            <th>Doctor Name</th>
            <th>Patient Name</th>
            <th>Service Group</th>
            <th>Before Tax</th>
            <th>Tax Rate</th>
            <th>Tax Value</th>
            <th>After Tax</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.length > 0 ? (
            displayedTransactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_id}</td>
                <td>
                  {transaction.doctor_name
                    ? he.decode(transaction.doctor_name)
                    : "-"}
                </td>
                <td>
                  {transaction.patient_name
                    ? he.decode(transaction.patient_name)
                    : "-"}
                </td>
                <td>{transaction.service_group}</td>
                <td>{formattedRupiah(Number(transaction.sub_total))}</td>
                <td>
                  {transaction.tax_rate
                    ? `${transaction.tax_rate * 100}%`
                    : "-"}
                </td>
                <td>
                  {transaction.tax_rate && transaction.sub_total
                    ? formattedRupiah(
                        Number(transaction.sub_total) * transaction.tax_rate
                      )
                    : "-"}
                </td>
                <td>{formattedRupiah(Number(transaction.grand_total))}</td>
                <td>{formatDate(transaction.transaction_date)}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        totalItems={transactions.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {selectedTransaction && (
        <TransactionDetailModal
          transactionDetails={selectedTransaction.transaction_detail}
          onClose={() => setSelectedTransaction(null)}
          transactionId={selectedTransaction.transaction_id}
          doctorName={selectedTransaction.doctor_name || "-"}
          patientName={selectedTransaction.patient_name}
          userName={selectedTransaction.username}
          serviceGroup={selectedTransaction.service_group}
          taxRate={selectedTransaction.tax_rate}
          subTotal={selectedTransaction.sub_total}
          grandTotal={selectedTransaction.grand_total}
          transactionDate={selectedTransaction.transaction_date}
        />
      )}
    </div>
  );
};

export default TransactionReportsTable;
