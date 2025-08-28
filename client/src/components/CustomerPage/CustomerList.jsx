import React, { useEffect, useState } from 'react';
import {  useAppSelector } from '../../hooks/redux';
import {  selectUser } from '../../store/selectors';
import { getCustomers } from '../../service/api';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAppSelector(selectUser)

  useEffect(() => {
    const fetchCustomers = async() => {
      try {
        const res = await getCustomers(user?.id);
        setCustomers(res.data);
      } catch (err) {
        setError(err);
        console.error("Error Fetching Customers");
      } finally{
        setLoading(false);
      }
    };
    fetchCustomers();
  },[user?.id]);
  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error loading customers: {error.message}</p>;
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
    <div className="overflow-x-auto">
    <div className="max-h-[260px] overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers?.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{customer.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{customer.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{customer.address}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default CustomerList;