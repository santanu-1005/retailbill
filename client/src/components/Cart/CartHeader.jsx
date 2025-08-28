import React from "react";
import { Trash2 } from "lucide-react";

const CartHeader = ({ onClearCart }) => (
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
    <button
      onClick={onClearCart}
      className="text-red-600 hover:text-red-800 transition-colors flex items-center space-x-2"
    >
      <Trash2 className="w-4 h-4" />
      <span>Clear Cart</span>
    </button>
  </div>
);

export default CartHeader;
