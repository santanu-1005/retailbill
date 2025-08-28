import React, { useState } from "react";
import { FileText, CreditCard, Banknote } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  addInvoice,
  setError,
  setLoading,
} from "../../store/slices/invoicesSlice";
import { clearCart } from "../../store/slices/cartSlice";
import { selectCustomer } from "../../store/slices/customersSlice";
import { updateProductStock } from "../../store/slices/productsSlice";
import {
  selectSelectedCustomer,
  selectCartItems,
  selectCartTotal,
  selectCartTax,
  selectCartGrandTotal,
  selectUser,
} from "../../store/selectors";
import { createInvoice } from "../../service/api";
import { toast } from "react-toastify";

const InvoiceGenerator = () => {
  const dispatch = useAppDispatch();
  const customer = useAppSelector(selectSelectedCustomer);
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotal);
  const tax = useAppSelector(selectCartTax);
  const total = useAppSelector(selectCartGrandTotal);
  const user = useAppSelector(selectUser);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!customer || items.length === 0) {
    return null;
  }

  const handleGenerateInvoice = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    dispatch(setLoading(true));

    const payload = {
    customerId: customer?.id,
    userId: user?.id,
    items: items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    })),
    subtotal,
    tax,
    totalAmount: total,
    paymentMethod, 
    createdAt: new Date().toISOString(),
  };

    try {
      const { data } = await createInvoice(payload);
      dispatch(addInvoice(data));

      items.forEach((item) => {
        dispatch(
          updateProductStock({
            productId: item.product.id,
            quantity: item.quantity,
          })
        );
      });

      dispatch(clearCart());
      dispatch(selectCustomer(null));
      toast.success("Invoice generated successfully!");
    } catch (err) {
      dispatch(setError(err.response?.data || "Failed to create invoice"));
      toast.error("Failed to create invoice: " + err.message);
    } finally {
      setIsProcessing(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Retail Store</h2>
          <p className="text-sm text-gray-500">123 Market Street, City</p>
          <p className="text-sm text-gray-500">support@retailstore.com</p>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-extrabold text-blue-600">INVOICE</h1>
          <p className="text-sm">Invoice #: INV-{Date.now()}</p>
          <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold text-gray-700">Bill To:</h3>
          <p className="text-gray-900">{customer.name}</p>
          <p className="text-gray-600">{customer.email}</p>
          <p className="text-gray-600">{customer.phone}</p>
          <p className="text-gray-600">{customer.address}</p>
        </div>
        <div className="text-right">
          <h3 className="font-semibold text-gray-700">Payment Method</h3>
          <p className="capitalize">{paymentMethod}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-sm border-t border-b mb-6">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="py-2 px-3 text-left">Item</th>
            <th className="py-2 px-3 text-center">Qty</th>
            <th className="py-2 px-3 text-right">Price</th>
            <th className="py-2 px-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product.id} className="border-t">
              <td className="py-2 px-3">{item.product.name}</td>
              <td className="py-2 px-3 text-center">{item.quantity}</td>
              <td className="py-2 px-3 text-right">
                ₹{item.product.price.toFixed(2)}
              </td>
              <td className="py-2 px-3 text-right">
                ₹{(item.quantity * item.product.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payment Method Selection */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
          <CreditCard className="w-4 h-4 mr-2" /> Select Payment Method
        </h3>
        <div className="flex space-x-4">
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
              paymentMethod === "cash"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <Banknote className="w-4 h-4" />
            <span>Cash</span>
          </button>
          <button
            onClick={() => setPaymentMethod("card")}
            className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
              paymentMethod === "card"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Card</span>
          </button>
          <button
            onClick={() => setPaymentMethod("upi")}
            className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${
              paymentMethod === "upi"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>UPI</span>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-end mb-6">
        <div className="w-64 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (18%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm border-t pt-4">
        Thank you for shopping with us! <br />
        Please keep this invoice for your records.
      </div>

      {/* Generate Button */}
      <div className="mt-6">
        <button
          onClick={handleGenerateInvoice}
          disabled={isProcessing}
          className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-colors disabled:bg-gray-400 flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>Generate Invoice & Process Payment</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
