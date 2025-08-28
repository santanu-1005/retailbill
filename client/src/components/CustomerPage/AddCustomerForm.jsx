
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addCustomer } from "../../store/slices/customersSlice";
import { createCustomer } from "../../service/api";
import { toast } from "react-toastify";
import { selectUser } from "../../store/selectors";

const AddCustomerForm = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "+91 " + "",
    address: "",
    userId: user?.id
  });

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: createdCustomer } = await createCustomer(newCustomer);

      dispatch(addCustomer(createdCustomer));
      // console.log("Created customer from API:", createdCustomer);

      toast.success("Customer Registraction Successfull")

      // Reset form
      setNewCustomer({ name: "", email: "", phone: "", address: "" });
      if (onClose) onClose();
    } catch (error) {
      console.error("Error creating customer:", error);
      alert("Failed to create customer.");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Customer</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name *"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="email"
          placeholder="Email *"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <textarea
          rows={3}
          placeholder="Address"
          value={newCustomer.address}
          onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Customer
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCustomerForm;
