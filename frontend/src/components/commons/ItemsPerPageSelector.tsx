import React from "react";

interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  onChange: (value: number) => void;
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({
  itemsPerPage,
  onChange,
}) => {
  return (
    <div className="flex justify-end mb-2">
      <label className="mr-2 text-sm">Rows per page:</label>
      <select
        className="border p-1 rounded bg-base-200"
        value={itemsPerPage}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
