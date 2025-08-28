import React from "react";
import InvoiceGenerator from "../components/Invoices/InvoiceGenerator";
import InvoiceList from "../components/Invoices/InvoiceList";

const InvoicesPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column: Invoice History */}
      <div className="lg:w-2/3">
        <InvoiceList />
      </div>

      {/* Right Column: Invoice Generator */}
      <div className="lg:w-1/3">
        <InvoiceGenerator />
      </div>
    </div>
  );
};

export default InvoicesPage;
