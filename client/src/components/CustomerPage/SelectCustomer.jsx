import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { selectCustomer, setCustomers } from "../../store/slices/customersSlice";
import { selectCustomers, selectSelectedCustomer, selectUser } from "../../store/selectors";
import { getCustomers } from "../../service/api";

const SelectCustomer = () => {
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectCustomers);
  const selectedCustomer = useAppSelector(selectSelectedCustomer);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await getCustomers(user?.id);
        dispatch(setCustomers(res.data));   // ✅ now Redux has latest list
      } catch (err) {
        console.error("Error Fetching Customers", err);
      }
    };
    if (user?.id) fetchCustomers();
  }, [user?.id, dispatch]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Customer</h3>

      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={selectedCustomer?.id || ""}
        onChange={(e) => {
          const customer = customers.find(c => c.id === e.target.value) || null;
          dispatch(selectCustomer(customer));
        }}
      >
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name} - {customer.phone}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCustomer;
