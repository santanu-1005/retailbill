import React from "react";
import CustomerList from "../components/CustomerPage/CustomerList";
import SelectCustomer from "../components/CustomerPage/SelectCustomer";
import AddCustomerForm from "../components/CustomerPage/AddCustomerForm";

const CustomerPage = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectCustomer />
        <AddCustomerForm />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customers</h2>
        <CustomerList />
      </div>

    </div>
  );
};

export default CustomerPage;
