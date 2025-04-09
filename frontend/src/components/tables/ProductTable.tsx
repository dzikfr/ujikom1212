import React from "react";

interface Product {
  id_product: number;
  product_name: string;
  price: number;
  type: string;
  stock: number;
}

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No data found.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id_product} className="border-t">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{product.product_name}</td>
                <td className="px-4 py-2">
                  Rp {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-2">{product.type}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="btn btn-sm btn-outline btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id_product)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
