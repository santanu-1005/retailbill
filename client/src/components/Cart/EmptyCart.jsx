import React from "react";
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => (
  <div className="bg-white rounded-lg shadow p-12 text-center">
    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
    <p className="text-gray-500">Add some products to get started.</p>
  </div>
);

export default EmptyCart;
