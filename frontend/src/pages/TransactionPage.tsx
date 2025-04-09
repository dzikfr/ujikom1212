import React, { useEffect, useState } from "react";
import {
  getTransactions,
  createTransaction,
} from "../services/transactionsService";
import TransactionTable from "../components/tables/TransactionTable";
import {
  TransactionType,
  AddTransactionType,
} from "../components/types/transaction";
import AddTransactionModal from "../components/modals/AddTransactionModal";
import { useSnackbar } from "notistack";

const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [transactions]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (transaction: AddTransactionType) => {
    try {
      const newTransaction = await createTransaction({
        ...transaction,
        date:
          typeof transaction.date === "string"
            ? transaction.date.split("T")[0]
            : new Date(transaction.date).toISOString().split("T")[0],
      });
      setTransactions([...transactions, newTransaction]);
      enqueueSnackbar("Transaction added successfully", { variant: "success" });
      setIsModalOpen(false);
    } catch (error) {
      enqueueSnackbar("Failed to add transaction", { variant: "error" });
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="p-6">
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
      />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Transactions</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          + Add Transaction
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </div>
  );
};

export default TransactionPage;
