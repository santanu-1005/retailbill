import React from "react";
import { Package, Plus } from "lucide-react";
import { useAppDispatch } from "../../hooks/redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const stockStatusClass =
    product.stock > 10
      ? "bg-green-100 text-green-800"
      : product.stock > 0
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      {/* Fixed Image Section */}
      <div className="bg-gray-100 h-48 flex items-center justify-center flex-shrink-0">
        <Package className="w-16 h-16 text-gray-400" />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Top Details */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatusClass}`}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Description Block */}
        <div className="text-justify text-sm text-gray-600 space-y-2 mb-4">
          <p>SKU: {product.sku || "-"}</p>
          <p>{product.description || "No Description"}</p>
          <p className="text-gray-500">Category: {product.category || "N/A"}</p>
        </div>

        {/* Fixed Bottom Section */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
          {/* Price on the left */}
          <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
            ₹{product.price || 0}
          </span>

          {/* Add to Cart button on the right */}
          <button
            onClick={handleAddToCart}
            disabled={!product.stock}
            className="flex items-center space-x-2 h-9 px-4 bg-blue-600 text-white rounded-lg 
               hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
               transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
