import React from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ subtotal, tax, total }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    // You can replace this with navigation to a checkout page or any logic
    // alert("Proceeding to checkout...");
    navigate("/customers  ")
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (18%):</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
