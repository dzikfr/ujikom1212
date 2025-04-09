import { create } from "zustand";

export interface Detail {
  service_id: number;
  category_id: number;
  qty: number;
  price: number;
}

interface TransactionState {
  details: Detail[];
  beforeTax: number;
  taxValue: number;
  afterTax: number;
  taxRate: number; 
  setTaxRate: (rate: number) => void;
  setDetails: (details: Detail[]) => void;
  updateDetail: (index: number, field: keyof Detail, value: any) => void;
  calculateTotals: () => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  details: [],
  beforeTax: 0,
  taxValue: 0,
  afterTax: 0,
  taxRate: 0.15,
  setTaxRate: (rate) => {
    set({ taxRate: rate });
    get().calculateTotals();
  },
  setDetails: (details) => {
    set({ details });
    get().calculateTotals();
  },
  updateDetail: (index, field, value) => {
    set((state) => {
      const updatedDetails = [...state.details];
      updatedDetails[index] = { ...updatedDetails[index], [field]: value };

      return { details: updatedDetails };
    });
    get().calculateTotals();
  },
  calculateTotals: () => {
    set((state) => {
      const beforeTax = state.details.reduce(
        (acc, detail) => acc + detail.price * detail.qty,
        0
      );
      const taxValue = beforeTax * state.taxRate;
      const afterTax = beforeTax + taxValue;

      return { beforeTax, taxValue, afterTax, taxRate: state.taxRate };
    });
  },
}));
