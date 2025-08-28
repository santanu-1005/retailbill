import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { selectCustomerMap, selectUser } from "../../store/selectors";
import { generateInvoicePdf } from "../../assets/pdfUtils";
import { Download } from "lucide-react";
import { getInvoices } from "../../service/api";

const InvoiceList = () => {
  // const invoices = useAppSelector(selectInvoices) || [];
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAppSelector(selectUser);
  const customerMap = useAppSelector(selectCustomerMap);
  
  useEffect(() => {
    // console.log("Fetching invoices for user:", user?.id); // 👈 debug
    const fetchInvoices = async () => {
      try {
        const res = await getInvoices(user?.id);
        // console.log("Fetched invoices:", res); // 👈 debug
        setInvoices(res.data);
      } catch (err) {
        // console.error("Error fetching invoices:", err); // 👈 debug
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchInvoices();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error loading customers: {error.message}</p>;
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Invoice History</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="max-h-[278px] overflow-y-auto">
          {" "}
          {/* adjust 320px as needed for 4 rows */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Download
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                  <tr
                    key={invoice.invoiceNumber || index}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.invoiceNumber || `INV-${index + 1}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {customerMap[invoice.customerId] || "Unknown Customer"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {invoice.createdAt
                          ? new Date(invoice.createdAt).toLocaleDateString()
                          : "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{invoice.totalAmount?.toFixed(2) || "0.00"}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => generateInvoicePdf(invoice)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Download Invoice"
                      >
                        <Download className="w-5 h-5 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
// import React, { useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "../../hooks/redux";
// import { selectInvoices, selectCustomerMap, selectUser } from "../../store/selectors";
// import { generateInvoicePdf } from "../../assets/pdfUtils";
// import { Download } from "lucide-react";
// import { getInvoices } from "../../service/api";
// import { setInvoices, setLoading, setError } from "../../store/slices/invoicesSlice";

// const InvoiceList = () => {
//   const dispatch = useAppDispatch();
//   const invoices = useAppSelector(selectInvoices);
//   const user = useAppSelector(selectUser);
//   const customerMap = useAppSelector(selectCustomerMap);
//   const loading = useAppSelector((state) => state.invoices.loading);
//   const error = useAppSelector((state) => state.invoices.error);

//   const fetchInvoices = async () => {
//     if (!user?.id) return;
//     dispatch(setLoading(true));
//     try {
//       const res = await getInvoices(user.id);
//       dispatch(setInvoices(res.data));
//     } catch (err) {
//       dispatch(setError(err));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, [user?.id]);

//   if (loading) return <p>Loading invoices...</p>;
//   if (error) return <p>Error loading invoices: {error.message}</p>;

//   return (
//     <div className="bg-white rounded-lg shadow overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-200">
//         <h2 className="text-lg font-medium text-gray-900">Invoice History</h2>
//       </div>
//       <div className="overflow-x-auto">
//         <div className="max-h-[278px] overflow-y-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50 sticky top-0 z-10">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Download</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {invoices.length > 0 ? (
//                 invoices.map((invoice, index) => (
//                   <tr key={invoice.invoiceNumber || index} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {invoice.invoiceNumber || `INV-${index + 1}`}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {customerMap[invoice.customerId] || "Unknown Customer"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-500">
//                         {invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : "-"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         ₹{invoice.totalAmount?.toFixed(2) || "0.00"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <button onClick={() => generateInvoicePdf(invoice)} className="text-blue-600 hover:text-blue-800" title="Download Invoice">
//                         <Download className="w-5 h-5 mx-auto" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No invoices found</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceList;
